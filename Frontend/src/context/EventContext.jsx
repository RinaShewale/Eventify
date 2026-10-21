import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { budgetApi } from '../services/budgetApi';
import { eventApi } from '../services/eventApi';
import { vendorApi } from '../services/vendorApi';
import { EventContext } from './EventContextInstance';
import { createEventCoverUrl } from '../utils/eventCover';

const BUDGET_CATEGORIES = ['venue', 'catering', 'photography', 'decoration', 'music', 'other'];

function normalizeChecklist(items, eventId) {
  return items.map((task, index) => ({
    id: task._id || task.id || `${eventId}-task-${index}`,
    title: task.title || task.task || `Planning task ${index + 1}`,
    category: task.category || 'General',
    priority: task.priority || 'Medium',
    timing: task.timing || 'As scheduled',
    completed: Boolean(task.completed),
  }));
}

function createInitialChecklist(event) {
  const aiTasks = event.aiPlan?.plan?.checklist;
  if (Array.isArray(aiTasks) && aiTasks.length) {
    return normalizeChecklist(aiTasks, event.id);
  }

  const type = event.type || 'event';
  return normalizeChecklist([
    { title: `Confirm the ${type} venue and event schedule`, category: 'Venue', priority: 'High', timing: 'As soon as possible' },
    { title: `Finalize the guest list for ${event.guests} attendees`, category: 'Guests', priority: 'High', timing: 'Before invitations' },
    { title: `Confirm catering and dietary requirements`, category: 'Catering', priority: 'Medium', timing: 'Two weeks before' },
    { title: `Review event setup, decoration, and equipment`, category: 'Setup', priority: 'Medium', timing: 'One week before' },
    { title: `Confirm final suppliers and event-day contacts`, category: 'Coordination', priority: 'High', timing: 'One day before' },
  ], event.id);
}

function normalizeEvent(event) {
  return {
    ...event,
    id: event._id || event.id,
    type: event.eventType || event.type || 'Event',
    guests: Number(event.guestCount ?? event.guests ?? 0),
    totalBudget: Number(event.totalBudget ?? 0),
    allocatedBudget: Number(event.allocatedBudget ?? 0),
    status: event.status === 'planning' ? 'Planning' : event.status || 'Upcoming',
    cover: event.cover || createEventCoverUrl(event),
    aiPlan: event.aiPlan || null,
    date: event.date ? new Date(event.date).toISOString().slice(0, 10) : '',
  };
}

function normalizeBudget(budget) {
  if (!budget) return [];
  if (Array.isArray(budget.allocations) && budget.allocations.length) {
    return budget.allocations.map((item, index) => ({
      ...item,
      id: item._id || `${budget._id}-${index}`,
      category: item.category,
      allocated: Number(item.allocated || 0),
      spent: Number(item.spent || 0),
      notes: item.notes || '',
    }));
  }

  return BUDGET_CATEGORIES
    .filter((category) => Number(budget[category]) > 0)
    .map((category) => ({
      id: `${budget._id}-${category}`,
      category: category[0].toUpperCase() + category.slice(1),
      allocated: Number(budget[category]),
      spent: 0,
      notes: '',
    }));
}

function normalizeVendor(vendor) {
  const status = (vendor.paymentStatus || 'pending').toLowerCase();
  return {
    ...vendor,
    id: vendor._id || vendor.id,
    category: (vendor.category || 'other').replace(/^./, (letter) => letter.toUpperCase()),
    quote: Number(vendor.quote || 0),
    status: status[0].toUpperCase() + status.slice(1),
  };
}

export function EventProvider({ children }) {
  const { user, token, status: authStatus } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [budgetRecord, setBudgetRecord] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksEventId, setTasksEventId] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !token) {
      return undefined;
    }

    let cancelled = false;
    const loadingTimer = window.setTimeout(() => {
      if (!cancelled) setDataLoading(true);
    }, 0);
    eventApi.list(token)
      .then(async ({ events: responseEvents = [] }) => {
        if (cancelled) return;
        const normalized = await Promise.all(responseEvents.map(async (event) => {
          const item = normalizeEvent(event);
          try {
            const { budget } = await budgetApi.get(token, item.id);
            item.totalBudget = Number(budget.totalBudget || 0);
            item.allocatedBudget = Array.isArray(budget.allocations)
              ? budget.allocations.reduce((total, allocation) => total + Number(allocation.allocated || 0), 0)
              : BUDGET_CATEGORIES.reduce((total, category) => total + Number(budget[category] || 0), 0);
          } catch (error) {
            if (error.status !== 404) {
              addToast(`Unable to load budget for ${item.title}: ${error.message}`, 'error');
            }
          }
          return item;
        }));
        if (cancelled) return;
        setEvents(normalized);
        setSelectedEventId((current) => (
          normalized.some((event) => event.id === current) ? current : normalized[0]?.id || ''
        ));
      })
      .catch((error) => {
        if (!cancelled) addToast(`Unable to load events: ${error.message}`, 'error');
      })
      .finally(() => {
        if (!cancelled) setDataLoading(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(loadingTimer);
    };
  }, [addToast, authStatus, token]);

  useEffect(() => {
    if (!token || !selectedEventId) {
      return undefined;
    }

    let cancelled = false;
    const loadSelectedEventData = async () => {
      const [budgetResult, vendorResult] = await Promise.allSettled([
        budgetApi.get(token, selectedEventId),
        vendorApi.list(token, selectedEventId),
      ]);
      if (cancelled) return;

      if (budgetResult.status === 'fulfilled') {
        const budget = budgetResult.value.budget;
        setBudgetRecord(budget);
        setBudgetCategories(normalizeBudget(budget));
      } else if (budgetResult.reason.status === 404) {
        setBudgetRecord(null);
        setBudgetCategories([]);
      } else {
        addToast(`Unable to load budget: ${budgetResult.reason.message}`, 'error');
      }

      if (vendorResult.status === 'fulfilled') {
        setVendors((vendorResult.value.vendors || []).map(normalizeVendor));
      } else {
        addToast(`Unable to load vendors: ${vendorResult.reason.message}`, 'error');
      }
    };

    loadSelectedEventData();
    return () => {
      cancelled = true;
    };
  }, [addToast, selectedEventId, token]);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !token || !selectedEventId) return undefined;
    let cancelled = false;

    const loadChecklist = async () => {
      try {
        const response = await eventApi.getChecklist(token, selectedEventId);
        if (cancelled) return;

        let checklist = normalizeChecklist(response.checklist || [], selectedEventId);
        if (!checklist.length) {
          const event = events.find((item) => item.id === selectedEventId);
          if (!event) return;
          checklist = createInitialChecklist(event);
          const saved = await eventApi.updateChecklist(token, selectedEventId, checklist);
          checklist = normalizeChecklist(saved.checklist || checklist, selectedEventId);
        }

        if (!cancelled) {
          setTasks(checklist);
          setTasksEventId(selectedEventId);
        }
      } catch (error) {
        if (!cancelled) {
          setTasks([]);
          setTasksEventId('');
          addToast(`Unable to load this event's checklist: ${error.message}`, 'error');
        }
      }
    };

    loadChecklist();
    return () => {
      cancelled = true;
    };
  }, [addToast, authStatus, events, selectedEventId, token]);

  const activeEvent = useMemo(() => events.find((event) => event.id === selectedEventId) || {
    id: '',
    title: 'No celebration selected',
    type: 'Event',
    date: '',
    location: '',
    guests: 0,
    description: '',
    totalBudget: 0,
    allocatedBudget: 0,
    status: 'Planning',
    cover: createEventCoverUrl({ type: 'Event' }),
  }, [events, selectedEventId]);

  const createEvent = useCallback(async (newEvent) => {
    if (!token) throw new Error('Sign in before creating an event.');
    const response = await eventApi.create(token, {
      title: newEvent.title,
      eventType: newEvent.type,
      date: newEvent.date,
      location: newEvent.location,
      guestCount: Number(newEvent.guests),
      description: newEvent.description,
      cover: newEvent.cover || createEventCoverUrl(newEvent),
      aiPlan: newEvent.aiPlan,
    });
    const created = normalizeEvent(response.event);

    if (Number(newEvent.totalBudget) > 0) {
      try {
        await budgetApi.create(token, {
          event: created.id,
          totalBudget: Number(newEvent.totalBudget),
          allocations: [],
        });
      } catch (error) {
        setEvents((current) => [created, ...current.filter((event) => event.id !== created.id)]);
        setSelectedEventId(created.id);
        throw new Error(`Event created, but its budget could not be saved: ${error.message}`, { cause: error });
      }
      created.totalBudget = Number(newEvent.totalBudget);
    }

    setEvents((current) => [created, ...current.filter((event) => event.id !== created.id)]);
    setSelectedEventId(created.id);
    addToast(`"${created.title}" has been added to your events.`);
    return created.id;
  }, [addToast, token]);

  const deleteEvent = useCallback(async (id) => {
    if (!token) throw new Error('Sign in before deleting an event.');
    await eventApi.remove(token, id);
    setEvents((current) => current.filter((event) => event.id !== id));
    if (selectedEventId === id) {
      setSelectedEventId(events.find((event) => event.id !== id)?.id || '');
    }
    addToast('Event removed from your account.', 'info');
  }, [addToast, events, selectedEventId, token]);

  const updateEventCover = useCallback(async (id, cover) => {
    if (!token) throw new Error('Sign in before updating an event image.');
    const response = await eventApi.update(token, id, { cover });
    const updated = normalizeEvent(response.event);
    setEvents((current) => current.map((event) => (event.id === id ? { ...event, ...updated } : event)));
  }, [token]);

  const addBudgetItem = useCallback(async (item) => {
    if (!token || !selectedEventId) throw new Error('Create or select an event before adding a budget allocation.');
    const allocation = {
      category: item.category.trim(),
      allocated: Number(item.allocated) || 0,
      spent: Number(item.spent) || 0,
      notes: item.notes || '',
    };
    const allocations = [...budgetCategories, allocation].map(({ category, allocated, spent, notes }) => ({
      category, allocated, spent, notes,
    }));
    const payload = {
      event: selectedEventId,
      totalBudget: Number(budgetRecord?.totalBudget || activeEvent.totalBudget || 0),
      allocations,
    };
    const response = budgetRecord?._id
      ? await budgetApi.update(token, budgetRecord._id, payload)
      : await budgetApi.create(token, payload);
    setBudgetRecord(response.budget);
    setBudgetCategories(normalizeBudget(response.budget));
    addToast('Budget allocation saved.');
  }, [activeEvent.totalBudget, addToast, budgetCategories, budgetRecord, selectedEventId, token]);

  const addVendor = useCallback(async (vendor) => {
    if (!token || !selectedEventId) throw new Error('Create or select an event before registering a vendor.');
    const response = await vendorApi.create(token, {
      event: selectedEventId,
      name: vendor.name,
      category: vendor.category.toLowerCase(),
      contact: vendor.contact,
      quote: Number(vendor.quote) || 0,
      paymentStatus: vendor.status.toLowerCase(),
      notes: vendor.notes,
    });
    const created = normalizeVendor(response.vendor);
    setVendors((current) => [created, ...current]);
    addToast('Vendor registered successfully.');
  }, [addToast, selectedEventId, token]);

  const deleteVendor = useCallback(async (id) => {
    if (!token) throw new Error('Sign in before removing a vendor.');
    await vendorApi.remove(token, id);
    setVendors((current) => current.filter((vendor) => vendor.id !== id));
    addToast('Vendor removed.', 'info');
  }, [addToast, token]);

  const toggleTask = useCallback(async (taskId) => {
    if (!token || !selectedEventId || tasksEventId !== selectedEventId) {
      addToast('Select an event and wait for its checklist to load.', 'error');
      return;
    }

    const previousTasks = tasks;
    const updatedTasks = tasks.map((task) => (
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    setTasks(updatedTasks);

    try {
      const response = await eventApi.updateChecklist(
        token,
        selectedEventId,
        updatedTasks.map(({ title, category, priority, timing, completed }) => ({
          title,
          category,
          priority,
          timing,
          completed,
        }))
      );
      if (selectedEventId === tasksEventId) {
        setTasks(normalizeChecklist(response.checklist || updatedTasks, selectedEventId));
      }
      addToast('Checklist saved to this event.', 'success');
    } catch (error) {
      setTasks((current) => (
        selectedEventId === tasksEventId ? previousTasks : current
      ));
      addToast(`Unable to save checklist: ${error.message}`, 'error');
    }
  }, [addToast, selectedEventId, tasks, tasksEventId, token]);

  const hasSelectedEventData = authStatus === 'authenticated' && Boolean(token && selectedEventId);
  const value = useMemo(() => ({
    user: user || { name: 'Guest', email: '', avatar: '', plan: 'Guest' },
    events: authStatus === 'authenticated' && !dataLoading ? events : [],
    selectedEventId,
    setSelectedEventId,
    activeEvent: authStatus === 'authenticated' && !dataLoading ? activeEvent : {
      id: '',
      title: 'No celebration selected',
      type: 'Event',
      date: '',
      location: '',
      guests: 0,
      description: '',
      totalBudget: 0,
      allocatedBudget: 0,
      status: 'Planning',
      cover: createEventCoverUrl({ type: 'Event' }),
    },
    createEvent,
    deleteEvent,
    updateEventCover,
    budgetCategories: hasSelectedEventData ? budgetCategories : [],
    budgetRecord: hasSelectedEventData ? budgetRecord : null,
    addBudgetItem,
    vendors: hasSelectedEventData ? vendors : [],
    addVendor,
    deleteVendor,
    tasks: hasSelectedEventData && tasksEventId === selectedEventId ? tasks : [],
    toggleTask,
    dataLoading,
    toasts,
    addToast,
    removeToast,
  }), [
    activeEvent, addBudgetItem, addToast, addVendor, authStatus, budgetCategories, budgetRecord,
    createEvent, dataLoading, deleteEvent, deleteVendor, events, hasSelectedEventData, removeToast,
    selectedEventId, tasks, tasksEventId, toasts, toggleTask, updateEventCover, user, vendors,
  ]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}
