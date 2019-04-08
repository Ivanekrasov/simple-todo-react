import React, { Component } from "react";
import uid from 'uid';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddTodo from "../add-todo";

import "./app.scss";

export default class App extends Component {
  state = () => {
    this.resetState();
  };

  defaultValue = () => {
    return [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App", true),
      this.createTodoItem("Have a lunch", false, true)
    ];
  };

  resetState = () => {
    this.setState({
      todoData: this.defaultValue
    });
  };

  createTodoItem (label, important = false, done = false) {
    return {
      label,
      important,
      done,
      id: uid(5)
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const updData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: updData
      };
    });
  };

  addItem = text => {
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createTodoItem(text)]
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);
    return [
      ...arr.slice(0, idx),
      { ...arr[idx], [propName]: !arr[idx][propName] },
      ...arr.slice(idx + 1)
    ];
  };

  toggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  toggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  filteredData = (filterType = '') => {
    switch (filterType) {
      case 'all':
        this.resetState();
        break;
      case 'important':
        this.setState( this.defaultValue.filter
    };
  };

  render() {
    const { todoData } = this.state;
    const countDone = todoData.filter(elem => elem.done).length;
    const countUndone = todoData.length - countDone;
    return (
      <div className="todo-app">
        <AppHeader toDo={countUndone} done={countDone} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter onFilterData={this.filterData}/>
        </div>

        <TodoList
          todos={todoData}
          onItemDelete={this.deleteItem}
          onToggleDone={this.toggleDone}
          onToggleImportant={this.toggleImportant}
        />
        <AddTodo onItemAdd={this.addItem} />
      </div>
    );
  }
}
