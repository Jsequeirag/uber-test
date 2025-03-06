import React from "react";

const Layout = (props) => {
  return (
    <div
      className="desktop:min-h-[86vh] laptop:min-h-[86vh] tablet:min-h-[86vh] phone:min-h-[86vh] bg-gray-50 px-8 "
      id="layout"
    >
      {props.children}
    </div>
  );
};

export default Layout;
