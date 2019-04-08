import React, { Component } from "react";
import "./todo-list-item.scss";

export default class TodoItemList extends Component {
  
  render() {
    const { label, onItemDelete, onToggleDone, onToggleImportant, ...toggledProps } = this.props;
    return (
      <span className={`todo-list-item ${(() => {
        let additionalClassNames = '';
        for (let elem in toggledProps) {
          additionalClassNames += toggledProps[elem] ? `${elem} ` : '';
        };
        return additionalClassNames;
      })()}`}>
        <span className="todo-list-item-label"  onClick={onToggleDone}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onItemDelete}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
