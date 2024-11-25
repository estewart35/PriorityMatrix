import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Task from './Task';

const Quadrant = ({ id, title, tasks, onCheckChange }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div className="card bg-light" ref={setNodeRef} style={{minHeight: "250px"}}>
            <div className="card-title d-flex justify-content-between align-items-center pt-3 mx-4">
                <h4>{id}</h4>
                <h4 className="fw-bold">{title}</h4>
                <button className="btn btn-sm btn-primary" title="Add New Task"><i className="bi bi-plus-lg"></i></button>
            </div>
            <div className="card-body pt-0">
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <Task key={task.id} id={task.id} task={task} quadrant={id} onCheckChange={onCheckChange} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default Quadrant;