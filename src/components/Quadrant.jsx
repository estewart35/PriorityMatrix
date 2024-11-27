import { useContext } from 'react';
import TaskContext from '../store/TaskContext';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Task from './Task';
import AddTaskModal from './AddTaskModal';

const Quadrant = ({ id, title }) => {
    const { tasks, addTask } = useContext(TaskContext);
    const { setNodeRef } = useDroppable({ id });

    // Filter tasks specific to this quadrant
    const quadrantTasks = tasks[id] || [];

    const handleAddTask = (newTask) => {
        addTask(id, newTask);
    };

    return (
        <div className="card bg-light" ref={setNodeRef} style={{minHeight: "250px"}}>
            <div className="card-title d-flex justify-content-between align-items-center pt-3 mx-4">
                <h4>{id}</h4>
                <h4 className="fw-bold">{title}</h4>
                <AddTaskModal onAddTask={handleAddTask} />
            </div>
            <div className="card-body pt-0">
                <SortableContext items={quadrantTasks} strategy={verticalListSortingStrategy}>
                    {quadrantTasks.map((task) => (
                        <Task key={task.id} id={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default Quadrant;