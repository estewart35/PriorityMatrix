import { useContext, useState } from 'react';
import TaskContext from '../store/TaskContext';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Task from './Task';
import TaskModal from './TaskModal';
import ToastMessage from "./ToastMessage";

const Quadrant = ({ id, title }) => {
    const { tasks, error, success, warning, addTask, updateTask, removeTask, clearMessages } = useContext(TaskContext);
    const { setNodeRef } = useDroppable({ id });
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    // Filter tasks specific to this quadrant
    const quadrantTasks = tasks[id] || [];

    const handleAddTask = (newTask) => {
        addTask(id, newTask);
    };

    const handleUpdateTask = (taskId, updatedTask) => {
        updateTask(id, taskId, updatedTask);
    };

    const handleDeleteTask = (taskId) => {
        removeTask(id, taskId);
    };

    let quadrantColor;
    let topHeading;
    let leftHeading;
    if (id === "Q1") {
        quadrantColor = "info";
        topHeading = "Urgent";
        leftHeading = "Important";
    } else if (id === "Q2") {
        quadrantColor = "success";
        topHeading = "Not Urgent";
        leftHeading = "Important";
    } else if (id === "Q3") {
        quadrantColor = "warning";
        topHeading = "Urgent";
        leftHeading = "Not Important";
    } else if (id === "Q4") {
        quadrantColor = "danger";
        topHeading = "Not Urgent";
        leftHeading = "Not Important";
    }

    return (
        <>
            {error && <ToastMessage message={error} color="text-bg-danger" closeToast={clearMessages} />}
            {success && <ToastMessage message={success} color="text-bg-success" closeToast={clearMessages} />}
            {warning && <ToastMessage message={warning} color="text-bg-warning" closeToast={clearMessages} />}
        
            <div className="d-flex">
                <div
                    style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "10px",
                        paddingBottom: "50px",
                        fontWeight: "bold",
                        fontSize: "22pt",
                    }}
                >
                    {leftHeading}
                </div>

                <div className="w-100">
                    <div className="text-center fw-bold mb-2" style={{fontSize: "20pt"}}>
                        {topHeading}
                    </div>

                    <div className={`card bg-light rounded-4 border border-2 border-${quadrantColor}`} ref={setNodeRef} style={{minHeight: "250px"}}>
                        <div className="card-title d-flex justify-content-between align-items-center pt-3 mx-4">
                            <h4 className="text-primary">{id}</h4>
                            <h4 className={`fw-bold text-${quadrantColor}`}>{title}</h4>
                            <button className="btn btn-sm btn-primary" onClick={() => setIsAddTaskModalOpen(true)} title={`Add New Task to ${id}`}>
                                <i className="bi bi-plus-lg"></i>
                            </button>
                            <TaskModal isOpen={isAddTaskModalOpen} setIsOpen={setIsAddTaskModalOpen} handleAddTask={handleAddTask} />
                        </div>
                        <div className="card-body pt-0">
                            <SortableContext items={quadrantTasks} strategy={verticalListSortingStrategy}>
                                {quadrantTasks.map((task) => (
                                    <Task key={task.id} id={task.id} task={task} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                                ))}
                            </SortableContext>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quadrant;