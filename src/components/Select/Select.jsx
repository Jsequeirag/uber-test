import React from "react";

const Select = () => {
  return (
    <div className="flex flex-wrap">
      <div className="px-8 w-[200px]">
        <label
          htmlFor="status"
          className=" block mb-2  before:text-light-inverse text-md/normal font-semibold text-gray-900 dark:text-black"
        >
          Estado
        </label>
        <select
          id="status"
          className="p-2.5 cursor-pointer rounded-lg  before:text-light-inverse text-md/normal font-semibold active:outline focus:outline bg-gray-300"
        >
          <option value="US">Todos </option>
          <option value="US">Activo</option>
          <option value="CA">Cancelada</option>
          <option value="FR">Entregada</option>
        </select>
      </div>
      <div className="px-8 w-[200px]">
        <label
          htmlFor="status"
          className="block mb-2  before:text-light-inverse text-md/normal font-semibold text-gray-900 dark:text-black"
        >
          Sucursal
        </label>
        <select
          id="status"
          className=" p-2.5 cursor-pointer rounded-lg  before:text-light-inverse text-md/normal font-semibold active:outline focus:outline bg-gray-300"
        >
          <option value="US">Todas </option>
          <option value="US">ALAJUELA</option>
          <option value="CA">SAN JOSE </option>
          <option value="CA">ALTAMIRA</option>
        </select>
      </div>
      <div className="px-8 w-[200px]">
        <label
          htmlFor="status"
          className="block mb-2  before:text-light-inverse text-md/normal font-semibold text-gray-900 dark:text-black"
        >
          Tiempo estimado
        </label>
        <input
          type="number"
          id="first_name"
          className="p-2.5 cursor-pointer rounded-lg  before:text-light-inverse text-md/normal font-semibold active:outline focus:outline bg-gray-300"
          placeholder="Minutos"
        />
      </div>
    </div>
  );
};

export default Select;
