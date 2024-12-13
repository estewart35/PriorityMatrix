import { useEffect } from "react";
import useInput from "../hooks/useInput";

const TaskForm = ({ isUpdate, onAddTask, onUpdateTask, currentTask }) => {
    const {
        value: enteredTitle,
        isValid: enteredTitleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitleInput,
        setValue: setTitleValue,
    } = useInput((value) => value.trim() !== "");

    // Pre-fill the title field when editing
    useEffect(() => {
        if (isUpdate && currentTask) {
            setTitleValue(currentTask.title);
        }
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();

        if (isUpdate) {
            // Update task logic
            onUpdateTask({ ...currentTask, title: enteredTitle });
        } else {
            // Add new task logic
            const newTask = {
                id: Date.now(),
                title: enteredTitle,
                checked: false,
            };
            onAddTask(newTask);
        }

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
            {isUpdate ? (
                <button type="submit" className="btn btn-primary float-end" disabled={!formIsValid}><i className="bi bi-check-lg me-2"></i>Update Task</button>
            
            ) : (
                <button type="submit" className="btn btn-primary float-end" disabled={!formIsValid}><i className="bi bi-plus-lg me-2"></i>Add New Task</button>
            )}
        </form>
    );
}

export default TaskForm;