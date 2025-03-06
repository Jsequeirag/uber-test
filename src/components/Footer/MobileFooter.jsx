import React from "react";

const MobileFooter = () => {
  return (
    <div className="w-[200px] mt-4 text-center desktop:hidden laptop:hidden tablet:block phone:block">
      <p className="text-white">© {new Date().getFullYear()} Orbitas.</p>
    </div>
  );
};

export default MobileFooter;
