import React from "react"
import { Link, useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export const NavBar = (props) => {
  const history = useHistory();

    const handleLogout = () => {
        sessionStorage.clear();
        history.push("/login")
    }
  return (
    <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">

      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link" to="/">Articles</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/friends">Friends</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/messages">Messages</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">Tasks</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/events">Events</Link>
        </li>
        <li className="navbar-item">
          <button type="button" className="navbar-link" onClick={handleLogout}> Logout </button>
        </li>
      </ul>
    </nav>
  )
}
