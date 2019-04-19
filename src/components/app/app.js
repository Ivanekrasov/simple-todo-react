import React, { Component } from "react";
import uid from "uid";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddTodo from "../add-todo";

import "./app.scss";

export default class App extends Component {
  data = [
    this.createTodoItem("Drink Coffee"),
    this.createTodoItem("Make Awesome App", true),
    this.createTodoItem("Have a lunch", false, true)
  ];

  state = {
    todoData: this.data,
    filter: "all"
  };

  createTodoItem(label, important = false, done = false) {
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
  }

  addItem = text => {
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createTodoItem(text)]
      };
    });
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);
    return [
      ...arr.slice(0, idx),
      { ...arr[idx], [propName]: !arr[idx][propName] },
      ...arr.slice(idx + 1)
    ];
  }

  toggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  }

  toggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  }

  filterData = (filterType = "") => {
    switch (filterType) {
      case "active":
        this.setState({
          todoData: this.data.filter(el => !el.done),
          filter: "active"
        });
        break;
      case "done":
        this.setState({
          todoData: this.data.filter(el => el.done),
          filter: "done"
        });
        break;
      default:
        this.setState({ todoData: this.data });
        break;
    }
  }

  searchData = (searchTemplate = '') => {
    this.setState({
      todoData: this.data.filter(el => el.label.toLowerCase().includes(searchTemplate.toLocaleLowerCase()))
    });
  }


  render() {
    const { todoData, filter } = this.state;
    const countDone = todoData.filter(elem => elem.done).length;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoData.length - countDone} done={countDone} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.searchData} />
          <ItemStatusFilter
            onFilterData={this.filterData}
            filterStatus={filter}
          />
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
