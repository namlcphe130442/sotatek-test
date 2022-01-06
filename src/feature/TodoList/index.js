import React, { Fragment, useContext, useEffect, useState } from 'react';
import "./styles.scss";
import ItemTask from '../../component/ItemTask';
import { DataContext } from "../../component/DataProvider";
import FormInput from '../../component/FormInput';
import { NotificationManager } from 'react-notifications';

function TodoList(props) {
  const [tasks, setTasks] = useContext(DataContext);
  const [detailTask, setDetailTask] = useState();
  const [tasksActive, setTasksActive] = useState([]);
  const [tasksSearch, setTasksSearch] = useState();
  const [keySearch, setKeySearch] = useState();
  const [titleValue, setTitleValue] = useState();

  const onActiveTask = (e) => {
    let newTasksActive = [...tasksActive];
    const target = e.target;
    var value = parseInt(target.value);
    if (target.checked) {
      newTasksActive.push(value);
    } else {
      newTasksActive = newTasksActive.filter(i => i != value);
    }
    setTasksActive(newTasksActive);
  }

  const handleDetail = (item) => {
    if (item?.id === detailTask?.id) {
      setDetailTask(null);
    } else {
      setDetailTask(item);
      setTitleValue(item?.title);
    }
  }

  const handleDelete = (id) => {
    const newTasks = [...tasks];
    var index = newTasks.findIndex(function (task) {
      return task.id === id;
    })
    if (index !== -1) newTasks.splice(index, 1);
    setTasks(newTasks);
    if (detailTask?.id === id) setDetailTask(null);
    NotificationManager.success('Delete task successful!', '', 1500);
  }

  const handleDeleteTasks = (taskIds) => {
    const newTasks = [...tasks];
    setTasks(newTasks.filter(task => !taskIds.includes(task.id)));
    setTasksActive([]);
    NotificationManager.success('Delete tasks successful!', '', 1500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListTask = [...tasks];
    if (newListTask) {
      const index = newListTask.findIndex((x) => x.id === detailTask?.id);
      if (index === -1) return;
      const formData = new FormData(e.currentTarget);
      let task = { id: detailTask?.id };
      for (let [key, value] of formData.entries()) {
        task[key] = value;
      }
      if (!task?.title) {
        setTitleValue('');
      } else {
        setTasks([...tasks, task]);
        newListTask.splice(index, 1, task);
        setTasks(newListTask);
        NotificationManager.success('Update task successful!', '', 1500);
      }
    }
  }

  const sortTasksByDate = (array) => {
    const newListTask = [...array]; 
    return newListTask.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  useEffect(() => {
    const newListTask = [...tasks];
    if (!keySearch) {
      return setTasksSearch(newListTask);
    };
    const dataFilter = newListTask.filter(task => task.title.includes(keySearch));
    setTasksSearch(dataFilter);
  }, [keySearch, tasks])

  return (
    <div className='task-list-container'>
      <h4 className='task-list-title'>To Do List</h4>
      <input
        className='task-list-search'
        onChange={(e) => setKeySearch(e.target.value)}
        type="text"
        placeholder='Search...'
      />
      <div className="divider"></div>
      <div className='task-list-items'>{sortTasksByDate(keySearch ? tasksSearch : tasks).map((task) =>
        <Fragment key={task?.id}>
          <ItemTask
            onActiveTask={onActiveTask}
            task={task}
            handleDetail={handleDetail}
            handleDelete={handleDelete}
          />
          {detailTask && detailTask?.id === task.id &&
            <div className='task-list-items-detail' >
              <FormInput
                handleSubmit={handleSubmit}
                task={detailTask}
                titleValue={titleValue}
                setTitleValue={setTitleValue}
              />
            </div>
          }
        </Fragment>
      )}</div>
      {tasksActive && tasksActive.length > 0 && <div className='task-list-footer'>
        <div className='task-list-footer-content'>
          <p>Bulk Action:</p>
        </div>
        <div className='task-list-footer-action'>
          <div className="item-task-right-detail">
            <button>Done</button>
          </div>
          <div className={"item-task-right-remove"}>
            <button onClick={() => { handleDeleteTasks(tasksActive); }}>Remove</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default TodoList;