import { React, useState } from "react";
import axios from "axios";
import branchStore from "../../../stores/BranchStore";
const BranchForm = () => {
  const formState = branchStore((state) => state.formState);
  var branches = branchStore((state) => state.branches);
  //post Create Branch
  function formValuesHandle(e) {
    branchStore.getState().setFormState(e);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    formState.id
      ? await axios
          .put(`http://localhost:3000/branches/${formState.id}`, formState)
          .then((res) => {
            const userEdited = branches.map((branch) => {
              if (branch.id === formState.id) {
                return formState;
              }
              return branch;
            });
            branchStore.getState().setBranches(userEdited);
            branchStore.getState().resetFormState();
          })
      : await axios
          .post(`http://localhost:3000/branches/`, formState)
          .then((res) => {
            branchStore.getState().addBranch(res.data);
            branchStore.getState().resetFormState();
          });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="desktop:w-[55%] laptop:w-[100%] tablet:w-[100%] phone:w-[100%] min-w-[300px] rounded-2xl p-8  bg-white  border border-dashed bg-clip-border border-gray-300 tablet:my-8 phone:my-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            name="branchName"
            type="text"
            value={formState.branchName || ""}
            placeholder="Sucursal"
            onChange={formValuesHandle}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="BranchDirection"
          >
            Dirección
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="BranchDirection"
            name="branchDirection"
            type="text"
            value={formState.branchDirection || ""}
            placeholder="Dirección"
            onChange={formValuesHandle}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="BranchDirection"
          >
            Longitud
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="longitud"
            name="longitud"
            type="number"
            placeholder="Longitud"
            onChange={formValuesHandle}
            value={formState.longitud || ""}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="BranchDirection"
          >
            Latitud
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="latitud"
            name="latitud"
            type="number"
            placeholder="Latitud"
            onChange={formValuesHandle}
            value={formState.latitud || ""}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className=" p-2.5 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold hover:bg-black hover:text-white bg-gray-300"
          >
            {formState.id ? "edit" : "Registrar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default BranchForm;
