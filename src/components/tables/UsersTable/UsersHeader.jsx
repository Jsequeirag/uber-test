import { React, useState } from "react";
import userStore from "../../../stores/UserStore";
import { autocomplete } from "../../../utils/filters/autoComplete.js";
import { Select, initTE } from "tw-elements";

const UsersHeader = () => {
  initTE({ Select });
  //local
  const [hiddenFilters, setHiddenFilters] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  //global
  const users = userStore((state) => state.users);
  const setHiddenForm = userStore((state) => state.setFormHidden);
  const resetFormState = userStore((state) => state.resetFormState);
  return (
    <div className="flex  flex-wrap items-start border-b border-slate-300 px-8 py-4  desktop:flex-row  laptop:flex-row tablet:flex-col-reverse phone:flex-col-reverse">
      <div className="flex flex-col ">
        {/*  <div className="">
        <button
            className={`bg-gray-300 rounded-full p-2 flex justify-center items-center mb-3 font-semibold shadow shadow-gray-400`}
            onClick={() => setHiddenFilters(!hiddenFilters)}
          >
            Buscar
            <i className="fa-solid fa-magnifying-glass p-2 rounded-full flex justify-center items-center"></i>
          </button>
        </div>*/}
        <div hidden={!hiddenFilters ? true : false}>
          <div className="flex justify-center items-center bg-slate-100 rounded-xl p-2  mb-3">
            <label htmlFor="">Estados</label>
            <select
              data-te-select-init
              data-te-select-filter="true"
              data-te-select-clear-button="true"
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className="relative" data-te-input-wrapper-init id="async">
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder:opacity-0 focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary "
                id="exampleFormControlInput3"
              />
              <label
                htmlFor="exampleFormControlInput3"
                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[80%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-focused]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-focused]:scale-[0.8] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                {filterOption}
              </label>
            </div>
            <select
              id="status"
              className="px-9 w-[200px] p-2.5 cursor-pointer rounded-lg  before:text-light-inverse text-md/normal font-semibold active:outline focus:outline bg-gray-300"
              onChange={(e) => {
                setfilterOption(e.target.value);
                autocomplete(users, e.target.value);
              }}
            >
              <option value="name">Nombre</option>
              <option value="lastname">Apellido</option>
              <option value="branch">Sucursal</option>
            </select>{" "}
            <button
              className="
              bg-red-300
             rounded-full px-1  py-[3px] lex items-center  font-semibold shadow shadow-gray-400 flex justify-center ml-2"
              onClick={
                (() => setHiddenFilters(!hiddenFilters), resetFormState())
              }
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div className="desktop:hidden laptop:hidden tablet:block phone:block">
          <a href="#userForm">
            <button
              className={`bg-blue-300 rounded-full p-2 flex justify-center items-center font-semibold shadow shadow-gray-400`}
              onClick={(() => setHiddenForm(), resetFormState())}
            >
              Agregar
              <i className="fa-solid fa-plus p-2 rounded-full flex justify-center items-center"></i>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UsersHeader;
