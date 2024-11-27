const LoadingSpinner = ({ size }) => {
    return (
        <div 
            className="d-flex justify-content-center align-items-center" 
            style={{
                position: "fixed",
                top: "40%",
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <div className="spinner-border text-primary" style={{ width: size, height: size }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;