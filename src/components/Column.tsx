import type { Task, TaskAction, TaskStatus } from "../types/task";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  dispatch: (action: TaskAction) => void;
}

const columnAccentClasses: Record<TaskStatus, string> = {
  todo: "border-t-4 border-t-sky-400",
  inprogress: "border-t-4 border-t-amber-400",
  done: "border-t-4 border-t-emerald-400"
};

export function Column({ title, status, tasks, dispatch }: ColumnProps) {
  const hasTasks = tasks.length > 0;

  return (
    <section
      className={`bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 ${columnAccentClasses[status]}`}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg text-slate-900">{title}</h2>
          <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {tasks.length}
          </span>
        </div>
      </header>
      <div className="flex-1 flex flex-col gap-3">
        {!hasTasks && (
          <p className="text-sm text-slate-400 italic">
            No tasks in this column
          </p>
        )}
        {hasTasks && (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} dispatch={dispatch} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

