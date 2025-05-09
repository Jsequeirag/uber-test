import { React, useEffect, useState } from "react";
import deliveryStore from "../../../stores/DeliveryStore";
import branchesStore from "../../../stores/BranchStore";
import { orderByNumber } from "../../../utils/filters/filters";
import signalRErrorStore from "../../../stores/ServerErrorConnection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DeliveriesHeader() {
  //Route
  const navigate = useNavigate();
  //local
  const [deliveriesCount, setdeliveriesCount] = useState(0);
  const [hiddenSearch, setHiddenSearch] = useState(false);
  const [hiddenFilters, setHiddenFilters] = useState(false);
  const [localSearchString, setLocalSearchString] = useState("");
  //global
  const deliveries = deliveryStore((state) => state.deliveries);
  const setDeliveriesWithSearch = deliveryStore(
    (state) => state.setDeliveriesWithSearch
  );
  const setDeliveries = deliveryStore((state) => state.setDeliveries);
  const branches = branchesStore((state) => state.branches);
  const setBranches = branchesStore((state) => state.setBranches);
  const setBranchSelected = deliveryStore((state) => state.setBranchSelected);
  const setDateSelected = deliveryStore((state) => state.setDateSelected);
  const totalDeliveries = deliveryStore((state) => state.totalDeliveries);
  const signalRError = signalRErrorStore(
    (state) => state.signalRErrorConnection
  );
  //localStorage
  const accessToken = localStorage.getItem("accessToken");
  const storeUser = localStorage.getItem("storeUser");
  useEffect(() => {
    axios
      .get(
        "https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/GetStore/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setBranches(orderByNumber(res.data));
        if (localStorage.getItem("storeUser") !== "admin") {
          return setBranchSelected(
            localStorage.getItem("storeUser"),
            deliveries
          );
        }
        setBranchSelected("all");
      });
  }, []);
  const disableSearchButton = () => {
    let disable = false;
    if (branches.length === 0 || branches.length === 0) {
      disable = true;
    }
    return disable;
  };

  let deliveriesCountF = () => {
    let deliveriesAcount = 0;
    deliveries.map((value) => {
      if (value.storeFiltered && value.dateFiltered) {
        deliveriesAcount++;
      }
    });
    setdeliveriesCount(deliveriesAcount);
  };

  useEffect(() => {
    deliveriesCountF();
  }, [deliveries]);

  return (
    <>
      <div className="">
        <h1 className="text-center text-3xl pt-6 bg-red">
          {storeUser === "admin"
            ? "Usuario Administrador"
            : localStorage.getItem("storeUser").toUpperCase()}
        </h1>
        <h1 className="text-center text-2xl pt-6 bg-red ">
          Número de ordenes:
          <span className="font-bold"> {deliveriesCount}</span>
        </h1>
        <h1 className="text-center text-2xl pt-6 bg-red ">
          Órdenes de <span className="font-bold">hoy</span>
        </h1>

        {signalRError && (
          <p className="text-center text-xl text-orange-400 mt-4 ">
            ERROR AL CONECTAR CON EL SERVIDOR
            <i className="ml-2 fa-solid fa-server"></i>
          </p>
        )}
      </div>
      <div className="flex  flex-wrap items-start border-b border-slate-300 pc:px-8 pc:py-4 movil:px-2 movil px-1 justify-between ">
        <div className="flex flex-col mb-3 ">
          <div>
            {branches.length <= 0 && (
              <>
                <p className="ml-4 text-xl font-semibold">
                  Cargando datos, por favor espere...
                  <i class="fa-solid fa-spinner fa-spin ml-4 fa-xl"></i>
                </p>
              </>
            )}
          </div>
          <div className="flex rounded-full p-2 flex-wrap">
            {localStorage.getItem("storeUser") === "admin" && (
              <>
                <select
                  id="status"
                  className={` bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold ${
                    disableSearchButton()
                      ? "text-secondary-600"
                      : "cursor-pointer shadow shadow-gray-400"
                  } mr-4 mt-2`}
                  onChange={(e) => {
                    setBranchSelected(e.target.value, deliveries);
                  }}
                  disabled={disableSearchButton()}
                >
                  <option value="" selected>
                    Seleccione una sucursal
                  </option>
                  <option value="all">{`TODAS (${deliveries.length})`}</option>
                  {branches.map((value, key) => (
                    <option key={key} value={value[0]}>
                      {`${value[0].toUpperCase()} (${value[1].result})`}
                    </option>
                  ))}
                </select>
              </>
            )}
            <button
              className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold ${
                disableSearchButton()
                  ? "text-secondary-600"
                  : "shadow shadow-gray-400"
              }  mr-4 mt-2`}
              onClick={() => {
                setHiddenSearch(!hiddenSearch);
                setDeliveriesWithSearch("", deliveries);
                setLocalSearchString("");
              }}
              disabled={disableSearchButton()}
            >
              Buscar
              <i className="fa-solid fa-magnifying-glass p-2 rounded-full flex justify-center items-center"></i>
            </button>
            <button
              className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold ${
                disableSearchButton()
                  ? "text-secondary-600"
                  : "shadow shadow-gray-400"
              }  mr-4 mt-2`}
              onClick={() => {
                navigate("/filterOrder");
                window.location.reload();

                setDeliveries([{}]);
              }}
              disabled={disableSearchButton()}
            >
              Filtrar por fechas
              <i class="fa-solid fa-calendar-days p-2 rounded-full flex justify-center items-center"></i>
            </button>{" "}
            {/*  <input
              type="date"
              className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold ${
                disableSearchButton()
                  ? "text-secondary-600"
                  : "shadow shadow-gray-400"
              }  mr-4 mt-2`}
              disabled={disableSearchButton()}
              onChange={(e) => {
                setDateSelected(
                  e.target.value ? e.target.value : "none",
                  deliveries
                );
              }}
            />*/}
          </div>
          <div hidden={!hiddenSearch ? true : false} className="mt-2">
            <div className="flex justify-center items-center bg-slate-100 rounded-xl p-2  mb-3">
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear placeholder:opacity-0 focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary "
                id="exampleFormControlInput3"
                onChange={(e) => {
                  setDeliveriesWithSearch(e.target.value, deliveries);
                  setLocalSearchString(e.target.value);
                }}
                value={localSearchString}
              />
              <button
                className="
              bg-red-300
             rounded-full px-[5px]  py-[3px] lex items-center  font-semibold shadow shadow-gray-400 flex justify-center ml-2"
                onClick={() => {
                  setHiddenSearch(!hiddenSearch);
                  setDeliveriesWithSearch("", deliveries);
                  setLocalSearchString("");
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          <div hidden={!hiddenFilters ? true : false} className="mt-2">
            <label htmlFor="">Estados</label>
            <select
              data-te-select-init
              multiple
              data-te-select-filter="true"
              data-te-select-clear-button="true"
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <label htmlFor="">Sucursales</label>
            <select
              data-te-select-init
              multiple
              data-te-select-filter="true"
              data-te-select-clear-button="true"
            >
              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
              <option value="7">Seven</option>
              <option value="8">Eight</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
