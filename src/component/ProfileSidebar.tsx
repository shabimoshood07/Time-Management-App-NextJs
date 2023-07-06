"use client";
import Link from "next/link";
import React, { useState } from "react";

const ProfileSidebar = () => {
  const [show, setShow] = useState(false);
  const Show = () => {
    console.log("clicked");

    setShow(true);
  };
  const hide = () => {
    console.log("clicked");

    setShow(false);
  };
  return (
    <>
      <div
        className="border  border-red-400 w-fit duration-500 sm:w-[300px] h-[calc(100vh-48px)] sticky top-[48px] bg-yellow-500 p-4 sm:hidden "
        onMouseOver={Show}
        onMouseLeave={hide}
      >

        <div>
          <Link href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
            </svg>
            {show && <p>Settings</p>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
