import type { Task, TaskAction } from "../types/task";

interface TaskCardProps {
  task: Task;
  dispatch: (action: TaskAction) => void;
}

export function TaskCard({ task, dispatch }: TaskCardProps) {
  const isDone = task.status === "done";

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: { id: task.id } });
  };

  const handleMove = () => {
    dispatch({ type: "MOVE_TASK", payload: { id: task.id } });
  };

  return (
    <article className="bg-gray-50 rounded-lg shadow-sm border border-slate-100 p-3 flex flex-col gap-2 hover:shadow-md hover:-translate-y-0.5 transition">
      <header className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
          {task.title}
        </h3>
        <span
          className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500"
        >
          {task.status === "todo" && "To Do"}
          {task.status === "inprogress" && "In Progress"}
          {task.status === "done" && "Done"}
        </span>
      </header>
      {task.description && (
        <p className="text-xs text-slate-600 whitespace-pre-line">
          {task.description}
        </p>
      )}
      <footer className="mt-1 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleMove}
            disabled={isDone}
            className="rounded-md px-3 py-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isDone ? "Done" : "Move"}
          </button>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md px-3 py-1 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:opacity-90 transition"
        >
          Delete
        </button>
      </footer>
    </article>
  );
}

