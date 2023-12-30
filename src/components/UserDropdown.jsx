import React from "react";

import { createPopper } from "@popperjs/core";
import { logout } from '../utils/http/admin/auth';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getAuthUser } from "../utils/http/admin/token";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { name: userName, image: userImage } = getAuthUser()
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogout = () => {
    mutate()
  }

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/admin/login');
    },
  })

  return (
    <>
      <a
        className="block"
        href="#"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <div className="mr-4 text-white">{userName}</div>
          <span className="w-12 h-12 text-sm text-white inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={userImage}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:text-orange-default"
          }
          onClick={handleLogout}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
