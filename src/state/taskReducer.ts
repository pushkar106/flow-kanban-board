import { Task, TaskAction, TaskState } from "../types/task";

export const initialTaskState: TaskState = {
  tasks: []
};

const nextStatusMap: Record<Task["status"], Task["status"] | null> = {
  todo: "inprogress",
  inprogress: "done",
  done: null
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title.trim(),
        description: action.payload.description.trim(),
        status: "todo"
      };

      if (!newTask.title) {
        return state;
      }

      return {
        ...state,
        tasks: [newTask, ...state.tasks]
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id)
      };
    }
    case "MOVE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.payload.id) {
            return task;
          }

          const nextStatus = nextStatusMap[task.status];

          if (!nextStatus) {
            return task;
          }

          return { ...task, status: nextStatus };
        })
      };
    }
    case "LOAD_TASKS": {
      return {
        ...state,
        tasks: action.payload.tasks
      };
    }
    default:
      return state;
  }
}

