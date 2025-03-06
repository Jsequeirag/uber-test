import React from "react";
import BurguerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";
import signalErrorStore from "../../stores/ServerErrorConnection";

const Navbar = () => {
  const signarRError = signalErrorStore(
    (state) => state.signalRErrorConnection
  );
  const navigate = useNavigate();
  return (
    <nav className="h-[8vh]  sticky top-[0rem] bg-black flex items-center justify-between shadow-sm shadow-gray-900 z-10">
      <div className="flex items-center ">
        <BurguerMenu />
        <h1 className="text-white text-xl font-semibold  ">
          Uber <span className="font-thin">Direct</span>
        </h1>
      </div>
      <div className="flex justify-center items-center">
        {signarRError ? (
          <i
            class="fa-solid fa-circle-dot fa-lg mr-2"
            style={{ color: "#ff0000" }}
          ></i>
        ) : (
          <i
            class="fa-solid fa-circle-dot fa-lg mr-2"
            style={{ color: "#63E6BE" }}
          ></i>
        )}
        <span className="text-primary-50 font-semibold mr-2">
          {localStorage.getItem("user")}
        </span>
        <img
          width="80"
          height="70"
          src="superxtra.jpeg"
          alt=""
          decoding="async"
          loading="lazy"
        />
        <div className="flex justify-center items-center">
          <button
            className="mr-4 ml-4 bg-slate-100 rounded-full  py-2 px-3"
            type="button"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("storeUser");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
