import { FormEvent, useState } from "react";
import type { TaskAction } from "../types/task";

interface TaskFormProps {
  dispatch: (action: TaskAction) => void;
}

export function TaskForm({ dispatch }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        title: trimmedTitle,
        description
      }
    });

    setTitle("");
    setDescription("");
    setError("");
  };

  return (
    <section className="mb-6">
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Add Task
          </h2>
          <span className="text-xs text-slate-400 uppercase tracking-wide">
            Flow Kanban
          </span>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="task-title"
              className="text-sm font-medium text-slate-700"
            >
              Title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
              placeholder="e.g. Design login screen"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="task-description"
              className="text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition resize-none"
              placeholder="Add a bit more detail..."
            />
          </div>
          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 transition"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

