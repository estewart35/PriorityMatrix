import ReactDOM from "react-dom";

const ConfirmationModal = ({ isOpen, setIsOpen, message, onDeleteConfirmation }) => {
    const onConfirmDeleteTask = () => {
        onDeleteConfirmation();
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-backdrop show"></div>

            <div className="modal fade show d-block">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" onClick={() => setIsOpen(false)} aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body text-center px-4 pt-0 pb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" fill="currentColor" className="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg>
                            <h4 className="mt-3 mb-4">Are you sure you want to {message}?</h4>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn btn-light me-3" onClick={() => setIsOpen(false)} title="Edit Task">No, cancel</button>
                                <button className="btn btn btn-danger" onClick={onConfirmDeleteTask} title="Delete Task">Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

export default ConfirmationModal;