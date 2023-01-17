import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link to="/">
          <span className="bg-clip-text text-transparent self-center bg-gradient-to-r from-blue-500 to-teal-400 text-3xl font-semibold whitespace-nowrap dark:text-white">
            ChatDoc
          </span>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6">
              How it works
            </Link>
          </li>
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        ©{" "}
        <Link to="/" className="hover:underline">
          ChatDoc™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
