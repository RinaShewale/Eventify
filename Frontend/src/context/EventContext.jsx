import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Ananya Sharma',
    email: 'ananya.sharma@maison.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    plan: 'Maison Haute Tier',
    totalPlanned: 4,
  });

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [events, setEvents] = useState([
    {
      id: 'ev-1',
      title: 'Aarav & Meera Royal Sangeet',
      type: 'Wedding Celebration',
      date: '2025-11-18',
      location: 'Udaivilas Palace, Udaipur',
      guests: 350,
      description: 'A 2-day royal celebration synthesizing heritage sitar symphonies, couture silk canopies, and private banquets.',
      totalBudget: 4500000,
      allocatedBudget: 3850000,
      status: 'Upcoming',
      cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'ev-2',
      title: 'SolvX AI Sovereign Gala',
      type: 'Corporate Gala',
      date: '2025-08-24',
      location: 'The Leela Palace, Bengaluru',
      guests: 180,
      description: 'Exclusive private keynote unveil followed by ambient cellar champagne cocktails.',
      totalBudget: 1500000,
      allocatedBudget: 1100000,
      status: 'Upcoming',
      cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'ev-3',
      title: 'Reyansh 1st Birthday Safari Voyage',
      type: 'Birthday Celebration',
      date: '2025-06-12',
      location: 'JW Marriott Juhu, Mumbai',
      guests: 85,
      description: 'Whimsical luxury pastel safari theme with artisan confectionery and string quartets.',
      totalBudget: 600000,
      allocatedBudget: 550000,
      status: 'Planning',
      cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    },
  ]);

  const [selectedEventId, setSelectedEventId] = useState('ev-1');

  const [budgetCategories, setBudgetCategories] = useState([
    { id: 'b-1', category: 'Venue', allocated: 1800000, spent: 1800000, notes: 'Palace Courtyard & Suite Allocation' },
    { id: 'b-2', category: 'Catering', allocated: 1200000, spent: 800000, notes: '5-Course Curated Royal Banquet' },
    { id: 'b-3', category: 'Photography', allocated: 400000, spent: 250000, notes: 'Cinematic 35mm Master Crew' },
    { id: 'b-4', category: 'Decoration', allocated: 650000, spent: 650000, notes: 'Handcrafted Tuberose Canopy & Low Mist' },
    { id: 'b-5', category: 'Music', allocated: 300000, spent: 200000, notes: 'Sufi Fusion Quartet & Late DJ' },
    { id: 'b-6', category: 'Other', allocated: 150000, spent: 150000, notes: 'Handmade Silk Guest Hampers' },
  ]);

  const [vendors, setVendors] = useState([
    { id: 'v-1', name: 'Royal Mewar Banquets', category: 'Venue', contact: '+91 98201 44321', quote: 1800000, status: 'Paid', notes: 'Advance & security cleared' },
    { id: 'v-2', name: 'Flavours by Chef Ranveer', category: 'Catering', contact: '+91 97112 88490', quote: 1200000, status: 'Partial', notes: 'Final royal tasting on 15 Oct' },
    { id: 'v-3', name: 'Stories by Joseph Radhik', category: 'Photography', contact: '+91 98403 99120', quote: 400000, status: 'Partial', notes: 'Lead visual director confirmed' },
    { id: 'v-4', name: 'Kalika Botanical Florals', category: 'Decoration', contact: '+91 91234 56789', quote: 650000, status: 'Paid', notes: 'Imported fresh white tuberoses' },
    { id: 'v-5', name: 'DJ Shadow & Percussionists', category: 'Music', contact: '+91 99887 66554', quote: 300000, status: 'Pending', notes: 'Awaiting revised late-night set' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 't-1', title: 'Curate Traditional Rajasthani Folk Ensemble', category: 'Music', priority: 'High', timing: '4 weeks prior', completed: true },
    { id: 't-2', title: 'Private Menu Tasting with Executive Chef', category: 'Catering', priority: 'High', timing: '3 weeks prior', completed: true },
    { id: 't-3', title: 'Dispatch Hand-Pressed Wax Seal Invitations', category: 'Guest Services', priority: 'Medium', timing: '2 weeks prior', completed: false },
    { id: 't-4', title: 'Synchronize Architectural Projection Mapping', category: 'Decoration', priority: 'High', timing: '10 days prior', completed: false },
    { id: 't-5', title: 'Final RSVP Headcount & Dietary Matrix Confirmation', category: 'Hospitality', priority: 'Low', timing: '5 days prior', completed: false },
  ]);

  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const createEvent = (newEvent) => {
    const id = `ev-${Date.now()}`;
    const fullEvent = {
      ...newEvent,
      id,
      totalBudget: Number(newEvent.totalBudget) || 1000000,
      allocatedBudget: 0,
      status: 'Upcoming',
      cover: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    };
    setEvents([fullEvent, ...events]);
    setSelectedEventId(id);
    addToast(`"${newEvent.title}" initiated in registry`);
    return id;
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    if (selectedEventId === id) {
      setSelectedEventId(events[0]?.id || '');
    }
    addToast('Event archived from record', 'info');
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
    addToast('Task state synchronized');
  };

  const addVendor = (vendor) => {
    setVendors([{ ...vendor, id: `v-${Date.now()}` }, ...vendors]);
    addToast('Vendor registered to directory');
  };

  const deleteVendor = (id) => {
    setVendors(vendors.filter((v) => v.id !== id));
    addToast('Vendor removed from dossier', 'info');
  };

  const addBudgetItem = (item) => {
    setBudgetCategories([...budgetCategories, { ...item, id: `b-${Date.now()}` }]);
    addToast('Financial allocation amended');
  };

  return (
    <EventContext.Provider
      value={{
        user,
        setUser,
        events,
        selectedEventId,
        setSelectedEventId,
        activeEvent,
        createEvent,
        deleteEvent,
        budgetCategories,
        addBudgetItem,
        vendors,
        addVendor,
        deleteVendor,
        tasks,
        toggleTask,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);