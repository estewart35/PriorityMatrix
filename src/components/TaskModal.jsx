import TaskForm from "./TaskForm";
import ReactDOM from "react-dom";

const TaskModal = ({ isOpen, setIsOpen, isUpdate = false, handleAddTask, handleUpdateTask, currentTask }) => {

    const onAddTask = (newTask) => {
        handleAddTask(newTask);
        setIsOpen(false);
    };

    const onUpdateTask = (updatedTask) => {
        handleUpdateTask(updatedTask);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-backdrop show"></div>

            <div className="modal fade show d-block">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isUpdate ? "Update Task" : "Add New Task"}</h5>
                            <button type="button" className="btn-close" onClick={() => setIsOpen(false)} aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <TaskForm isUpdate={isUpdate} onAddTask={onAddTask} onUpdateTask={onUpdateTask} currentTask={currentTask} />
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

export default TaskModal;