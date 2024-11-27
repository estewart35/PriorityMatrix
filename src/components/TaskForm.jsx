import useInput from "../hooks/useInput";

const TaskForm = ({ onAddTask }) => {
    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitleInput,
    } = useInput((value) => value.trim() !== "");

    const submitHandler = (event) => {
        event.preventDefault();

        const newTask = {
            id: Date.now(),
            title: enteredTitle,
            checked: false,
        };
        
        onAddTask(newTask);

        resetTitleInput();
    }

    let formIsValid = false;
    if (enteredTitleIsValid) {
        formIsValid = true;
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="title">Title <span className="text-danger">*</span></label>
                <input 
                    type="text"
                    className={`form-control ${titleInputHasError ? "is-invalid" : ""}`}
                    id="title"
                    onChange={titleChangedHandler}
                    onBlur={titleBlurHandler}
                    value={enteredTitle} 
                />
                {titleInputHasError && (
                    <p className="invalid-feedback">Title must not be empty!</p>
                )}
            </div>
            <button type="submit" className="btn btn-primary" disabled={!formIsValid}><i className="bi bi-plus-lg me-2"></i>Add New Task</button>
        </form>
    );
}

export default TaskForm;