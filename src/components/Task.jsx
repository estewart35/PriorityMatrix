import { useContext } from 'react';
import TaskContext from '../store/TaskContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Task = ({ id, task }) => {
    const { updateTask, deleteTask } = useContext(TaskContext);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging && id ? 0.3 : 1,
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
    };

    const handleCheckChange = () => {
        updateTask(id, { ...task, checked: !task.checked });
    };

    const handleDelete = () => {
        deleteTask(id);
    };

    return (
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
            <div className="">
                <button className="btn btn-sm btn-light me-1" title="Edit Task"><i className="bi bi-pencil-fill text-dark"></i></button>
                <button className="btn btn-sm btn-light" title="Delete Task"><i className="bi bi-trash-fill text-dark"></i></button>
            </div>
        </div>
    );
}

export default Task;