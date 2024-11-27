const ToastMessage = ({ message, color, closeToast }) => {
    return (
        <div className="toast-container position-fixed top-1 end-0 px-3">
            <div id="liveToast" className={`show toast align-items-center ${color} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {message}
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" onClick={() => {closeToast()}}></button>
                </div>
            </div>
        </div>
    );
}

export default ToastMessage;