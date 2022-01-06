import React, { useState, useEffect, createContext } from 'react'
import { LOCAL_STORAGE } from '../constants';

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksLocal = localStorage.getItem(LOCAL_STORAGE.TASK_LIST);
    try {
      const _tasksLocalJson = (JSON.parse(tasksLocal));
      setTasks(_tasksLocalJson ? _tasksLocalJson : []);
    } catch (e) {
      setTasks([]);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE.TASK_LIST, JSON.stringify(tasks))
  }, [tasks])

  return (
    <DataContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </DataContext.Provider>
  )
}