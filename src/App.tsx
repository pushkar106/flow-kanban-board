import { useEffect, useReducer } from "react";
import { Column } from "./components/Column";
import { TaskForm } from "./components/TaskForm";
import { initialTaskState, taskReducer } from "./state/taskReducer";
import type { Task, TaskStatus } from "./types/task";

const STORAGE_KEY = "flow-kanban-tasks";

function loadTasksFromStorage(): Task[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as Task[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((task) => ({
      ...task,
      status: task.status ?? "todo"
    }));
  } catch {
    return [];
  }
}

function saveTasksToStorage(tasks: Task[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore write errors
  }
}

const STATUSES: { key: TaskStatus; title: string }[] = [
  { key: "todo", title: "To Do" },
  { key: "inprogress", title: "In Progress" },
  { key: "done", title: "Done" }
];

export function App() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    const tasks = loadTasksFromStorage();
    if (tasks.length) {
      dispatch({ type: "LOAD_TASKS", payload: { tasks } });
    }
  }, []);

  useEffect(() => {
    saveTasksToStorage(state.tasks);
  }, [state.tasks]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <main className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Flow Kanban Board
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              A lightweight Kanban board for tracking tasks across To Do, In
              Progress, and Done.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Local only · No external APIs</span>
          </div>
        </header>

        <TaskForm dispatch={dispatch} />

        <section className="grid gap-4 md:gap-6 md:grid-cols-3">
          {STATUSES.map(({ key, title }) => (
            <Column
              key={key}
              title={title}
              status={key}
              tasks={state.tasks.filter((task) => task.status === key)}
              dispatch={dispatch}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

