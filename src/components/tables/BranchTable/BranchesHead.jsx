import { React, useState } from "react";
import { BranchesFilteredAscent } from "../../../utils/filters/branchFilter";
import branchStore from "../../../stores/BranchStore";
const BranchesHead = () => {
  const branches = branchStore((state) => state.branches);
  const setBranches = branchStore((state) => state.setBranches);
  const [orderAscIcon, setOrderAscIcon] = useState(false);
  return (
    <thead className="align-bottom">
      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
        <th
          className="pb-3 text-center min-w-[100px] cursor-pointer"
          onClick={(e) => {
            setBranches(BranchesFilteredAscent(branches));
            setOrderAscIcon(!orderAscIcon);
          }}
        >
          Nombre
          {orderAscIcon ? (
            <i className="fa-solid fa-arrow-down-a-z"></i>
          ) : (
            <i className="fa-solid fa-arrow-up-z-a"></i>
          )}
        </th>
        {/* <th className="pb-3 text-center  min-w-[100px]">Dirección</th>
        <th className="pb-3 text-center min-w-[100px]">Longitud</th>
        <th className="pb-3  text-center min-w-[100px]">Latitud</th>
        <th
          className="pb-3 text-center min-w-[100px] cursor-pointer hover:ring-slate-400"
          onClick={() => statusOrder}
        >
          Editar
        </th>{" "}
        <th
          className="pb-3 text-center min-w-[100px] cursor-pointer hover:ring-slate-400"
          onClick={() => statusOrder}
        >
          Eliminar
        </th>*/}
      </tr>
    </thead>
  );
};

export default BranchesHead;
