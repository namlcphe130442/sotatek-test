import React from "react";
import "./styles/global.scss";
import "./App.scss";
import 'react-notifications/lib/notifications.css';
import { DataProvider } from "./component/DataProvider";
import NewTask from "./feature/NewTask";
import TodoList from "./feature/TodoList";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <DataProvider>
      <div className='main-container'>
        <NewTask />
        <TodoList />
      </div>
      <NotificationContainer />
    </DataProvider>
  );
}

export default App;
