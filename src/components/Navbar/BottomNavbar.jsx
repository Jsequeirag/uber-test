import React from "react";
import { useNavigate } from "react-router-dom";
const BottomNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className=" sticky z-10  bottom-0 left-0 w-full h-[8vh] bg-black shadow-lg  shadow-black desktop:hidden laptop:hidden tablet:block phone:block">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
        <button
          id="burger-menu"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 border-gray-200  hover:bg-gray-800 dark:hover:bg-gray-900 group dark:border-gray-600"
          onClick={() => navigate("/home")}
        >
          <i
            className="fa-solid fa-bag-shopping"
            style={{ color: "#ffffff" }}
          ></i>

          <a className="text-white">Ordenes</a>
        </button>
        {/*
        <button
          id="burger-menu"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 border-gray-200  hover:bg-gray-800 dark:hover:bg-gray-900 group dark:border-gray-600"
          onClick={() => navigate("/parameters")}
        >
          <i className="fa-solid fa-sliders" style={{ color: "#ffffff" }}></i>
          <a className="text-white">Parametros</a>
        </button>


        <button
          hidden
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 dark:hover:bg-gray-900 group   "
          onClick={() => navigate("/getRequest")}
        >
          <i className="fa-solid fa-store" style={{ color: "#ffffff" }}></i>
          <a className="text-white">Reenvío orden</a>
        </button>
*/}
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 dark:hover:bg-gray-900 group  "
          onClick={() => navigate("/users")}
        >
          <i
            className="fa-solid fa-users-gear"
            style={{ color: "#ffffff" }}
          ></i>
          <a className="text-white">Usuarios</a>
        </button>
      </div>
    </div>
  );
};

export default BottomNavbar;
