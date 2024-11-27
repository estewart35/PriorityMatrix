import TaskForm from "./TaskForm";

const AddTaskModal = ({ onAddTask }) => {
    return (
        <>
            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addTaskModal" title="Add New Task"><i className="bi bi-plus-lg"></i></button>

            <div className="modal fade" id="addTaskModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <TaskForm onAddTask={onAddTask} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary"><i className="bi bi-plus-lg me-2"></i>Add New Task</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddTaskModal;