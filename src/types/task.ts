export type TaskStatus = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskState {
  tasks: Task[];
}

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: { title: string; description: string };
    }
  | {
      type: "DELETE_TASK";
      payload: { id: string };
    }
  | {
      type: "MOVE_TASK";
      payload: { id: string };
    }
  | {
    type: "LOAD_TASKS";
    payload: { tasks: Task[] };
  };
