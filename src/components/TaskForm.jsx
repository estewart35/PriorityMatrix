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

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescriptionInput,
        setValue: setDescriptionValue,
    } = useInput(() => true);

    const {
        value: enteredDeadline,
        isValid: enteredDeadlineIsValid,
        hasError: deadlineInputHasError,
        valueChangeHandler: deadlineChangedHandler,
        inputBlurHandler: deadlineBlurHandler,
        reset: resetDeadlineInput,
        setValue: setDeadlineValue,
    } = useInput(() => true);

    // Pre-fill the title field when editing
    useEffect(() => {
        if (isUpdate && currentTask) {
            setTitleValue(currentTask.title);
            setDescriptionValue(currentTask.description);
            setDeadlineValue(currentTask.deadline);
        }
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();

        if (isUpdate) {
            // Update task logic
            onUpdateTask({ ...currentTask, title: enteredTitle, description: enteredDescription, deadline: enteredDeadline });
        } else {
            // Add new task logic
            const newTask = {
                id: Date.now(),
                checked: false,
                title: enteredTitle,
                description: enteredDescription || "",
                deadline: enteredDeadline || "",
            };

            onAddTask(newTask);
        }

        resetTitleInput();
        resetDescriptionInput();
        resetDeadlineInput();
    }

    let formIsValid = false;
    if (enteredTitleIsValid && enteredDescriptionIsValid && enteredDeadlineIsValid) {
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
            <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea 
                    rows="4"
                    type="text"
                    className={`form-control ${descriptionInputHasError ? "is-invalid" : ""}`}
                    id="description"
                    onChange={descriptionChangedHandler}
                    onBlur={descriptionBlurHandler}
                    value={enteredDescription} 
                ></textarea>
                {descriptionInputHasError && (
                    <p className="invalid-feedback">Description is not valid for some reason.</p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="deadline">Deadline</label>
                <input
                    type="date"
                    className={`form-control ${deadlineInputHasError ? "is-invalid" : ""}`}
                    id="deadline"
                    onChange={deadlineChangedHandler}
                    onBlur={deadlineBlurHandler}
                    value={enteredDeadline}
                />
                {deadlineInputHasError && (
                    <p className="invalid-feedback">Deadline is not valid for some reason.</p>
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