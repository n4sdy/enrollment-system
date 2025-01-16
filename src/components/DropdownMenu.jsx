import React from "react";

const DropdownMenu = () => {
  return (
    <div className="dropdown">
      <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
        <i className="bi bi-person-circle"></i>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><a className="dropdown-item" href="#">Change Password</a></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
