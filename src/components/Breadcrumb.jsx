import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = ({ currentPageName, links }) => {
  return (
    <div className="flex mb-5 gap-2">
      <nav className="flex " aria-label="Breadcrumb">
        <ol className="inline-flex items-center  space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center  ">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-1 text-xs font-medium text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <HiOutlineHome />
              Home
            </Link>
          </li>
          {links &&
            links.map((link, index) => (
              <li key={index} className="inline-flex items-center  ">
                <Link
                  to={link.path}
                  className="inline-flex items-center justify-center gap-1 text-xs font-medium text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <MdKeyboardArrowRight />
                  {link.name}
                </Link>
              </li>
            ))}
          <li aria-current="page">
            <div className="flex items-center">
              <MdKeyboardArrowRight />
              <span className="ms-1 text-xs font-bold  md:ms-2 dark:text-gray-400">
                {currentPageName}
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
