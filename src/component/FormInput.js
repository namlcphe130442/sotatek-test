import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import datePickerIcon from '../assets/date-svg.svg'
import { DateFormat } from '../constants';

function FormInput({ handleSubmit, task = null, titleValue, setTitleValue }) {
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task?.dueDate) : new Date());

  return (
    <form onSubmit={handleSubmit} className='new-task-form'>
      <input
        // defaultValue={task ? task?.title : ""}
        type="text" name="title"
        placeholder='Add new task...'
        value={titleValue ? titleValue : ""}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      {titleValue === '' && <p className='error'>Title task is required</p>}
      <div className="divider"></div>
      <div className='item-description'>
        <label className='item-label'>Description</label>
        <textarea
          name='description'
          defaultValue={task ? task?.description : ""}
        />
      </div>
      <div className="divider"></div>
      <div className='contents'>
        <div className='content-item'>
          <div className='item-label'>
            <label>Due date</label>
          </div>
          <div className='item-control'>
            <DatePicker
              className={"dateView"}
              name="dueDate"
              id={`dueDate${task ? task?.id : ""}`}
              selected={dueDate}
              onChange={(dueDate) => setDueDate(dueDate)}
              minDate={new Date()}
              dateFormat={DateFormat}
            />
            <label className='datePicker-img' htmlFor={`dueDate${task ? task?.id : ""}`}>
              <img src={datePickerIcon} width={15} height={15} alt="Icon chat" />
            </label>
          </div>
        </div>
        <div className='content-item'>
          <div className='item-label'>
            <label>Priority</label>
          </div>
          <div className='item-control'>
            <select name="priority" defaultValue={task ? task?.priority : "normal"}>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
      <button className='item-submit' type='submit'>{task ? "Update" : "Add"}</button>
    </form>
  );
}

export default FormInput;