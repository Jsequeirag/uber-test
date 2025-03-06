import { React, useState } from "react";
import Layout from "../Layout/Layout";
import SimpleModal from "../../components/Modals/SimpleModal";
import axios from "axios";
import {
  okResponseModalHandle,
  errorResponseModalHandle,
} from "../../utils/http/functions";
export default function GetRequest() {
  //modal
  const [modalData, setModalData] = useState(false);
  const [formData, setformData] = useState({});
  async function handleData(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const resetForm = () => {
    setformData({});
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setModalData({
      loading: true,
      text: <>Consultando</>,
      icon: "loading",
    });
    axios
      .post(
        `https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/OrderUpdates`,
        formData
      )
      .then(async (res) => {
        okResponseModalHandle({
          setModalData,
          message: "Orden actualizada",
        });
        resetForm();
      })
      .catch((e) => {
        errorResponseModalHandle({
          setModalData,
          message: "Ha ocurrido un inconveniente",
        });
        resetForm();
      });
  }
  return (
    <Layout>
      <SimpleModal data={modalData} />{" "}
      <div className="flex justify-center items-center flex-col">
        <div className=" w-full mt-4 ">
          <h1 className="text-xl font-bold">Actualizar orden</h1>{" "}
        </div>
        <h1 className="text-xl font-bold">
          Crear un viaje de una orden de nuevo pedido(Orden que no se envió, que
          solo existe en VTEXT, Se busca por Id factura.)
        </h1>
        <form
          onSubmit={handleSubmit}
          className="pc:w-[50%] movil:w-[100%] border  rounded-md p-5 shadow-md mt-4"
        >
          <div className="mb-5">
            <label
              for="name"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Número de orden
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border text-lg  border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Número de orden"
              required
              name="orderId"
              minLength={15}
              onChange={(e) => handleData(e)}
              autoComplete="off"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="pc:w-[300px] movil:w-[100%] text-white  text-lg  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Nuevo pedido
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
