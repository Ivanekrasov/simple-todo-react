import React, { Component } from "react";
import "./add-todo.scss";

export default class AddTodo extends Component {
  state = {
    label: ""
  };

  onLabelChange = e => {
    this.setState({ label: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onItemAdd(this.state.label);
    this.setState({ label: "" });
  };

  render() {
    return (
      <form className="add-todo d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="What needs to be done"
          value={this.state.label}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.onSubmit}
        >
          Add
        </button>
      </form>
    );
  }
}
