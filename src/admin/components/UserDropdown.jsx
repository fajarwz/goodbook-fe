import { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { getAuthUser } from "../utils/token"

import { logout } from "../api/auth";

const UserDropdown = () => {
  const navigate = useNavigate();
  const authUser = getAuthUser()
  const name = authUser.name ?? 'Name'
  const image = authUser.image ?? '#'
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
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
          <div className="mr-4 text-white">{name}</div>
          <span className="w-12 h-12 text-sm text-white inline-flex items-center justify-center rounded-full">
            <img
              alt={name + '\'s photo'}
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={image}
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
           Log Out
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
