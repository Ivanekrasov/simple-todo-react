import React, { Component } from "react";
import TodoListItem from "../todo-list-item";
import "../todo-list-item";
import "./todo-list.scss";

export default class TodoList extends Component {
  render() {
  const { todos, onItemDelete, onToggleDone, onToggleImportant } = this.props;
    const elements = todos.map(item => {
      const { id, ...itemProps } = item;
      return (
        <li key={id} className="list-group-item">
          <TodoListItem 
          onItemDelete={() => onItemDelete(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
          {...itemProps}
          />
        </li>
      );
    });
    return <ul className="list-group todo-list">{elements}</ul>;
  }
} 

