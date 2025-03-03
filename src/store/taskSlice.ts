import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/task";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {                                   //state: Represents the current state of the tasks slice. action: Represents the action dispatched to update a task. PayloadAction<Task> type indicates that the action contains a payload of type Task
      const index = state.tasks.findIndex(task => task.id === action.payload.id);           //Finds the index of the task to update in the tasks array. This line searches the tasks array in the state to find the index of the task that matches the id provided in the action's payload. findIndex returns the index of the first element that satisfies the condition
      if (index !== -1) {                                                                   // This line checks if the task was found in the tasks array. If the task is not found, findIndex returns -1
        state.tasks[index] = action.payload;                                                //Updates the task in the tasks array. If the task is found, the task at the index is updated with the new task data provided in the action's payload
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      // Filter out the task with the matching ID
      state.tasks = state.tasks.filter(task => task.id !== action.payload);                 //filter Method: The filter method creates a new array containing all tasks except the one with the id that matches action.payload.
    },
  },
});

export const { addTask, updateTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;