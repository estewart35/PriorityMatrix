import { useState } from "react";
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
    const [tasks, setTasks] = useState({
        Q1: [{ id: 1, title: "Task 1", checked: false }, { id: 2, title: "Task 2", checked: false }],
        Q2: [{ id: 3, title: "Task 3", checked: false }],
        Q3: [],
        Q4: [{ id: 4, title: "Task 4", checked: false }],
    });
    const [activeTaskId, setActiveTaskId] = useState(null);

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
    };

    const handleDragOver = ({ active, over }) => {
        if (!over) return;

        const activeQuadrant = findQuadrant(tasks, active.id);
        const overQuadrant = findQuadrant(tasks, over.id);

        if (!activeQuadrant || !overQuadrant || activeQuadrant === overQuadrant) {
            return;
        }

        setTasks((prev) => {
            const activeTasks = [...prev[activeQuadrant]];
            const overTasks = [...prev[overQuadrant]];

            const activeIndex = activeTasks.findIndex((task) => task.id === active.id);
            const [movedTask] = activeTasks.splice(activeIndex, 1);

            return {
                ...prev,
                [activeQuadrant]: activeTasks,
                [overQuadrant]: [...overTasks, movedTask],
            };
        });
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const activeQuadrant = findQuadrant(tasks, active.id);
        const overQuadrant = findQuadrant(tasks, over.id);

        if (!activeQuadrant || !overQuadrant || activeQuadrant !== overQuadrant) {
            return;
        }

        const activeIndex = tasks[activeQuadrant].findIndex((task) => task.id === active.id);
        const overIndex = tasks[overQuadrant].findIndex((task) => task.id === over.id);

        if (activeIndex !== overIndex) {
            setTasks((prev) => ({
                ...prev,
                [overQuadrant]: arrayMove(prev[overQuadrant], activeIndex, overIndex),
            }));
        }

        setActiveTaskId(null);
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

    const handleCheckChange = (taskId) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };

            Object.keys(updatedTasks).forEach((quadrant) => {
                updatedTasks[quadrant] = updatedTasks[quadrant].map((task) =>
                    task.id === taskId ? { ...task, checked: !task.checked } : task
                );
            });

            return updatedTasks;
        });
    };

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
                    <Quadrant id="Q1" title="Do Now" tasks={tasks.Q1} onCheckChange={handleCheckChange} />
                </div>
                <div className="col-md-6">
                    <Quadrant id="Q2" title="Do Next - Schedule" tasks={tasks.Q2} onCheckChange={handleCheckChange} />
                </div>
                <div className="col-md-6">
                    <Quadrant id="Q3" title="Do Later - Delegate" tasks={tasks.Q3} onCheckChange={handleCheckChange} />
                </div>
                <div className="col-md-6">
                    <Quadrant id="Q4" title="Don't Do" tasks={tasks.Q4} onCheckChange={handleCheckChange} />
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