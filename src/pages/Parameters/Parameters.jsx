import { React, useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import ParameterForm from "../../components/forms/ParameterForms/ParameterForm";
import parameterStore from "../../stores/ParameterStore";
const Parameters = () => {
  const parameters = parameterStore((state) => state.parameters);
  useEffect(() => {
    axios("http://localhost:3000/parameters").then((res) => {
      console.log(res.data);
      parameterStore.getState().setParameters(res.data);
    });
  }, []);

  return Object.keys(parameters).length > 0 ? (
    <Layout>
      <h1 className="p-7 font-semibold text-xl/tight">
        Parámetros de compañia
      </h1>
      <div className="flex justify-center desktop:items-start desktop:flex-row laptop:flex-col tablet:flex-col phone:flex-col">
        <ParameterForm />
        <div
          data-te-perfect-scrollbar-init
          data-te-suppress-scroll-x="true"
          className="relative overflow-x-auto w-[100%] min-w[300px] bg-white break-words  border border-dashed bg-clip-border rounded-2xl border-gray-300 bg-light/30  mt-8 desktop:mx-8 desktop:mt-0 "
        >
          <div className="w-[700px] p-4 grid desktop:grid-cols-3 desktop:gap-3   laptop:grid-cols-2 laptop:gap-2  phone:grid-cols-2 phone:gap-2">
            {Object.entries(parameters).map(([parameterName, value]) => {
              return (
                <div className="inline-flex items-center m-1 ">
                  <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                    <input
                      id={parameterName}
                      name={parameterName}
                      type="checkbox"
                      className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                      checked={value}
                      onChange={() => {
                        parameterStore
                          .getState()
                          .setCheckedParameters({ [parameterName]: !value });
                      }}
                    />
                    <label
                      htmlFor={parameterName}
                      className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                    >
                      <div
                        className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                        data-ripple-dark="true"
                      ></div>
                    </label>
                  </div>
                  <label
                    htmlFor="auto-update"
                    className="mt-px mb-0 ml-3 font-light text-gray-700 cursor-pointer select-none"
                  >
                    {parameterName}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <div className="h-[86vh] ml-[200px]">Cargando</div>
  );
};
async function isBase64UrlImage(base64String) {
  let image = new Image();
  image.src = base64String;
  return await new Promise((resolve) => {
    image.onload = function () {
      if (image.height === 0 || image.width === 0) {
        resolve(false);
        return;
      }
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = (error) => reject(error);
  });
}
export default Parameters;
