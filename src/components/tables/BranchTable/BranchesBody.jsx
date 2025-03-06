import { React, useState, useEffect } from "react";
import axios from "axios";
import branchStore from "../../../stores/BranchStore";
import { BranchDto } from "../../DTOs/branchDTO";
const BranchesBody = () => {
  //branchStore
  const branches = branchStore((state) => state.branches);
  //deleteBranch
  const deleteBranch = (idBranch) => {
    axios.delete(`http://localhost:3000/branches/${idBranch}`).then((res) => {
      branchStore.getState().deleteBranch(idBranch);
    });
  };
  //getBranchList
  useEffect(() => {
    axios
      .get(
        `https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/GetStore`
      )
      .then((res) => {
        const branchesDTOs = BranchDto(res.data);
        branchStore.getState().setBranches(branchesDTOs);
      });
  }, []);
  return (
    <tbody>
      {branches.length !== 0 ? (
        branches.map(
          (branch) =>
            !branch?.filtered && (
              <tr
                key={branch.id}
                className="border-b border-dashed last:border-b-0"
              >
                <td className="text-center p-3 pl-0 ">
                  <span className="font-semibold text-light-inverse text-md/normal">
                    {branch.name}
                  </span>
                </td>
                {/*<td className="text-center p-3 pl-0">
                  <span className="font-semibold text-light-inverse text-md/normal">
                    {branch.status}
                  </span>
                </td>
             
                <td className="p-3 pl-0 text-center">
                  <button
                    className=" p-2.5 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold hover:bg-black hover:text-white bg-gray-300"
                    onClick={() => {
                      branchStore.getState().setFormStateForEdit(branch);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td className="p-3 pl-0 text-center">
                  <button
                    className=" p-2.5 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold hover:bg-black hover:text-white bg-gray-300"
                    onClick={() => deleteBranch(branch.id)}
                  >
                    Eliminar
                  </button>
                </td>*/}
              </tr>
            )
        )
      ) : (
        <></>
      )}
    </tbody>
  );
};
export default BranchesBody;
