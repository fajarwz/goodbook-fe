import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import UserDropdown from "./UserDropdown";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [webNavZindex, setWebNavZindex] = useState("z-10");

  const hamburgerButtonHandler = () => {
    setCollapseShow("bg-white m-2 py-3 px-6")
    setWebNavZindex("")
  }

  const closeHamburgerButtonHandler = () => {
    setCollapseShow("hidden")
    setWebNavZindex("z-10")
  }

  return (
    <>
      <nav className={"md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 py-4 px-6 " + webNavZindex}>
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={hamburgerButtonHandler}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 md:px-4"
            to="/"
          >
            Goodbook Admin
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/admin/dashboard"
                  >
                    Goodbook Admin
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={closeHamburgerButtonHandler}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <ul className="pl-5 md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <NavLink
                  className={({ isActive }) => (`text-xs uppercase py-3 font-bold block ${isActive ? 'active' : ''}`)}
                  to="/admin/dashboard"
                >
                  <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Dashboard
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className={({ isActive }) => (`text-xs uppercase py-3 font-bold block ${isActive ? 'active' : ''}`)}
                  to="/admin/reviews"
                >
                  <i className="fas fa-star mr-2 text-sm"></i> Reviews
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className={({ isActive }) => (`text-xs uppercase py-3 font-bold block ${isActive ? 'active' : ''}`)}
                  to="/admin/books"
                >
                  <i className="fas fa-book mr-2 text-sm"></i> Books
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className={({ isActive }) => (`text-xs uppercase py-3 font-bold block ${isActive ? 'active' : ''}`)}
                  to="/admin/members"
                >
                  <i className="fas fa-user mr-2 text-sm"></i> Members
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
