import { React } from "react";
import { branchesFilteredByName } from "../../../utils/filters/branchFilter";
import branchStore from "../../../stores/BranchStore";

const BranchesHeader = () => {
  const branches = branchStore((state) => state.branches);
  return (
    <div className="flex flex-wrap">
      <div className="px-8 w-[200px] mr-2">
        {/* <label
          className="block mb-2  before:text-light-inverse text-md/normal font-semibold text-gray-900 dark:text-black"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          className="w-[200px] p-2.5 cursor-pointer rounded-lg  before:text-light-inverse text-md/normal font-semibold active:outline focus:outline bg-gray-300 "
          id="name"
          name="branchName"
          type="text"
          placeholder="Nombre de sucursal"
          onChange={(e) => {
            branchStore
              .getState()
              .setBranches(branchesFilteredByName(branches, e.target.value));
          }}
          required
        />*/}
      </div>
      <div className="px-8 ">
        <label
          htmlFor="status"
          className="block mb-2  before:text-light-inverse text-md/normal font-semibold text-gray-900 dark:text-black"
        >
          Sucursales
        </label>
        <input
          disabled
          id="first_name"
          className="w-[50px] p-2.5  rounded-lg   bg-gray-300 text-center font-semibold"
          placeholder="Minutos"
          value={branches.length || 0}
        />
      </div>
    </div>
  );
};

export default BranchesHeader;
