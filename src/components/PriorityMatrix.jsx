import { useState, useContext } from "react";
import TaskContext from "../store/TaskContext";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  DragOverlay,
  defaultDropAnimation,
  TouchSensor,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Quadrant from "./Quadrant";
import Task from "./Task";

const PriorityMatrix = () => {
    const { tasks, moveTask, reorderTasks } = useContext(TaskContext);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [initQuadrant, setInitQuadrant] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 150, // Drag starts after 150ms of holding
                tolerance: 5, // Drag starts only after moving 5px
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        }),
    );

    const handleDragStart = ({ active }) => {
        setActiveTaskId(active.id);
        setInitQuadrant(findQuadrant(tasks, active.id));
    };

    const handleDragOver = ({ active, over }) => {
        if (!over) return;

        const activeQuadrant = findQuadrant(tasks, active.id);
        const overQuadrant = findQuadrant(tasks, over.id);

        if (!activeQuadrant || !overQuadrant || activeQuadrant === overQuadrant) {
            return;
        }

        const activeTask = tasks[activeQuadrant].find((task) => task.id === active.id);

        if (activeTask) {
            moveTask(activeQuadrant, overQuadrant, activeTask); // UI-only update
        }
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const activeQuadrant = findQuadrant(tasks, active.id);
        const overQuadrant = findQuadrant(tasks, over.id);

        if (!activeQuadrant || !overQuadrant || !initQuadrant) {
            return;
        }

        const activeIndex = tasks[activeQuadrant].findIndex((task) => task.id === active.id);
        const overIndex = tasks[overQuadrant].findIndex((task) => task.id === over.id);

        if (initQuadrant === overQuadrant) {
            if (activeIndex !== overIndex) {
                const updatedTasks = arrayMove(tasks[activeQuadrant], activeIndex, overIndex);
                reorderTasks(overQuadrant, updatedTasks); // Update state and DB
            }
        } else {
            const activeTask = tasks[activeQuadrant].find((task) => task.id === active.id);

            if (activeTask) {
                moveTask(activeQuadrant, overQuadrant, activeTask, true, overIndex); // Persist to DB
            }
        }

        setActiveTaskId(null);
        setInitQuadrant(null);
    };

    const findQuadrant = (tasks, id) => {
        // Check if the ID directly matches a quadrant
        if (Object.keys(tasks).includes(id)) {
            return id;
        }
        // Otherwise, find the quadrant by task ID
        return Object.keys(tasks).find((quadrant) =>
            tasks[quadrant].some((task) => task.id === id)
        );
    };

    const dropAnimation = {
        ...defaultDropAnimation,
    };

    const activeTask = activeTaskId
        ? Object.values(tasks).flat().find((task) => task.id === activeTaskId)
        : null;

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="row g-4">
                <div className="col-md-6">
                    <Quadrant id="Q1" title="Do Now" />
                </div>
                <div className="col-md-6">
                    <Quadrant id="Q2" title="Do Next - Schedule" />
                </div>
                <div className="col-md-6">
                    <Quadrant id="Q3" title="Do Later - Delegate" />
                </div>
                <div className="col-md-6">
                    <Quadrant id="Q4" title="Don't Do" />
                </div>
            </div>
            <DragOverlay dropAnimation={dropAnimation}>
                {activeTask ? (
                    <Task task={activeTask} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

export default PriorityMatrix;