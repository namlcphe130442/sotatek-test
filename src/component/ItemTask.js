import React from 'react';

function ItemTask({ task, onActiveTask, handleDetail, handleDelete }) {
  return (
    <div className='item-task-container'>
      <div className='item-task-left'>
        <input
          onChange={onActiveTask}
          value={task?.id}
          type="checkbox"
          className='item-task-left-checkbox'
          checked={task?.active}
        />
        <p className={'item-task-left-title'}>{task?.title}</p>
      </div>
      <div className='item-task-right'>
        <div className="item-task-right-detail">
          <button onClick={() => handleDetail(task)} >Detail</button>
        </div>
        <div className={"item-task-right-remove"}>
          <button onClick={() => handleDelete(task?.id)} >Remove</button>
        </div>
      </div>
    </div>
  );
}

export default ItemTask;