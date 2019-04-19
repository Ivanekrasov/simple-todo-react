import React, { Component } from "react";
import "./item-status-filter.scss";

export default class ItemStatusFilter extends Component {
  filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];
  
  render() {
    const { onFilterData, filterStatus } = this.props;
    const {filterButtons } = this;
    const buttons = filterButtons.map(({name, label}) => {
      const isActive = name === filterStatus;
      const classNames = 'btn ' + (isActive ? 'btn-info' : 'btn-outline-secondary');
  
      return (
        <button key={name}
                type="button"
                onClick={() => onFilterData(name)}
                className={classNames}>{label}</button>
      );
    });
  
    return (
      <div className="btn-group">
        { buttons }
      </div>
    )
  }
}
