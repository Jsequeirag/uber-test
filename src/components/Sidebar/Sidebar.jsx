import { React, useState } from "react";
import MobileFooter from "../Footer/MobileFooter";
import { AnimatePresence, motion, useCycle } from "framer-motion";

const Sidebar = () => {
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };
  const [open, cycleOpen] = useCycle(false, true);
  const openSide = () => {
    cycleOpen();
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
            className="box h-full bg-gray-700  shadow-lg shadow-gray-950 fixed top-[0rem] left-0 z-20 "
            initial={{ width: 0 }}
            animate={{
              width: 225,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
          >
            <motion.div
              className=""
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <div className="" id="sidebar">
                <div>
                  <ul className="relative m-0 list-none px-[0.2rem]">
                    <li className="flex justify-end">
                      <button
                        className=" navbar-close m-2"
                        id="closeMenu"
                        onClick={cycleOpen}
                      >
                        <svg
                          className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokelidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    <li className="relative">
                      <a
                        href="/home"
                        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] mt-2 px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50  active:outline-none  motion-reduce:transition-none dark:text-white dark:hover:bg-black dark:focus:bg-gray-900 dark:active:bg-gray-800 bg-gray-600"
                      >
                        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                          <i
                            className="fa-solid fa-bag-shopping"
                            style={{ color: "#ffffff" }}
                          ></i>
                        </span>
                        <span>Órdenes</span>
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        href="/parameters"
                        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] mt-2 px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50  active:outline-none  motion-reduce:transition-none dark:text-white dark:hover:bg-black dark:focus:bg-gray-900 dark:active:bg-gray-800 bg-gray-600"
                      >
                        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                          <i className="fa-solid fa-sliders"></i>
                        </span>
                        <span>Parametros</span>
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        href="/branches"
                        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] mt-2 px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50  active:outline-none  motion-reduce:transition-none dark:text-white dark:hover:bg-black dark:focus:bg-gray-900 dark:active:bg-gray-800 bg-gray-600"
                      >
                        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                          <i className="fa-solid fa-store"></i>
                        </span>
                        <span>Sucursales</span>
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        href="/users"
                        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] mt-2 px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50  active:outline-none  motion-reduce:transition-none dark:text-white dark:hover:bg-black dark:focus:bg-gray-900 dark:active:bg-gray-800 bg-gray-600"
                      >
                        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                          <i className="fa-solid fa-users-gear"></i>
                        </span>
                        <span>Usuarios</span>
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        href="/profile"
                        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] mt-2 px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50  active:outline-none  motion-reduce:transition-none dark:text-white dark:hover:bg-black dark:focus:bg-gray-900 dark:active:bg-gray-800 bg-gray-600"
                      >
                        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                          <i className="fa-regular fa-user"></i>
                        </span>
                        <span>Mi perfil</span>
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        href="/login"
                        className="flex h-12 cursor-pointer items-center truncate rounded-[5px] mt-2 px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:outline-none focus:bg-slate-50 focus:outline-none active:bg-slate-50  active:outline-none  motion-reduce:transition-none dark:text-white dark:hover:bg-black dark:focus:bg-gray-900 dark:active:bg-gray-800 bg-gray-600"
                      >
                        <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </span>
                        <span>Salir</span>
                      </a>
                    </li>
                  </ul>
                  <li className="relative" style={{ display: "none" }}>
                    <a className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
                      <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span style={{ display: "none" }}>Lista </span>
                      <span
                        style={{ display: "none" }}
                        className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                          style={{ display: "none" }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                            style={{ display: "none" }}
                          />
                        </svg>
                      </span>
                    </a>
                    <ul
                      className="!visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
                      style={{ display: "none" }}
                    >
                      <li className="relative">
                        <a className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
                          Link 2
                        </a>
                      </li>
                      <li className="relative">
                        <a className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
                          Link 3
                        </a>
                      </li>
                    </ul>
                  </li>
                </div>
                <MobileFooter />
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
