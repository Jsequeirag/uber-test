import React from "react";

const Footer = () => {
  return (
    <div className="laptop:block desktop:block tablet:hidden phone:hidden">
      <div className=" h-[6vh]  before:text-light-inverse text-md/normal font-semibold bg-black flex justify-center items-center sticky z-10 ">
        <p className="text-white">© {new Date().getFullYear()} Orbitas.</p>
      </div>
    </div>
  );
};

export default Footer;
