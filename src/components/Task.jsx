import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import TaskModal from './TaskModal';
import ConfirmationModal from './ConfirmationModal';

const Task = ({ id, task, onUpdateTask, onDeleteTask }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id});
    const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
    const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging && id ? 0.3 : 1,
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
    };

    const handleCheckChange = () => {
        onUpdateTask(id, { ...task, checked: !task.checked });
    };

    const handleUpdateTask = (updatedTask) => {
        onUpdateTask(id, updatedTask);
    };

    const handleDeleteTask = () => {
        onDeleteTask(id);
    };

    const formatDeadline = (deadline) => {
        if (!deadline) return;
        const date = new Date(deadline);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    };

    return (
        <>    
            <TaskModal isUpdate={true} isOpen={isUpdateTaskModalOpen} setIsOpen={setIsUpdateTaskModalOpen} handleUpdateTask={handleUpdateTask} currentTask={task} />
            <ConfirmationModal message={`delete task, ${task.title}`} isOpen={isDeleteConfirmationModalOpen} setIsOpen={setIsDeleteConfirmationModalOpen} onDeleteConfirmation={handleDeleteTask} />
            
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                className="d-flex justify-content-between align-items-center rounded bg-white shadow-sm p-2 m-2"
                style={style}
                data-drag-handle
            >
                <div className="d-flex align-items-center">
                    <input 
                        className="form-check-input me-3 ms-1" 
                        type="checkbox"
                        style={{width: "25px", height: "25px", cursor: "pointer", alignSelf: "center", marginTop: "0"}} 
                        checked={task.checked}
                        onChange={handleCheckChange}
                    />
                    <div className="d-flex flex-column" 
                            onClick={() => setIsUpdateTaskModalOpen(true)}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            title="View/Edit Task">
                        <label 
                            
                            className="form-check-label" 
                            style={{
                                textDecoration: hovered ? "underline" : task.checked ? "line-through" : "none",
                                color: task.checked ? "gray" : "inherit",
                                cursor: "pointer",
                            }}
                        >
                            {task.title}
                        </label>
                        <label 
                            className="form-check-label"
                            style={{
                                textDecoration: hovered ? "underline" : task.checked ? "line-through" : "none",
                                color: "gray",
                                cursor: "pointer",
                                fontSize: "9pt",
                            }}
                        >
                            {formatDeadline(task.deadline)}
                        </label>
                    </div>
                </div>
                {/* <div className="d-flex align-items-center"> */}
                    {/* <button className="btn btn-sm btn-light me-1" onClick={() => setIsUpdateTaskModalOpen(true)} title="Edit Task"><i className="bi bi-pencil-fill text-dark"></i></button> */}
                    <button className="btn btn-sm btn-light ms-2" onClick={() => setIsDeleteConfirmationModalOpen(true)} title="Delete Task"><i className="bi bi-trash-fill text-dark"></i></button>
                {/* </div> */}
            </div>
        </>
    );
}

export default Task;