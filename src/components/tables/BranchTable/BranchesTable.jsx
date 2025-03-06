import React, { useEffect, useState } from "react";
import BranchesBody from "./BranchesBody";
import BranchesHead from "./BranchesHead";
import BranchesHeader from "./BranchesHeader";
const BranchesTable = () => {
  return (
    <>
      <div className="h-auto  w-[100%]  min-w-[300px]  desktop:px-8 desktop:pb-8 mb-2">
        <BranchesHeader />
        <div className="bg-white break-words border border-dashed bg-clip-border rounded-2xl border-gray-300 bg-light/30   tablet:mt-8 phone:mt-8  p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] my-0 align-middle text-dark border-neutral-200">
              <BranchesHead />
              <BranchesBody />
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchesTable;
