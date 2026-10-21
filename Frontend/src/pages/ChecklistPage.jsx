import { useEventContext } from '../hooks/useEventContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { Clock } from 'lucide-react';

export default function ChecklistPage() {
  const { tasks, toggleTask, activeEvent, events, dataLoading } = useEventContext();

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy">Run-of-Show Protocol</h1>
        <p className="text-xs text-burgundy/70 mt-1 font-light tracking-wide">
          {activeEvent.id
            ? `Checklist for ${activeEvent.title}. Tasks and progress are saved to this event.`
            : 'Select or create an event to view its checklist.'}
        </p>
      </div>

      {!dataLoading && !events.length && (
        <Card className="py-8 text-center text-sm text-burgundy/70">
          Create an event first to start its checklist.
        </Card>
      )}

      {/* Progress Card */}
      <Card>
        <div className="flex justify-between items-center mb-3">
          <span className="font-editorial text-xl text-burgundy">Execution Readiness</span>
          <span className="text-xs font-semibold text-burgundy">{progressPercent}% Completed</span>
        </div>
        <ProgressBar value={completedCount} max={tasks.length} />
      </Card>

      {/* Task List */}
      <div className="space-y-3" aria-busy={Boolean(activeEvent.id && !tasks.length)}>
        {activeEvent.id && !tasks.length && (
          <Card className="py-8 text-center text-sm text-burgundy/70">
            Loading this event's checklist...
          </Card>
        )}
        {tasks.map((task) => (
          <Card
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
              task.completed ? 'opacity-50 bg-creme-50/40' : 'hover:border-dustyPink'
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onClick={(event) => event.stopPropagation()}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 accent-burgundy cursor-pointer"
              />
              <div>
                <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-burgundy/40' : 'text-burgundy'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-burgundy/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-dustyPink-dark" /> {task.timing}
                  </span>
                  <span>•</span>
                  <span>{task.category}</span>
                </div>
              </div>
            </div>

            <Badge variant={task.priority === 'High' ? 'danger' : 'warning'}>
              {task.priority}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}