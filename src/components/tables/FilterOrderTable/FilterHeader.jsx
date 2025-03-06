import { React, useEffect, useState } from "react";
import deliveryStore from "../../../stores/DeliveryStore";
import branchesStore from "../../../stores/BranchStore";
import moment from "moment";
import { orderByNumber } from "../../../utils/filters/filters";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getActuallyWeek,
  getActuallyMonth,
} from "../../../utils/filters/filters";
import { formatDateToIso } from "../../../utils/format/formatIsoDate";
export default function FilterHeader() {
  //Route
  const navigate = useNavigate();
  //local
  const [deliveriesCount, setdeliveriesCount] = useState(0);
  const [hiddenSearch, setHiddenSearch] = useState(false);
  const [hiddenFilters, setHiddenFilters] = useState(false);
  const [localSearchString, setLocalSearchString] = useState("");
  const [rangeDate, setRangeDate] = useState();
  //global
  const deliveries = deliveryStore((state) => state.deliveries);
  const setDeliveriesWithSearch = deliveryStore(
    (state) => state.setDeliveriesWithSearch
  );
  const setDeliveries = deliveryStore((state) => state.setDeliveries);
  const branches = branchesStore((state) => state.branches);
  const setBranches = branchesStore((state) => state.setBranches);
  const setBranchSelected = deliveryStore((state) => state.setBranchSelected);
  const branchSelected = deliveryStore((state) => state.branchSelected);

  //localStorage
  const storeUser = localStorage.getItem("storeUser");
  const [focusedButton, setFocusedButton] = useState(true);
  const getOrderByDate = (startDate, endDate) => {
    axios
      .post(
        "https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/GetDeliveryByDates",
        {
          startDate,
          endDate,
        }
      )
      .then((res) => {
        setDeliveries(res.data);
        if (localStorage.getItem("storeUser") !== "admin") {
          setBranchSelected(localStorage.getItem("storeUser"), deliveries);
        } else {
          if (branchSelected === "none") {
            setBranchSelected("all", res.data);
          }
        }
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/GetStore/"
      )
      .then((res) => {
        setBranches(orderByNumber(res.data));

        getOrderByDate(moment().startOf("day"), moment().format());
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
        {new Date().getFullYear() >= 2090 && (
          <p className="m-2 text-lg">
            Seguimos vivos, Equipo Orbitas 2024: Jose, Jafeth, Daylan
          </p>
        )}
        <h1 className="text-center text-3xl pt-6 bg-red">
          {storeUser === "admin"
            ? "Usuario Administrador"
            : localStorage.getItem("storeUser").toUpperCase()}
        </h1>
        <h1 className="text-center text-2xl pt-6 bg-red ">
          Número de ordenes:
          <span className="font-bold"> {deliveriesCount}</span>
        </h1>
      </div>{" "}
      <button
        className={`bg-gray-300 rounded-full px-4  py-2 flex justify-center items-center  font-semibold ml-10 shadow shadow-gray-400     pc:mr-4 pc:mt-2 movil:mr-2 movil:mt-1`}
        onClick={() => {
          setDeliveries([{}]);

          navigate("/home");
          window.location.reload();
        }}
      >
        {" "}
        Atras
        <i class="fa-solid fa-house ml-2 flex justify-center items-center" />
      </button>
      <div className="flex  flex-wrap items-start border-b border-slate-300 pc:px-8 pc:py-4 movil:px-2 movil px-1 justify-between ">
        <div className="flex flex-col mb-3 ">
          {" "}
          {branches.length <= 0 && (
            <>
              <p className="ml-4 mb-4 text-xl font-semibold ">
                Cargando datos, por favor espere...
                <i class="fa-solid fa-spinner fa-spin ml-4 fa-xl"></i>
              </p>
            </>
          )}
          <div className="flex rounded-full p-2 flex-wrap">
            <>
              <div className="flex flex-col">
                <div className="flex flex-wrap">
                  <div className="relative">
                    <label
                      for="startDate"
                      class="absolute text-xl text-black font-semibold dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  pc:mt-0 movil:mt-2"
                    >
                      Fecha inicial
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      onChange={(e) => {
                        setRangeDate({
                          ...rangeDate,
                          [e.target.name]: formatDateToIso(
                            new Date(e.target.value)
                          ),
                        });
                      }}
                      className={`bg-gray-300 rounded-full p-3 flex justify-center items-center  font-semibold ${
                        disableSearchButton()
                          ? "text-secondary-600"
                          : "shadow shadow-gray-400"
                      }  mr-4 pc:mt-2 movil:mt-4`}
                      type="date"
                      placeholder="Fecha Inicial"
                    />
                  </div>
                  <div className="relative">
                    <label
                      for="endDate"
                      class="absolute text-xl text-black font-semibold dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto pc:mt-0 movil:mt-3"
                    >
                      Fecha final
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      onChange={(e) => {
                        getOrderByDate(
                          rangeDate.startDate,
                          formatDateToIso(new Date(e.target.value))
                        );
                      }}
                      className={`bg-gray-300 rounded-full p-3 flex justify-center items-center  font-semibold ${
                        disableSearchButton()
                          ? "text-secondary-600"
                          : "shadow shadow-gray-400"
                      }  mr-4 pc:mt-2 movil:mt-5`}
                      type="date"
                      placeholder="Fecha final"
                    />
                  </div>
                  <button
                    id="focused"
                    className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold focus:bg-black focus:text-white  ${
                      disableSearchButton()
                        ? "text-secondary-600"
                        : "shadow shadow-gray-400"
                    }  mr-4 mt-2`}
                    style={{
                      backgroundColor: focusedButton && "black",
                      color: focusedButton && "white",
                    }}
                    onClick={() => {
                      getOrderByDate(
                        moment().startOf("day"),
                        moment().format()
                      );
                    }}
                    disabled={disableSearchButton()}
                  >
                    Hoy
                  </button>
                  <button
                    className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold focus:bg-black focus:text-white ${
                      disableSearchButton()
                        ? "text-secondary-600"
                        : "shadow shadow-gray-400"
                    }  mr-4 mt-2`}
                    onClick={() => {
                      getOrderByDate(
                        getActuallyWeek().firstday,
                        getActuallyWeek().lastday
                      );
                      setFocusedButton(false);
                    }}
                    disabled={disableSearchButton()}
                  >
                    Semana
                  </button>{" "}
                  <button
                    className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold focus:bg-black focus:text-white ${
                      disableSearchButton()
                        ? "text-secondary-600"
                        : "shadow shadow-gray-400"
                    }  mr-4 mt-2`}
                    onClick={() => {
                      getOrderByDate(
                        getActuallyMonth().firstday,
                        getActuallyMonth().lastday
                      );
                      setFocusedButton(false);
                    }}
                    disabled={disableSearchButton()}
                  >
                    Mes
                  </button>{" "}
                  <button
                    className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold focus:bg-black focus:text-white ${
                      disableSearchButton()
                        ? "text-secondary-600"
                        : "shadow shadow-gray-400"
                    }  mr-4 mt-2`}
                    onClick={() => {
                      getOrderByDate(
                        "2000-05-18T16:21:07.430",
                        "2200-05-18T16:21:07.430"
                      );
                      setFocusedButton(false);
                    }}
                    disabled={disableSearchButton()}
                  >
                    Todos
                  </button>
                  {localStorage.getItem("storeUser") === "admin" && (
                    <div className="relative">
                      <label
                        for="endDate"
                        class="absolute text-xl text-black font-semibold dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  pc:mt-0 movil:mt-3"
                      >
                        Sucursales
                      </label>
                      <select
                        id="sucursal"
                        className={` bg-gray-300 rounded-full py-4 px-1 flex justify-center items-center  font-semibold ${
                          disableSearchButton()
                            ? "text-secondary-600"
                            : "cursor-pointer shadow shadow-gray-400"
                        } mr-4 pc:mt-2 movil:mt-4`}
                        onChange={(e) => {
                          setBranchSelected(e.target.value, deliveries);
                        }}
                        disabled={disableSearchButton()}
                      >
                        {" "}
                        <option value="none" selected>
                          Seleccione una sucursal
                        </option>
                        <option value="all">{`TODAS (${deliveries.length})`}</option>
                        {branches.map((value, key) => (
                          <option key={key} value={value[0]}>
                            {`${value[0].toUpperCase()} (${value[1].result})`}
                          </option>
                        ))}
                      </select>
                    </div>
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
                  </button>{" "}
                  {/* <button
                    className={`bg-gray-300 rounded-full p-2 flex justify-center items-center  font-semibold ${
                      disableSearchButton()
                        ? "text-secondary-600"
                        : "shadow shadow-gray-400"
                    }  mr-4 mt-2`}
                    onClick={() => {}}
                    disabled={disableSearchButton()}
                  >
                    Exportar
                    <i class="fa-solid fa-table  p-2 "></i>
                  </button>*/}
                </div>
              </div>
            </>

            {/*<input
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
