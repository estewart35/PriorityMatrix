import { createContext, useReducer, useEffect } from "react";
import { fetchTasks, saveTasks } from "../utils/db";

const TaskContext = createContext();

const defaultTaskState = {
  tasks: { Q1: [], Q2: [], Q3: [], Q4: [] },
  loading: false,
  error: "",
  success: "",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      const defaultQuadrants = { Q1: [], Q2: [], Q3: [], Q4: [] };
      return { ...state, tasks: { ...defaultQuadrants, ...action.tasks } };
    case "ADD_TASK":
      const updatedTasks = [...state.tasks[action.quadrant]];

      // If an index is provided, insert the task at the specified index
      if (action.insertionIndex !== null && action.insertionIndex !== undefined) {
        updatedTasks.splice(action.insertionIndex, 0, action.task); // Insert at the specified index
      } else {
        updatedTasks.push(action.task); // If no index, add to the end
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.quadrant]: updatedTasks,
        },
      };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.quadrant]: state.tasks[action.quadrant].filter(
            (task) => task.id !== action.taskId
          ),
        },
      };
    case "REORDER_TASKS":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.quadrant]: action.tasks,
        },
      };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_SUCCESS":
      return { ...state, success: action.success };
    default:
      return state;
  }
};


export const TaskProvider = ({ children, user }) => {
  const [taskState, dispatch] = useReducer(taskReducer, defaultTaskState);

  // Load tasks from the database when user changes
  useEffect(() => {
    const loadTasks = async () => {
      if (!user) return;
      dispatch({ type: "SET_LOADING", loading: true });
      try {
        const loadedTasks = await fetchTasks(user.uid); // Fetch from DB
        dispatch({ type: "SET_TASKS", tasks: loadedTasks });
      } catch (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", loading: false });
      }
    };
    loadTasks();
  }, [user]);

  // Add a task
  const addTask = async (quadrant, task) => {
    dispatch({ type: "ADD_TASK", quadrant, task });
    try {
      const updatedTasks = { ...taskState.tasks };
      updatedTasks[quadrant] = [...updatedTasks[quadrant], task];
      await saveTasks(user.uid, updatedTasks);
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: "Failed to save task" });
    }
  };

  // Remove a task
  const removeTask = async (quadrant, taskId) => {
    dispatch({ type: "REMOVE_TASK", quadrant, taskId });
    try {
      const updatedTasks = { ...taskState.tasks };
      updatedTasks[quadrant] = updatedTasks[quadrant].filter((task) => task.id !== taskId);
      await saveTasks(user.uid, updatedTasks);
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: "Failed to remove task" });
    }
  };

  // Reorder tasks
  const reorderTasks = async (quadrant, newOrder) => {
    dispatch({ type: "REORDER_TASKS", quadrant, tasks: newOrder });
    try {
      await saveTasks(user.uid, { ...taskState.tasks, [quadrant]: newOrder }); // Save to DB
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: "Failed to reorder tasks" });
    }
  };

  // Move the task from one quadrant to another
  const moveTask = async (sourceQuadrant, destinationQuadrant, task, updateDB = false, insertionIndex = null) => {
    dispatch({ type: "REMOVE_TASK", quadrant: sourceQuadrant, taskId: task.id });
    dispatch({ type: "ADD_TASK", quadrant: destinationQuadrant, task, insertionIndex });

    // Optionally update the database
    if (updateDB) {
      try {
        // Remove source quadrant task
        const updatedTasks = { ...taskState.tasks };
        updatedTasks[sourceQuadrant] = updatedTasks[sourceQuadrant].filter((t) => t.id !== task.id);

        // Insert into the destination quadrant
        if (insertionIndex === null || insertionIndex === -1) {
          updatedTasks[destinationQuadrant].push(task);  // Add to the end of the destination
        } else {
          updatedTasks[destinationQuadrant].splice(insertionIndex, 0, task);  // Insert at specific index
        }

        await saveTasks(user.uid, updatedTasks);  // Save the updated tasks
      } catch (error) {
        dispatch({ type: "SET_ERROR", error: "Failed to move task" });
      }
    }
  };


  const contextValue = {
    tasks: taskState.tasks,
    loading: taskState.loading,
    error: taskState.error,
    success: taskState.success,
    addTask,
    removeTask,
    reorderTasks,
    moveTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;

