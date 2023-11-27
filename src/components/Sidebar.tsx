"use client";
import React from "react";
import Link from "next/link";
import { LuLayoutGrid } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

function Sidebar() {
  return (
    <>
       
      <div>
        <h1 className="mt-2 mb-3 p-3 text-3xl ">SDash</h1>
      </div>
      <div className="ml-2">
        <h3 className="text-lg p-2 ">Dashboard</h3>
        <hr className="border-t border-gray my-2 mx-3  " />
      </div>
      <nav className="flex items-center p-3 ml-2 text-blue-400 text-sm flex-wrap">
        <span className="mr-1">
          <LuLayoutGrid />
        </span>
        <Link href="#">Home</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm">
        <span className="mr-1">
          <FaRegUser />
        </span>
        <Link href="#">Files</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <IoBriefcaseOutline />
        </span>
        <Link href="#">Deadline project</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <MdLockOutline />
        </span>
        <Link href="#">Management</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <MdLockOutline />
        </span>
        <Link href="#">Database</Link>
      </nav>
      <nav className="mb-5 p-3"></nav>
      <div className="ml-2">
        <h3 className="text-lg p-3">Customer Data</h3>
        <hr className="border-t border-gray my-2 mx-3  " />
      </div>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <LuLayoutGrid />
        </span>
        <Link href="#">Team Award</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <FaRegUser />
        </span>
        <Link href="#">Invoice Data</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <IoBriefcaseOutline />
        </span>
        <Link href="#">Settings</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <MdLockOutline />
        </span>
        <Link href="#">Anouncement</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm">
        <span className="mr-1">
          <MdLockOutline />
        </span>
        <Link href="#">Media Assets</Link>
      </nav>
      <nav className="flex items-center p-3 ml-2 text-sm flex-wrap">
        <span className="mr-1">
          <MdLockOutline />
        </span>
        <Link href="#">Client Feedback</Link>
      </nav>
    </>
  );
}

export default Sidebar;
