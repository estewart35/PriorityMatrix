import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import TaskModal from './TaskModal';
import ConfirmationModal from './ConfirmationModal';

const Task = ({ id, task, onUpdateTask, onDeleteTask }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id});
    const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
    const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);

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
                    <label 
                        className="form-check-label" 
                        style={{
                            textDecoration: task.checked ? "line-through" : "none",
                            color: task.checked ? "gray" : "inherit",
                        }}>
                        {task.title}
                    </label>
                </div>
                <div className="d-flex">
                    <button className="btn btn-sm btn-light me-1" onClick={() => setIsUpdateTaskModalOpen(true)} title="Edit Task"><i className="bi bi-pencil-fill text-dark"></i></button>
                    <button className="btn btn-sm btn-light" onClick={() => setIsDeleteConfirmationModalOpen(true)} title="Delete Task"><i className="bi bi-trash-fill text-dark"></i></button>
                </div>
            </div>
        </>
    );
}

export default Task;