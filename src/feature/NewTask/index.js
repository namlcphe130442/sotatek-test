import React, { useContext, useState } from 'react';
import "./styles.scss";
import { DataContext } from '../../component/DataProvider';
import FormInput from '../../component/FormInput';
import { NotificationManager } from 'react-notifications';

function NewTask() {
  const [tasks, setTasks] = useContext(DataContext);
  const [titleValue, setTitleValue] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasks) {
      const tasksCount = tasks.length - 1;
      const formData = new FormData(e.currentTarget);
      let task = { id: tasksCount < 0 ? 1 : tasks[tasksCount]?.id + 1 };
      for (let [key, value] of formData.entries()) {
        task[key] = value;
      }
      if (!task?.title) {
        setTitleValue('');
      } else {
        setTasks([...tasks, task]);
        NotificationManager.success('Create task successful!', '', 1500);
      }
    }
  };

  return (
    <div className='new-task-container'>
      <h4 className='new-task-title'>New tasks</h4>
      <FormInput
        handleSubmit={handleSubmit}
        titleValue={titleValue}
        setTitleValue={setTitleValue}
      />
    </div>
  );
}

export default NewTask;