import React, { Component } from "react";
import "./item-status-filter.scss";

export default class ItemStatusFilter extends Component {
  render() {
    const { onFilterData } = this.props;
    return (
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => onFilterData("all")}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onFilterData("active")}
        >
          Active
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onFilterData("done")}
        >
          Done
        </button>
      </div>
    );
  }
}
