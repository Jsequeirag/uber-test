import { React, useState, useEffect, useCallback } from "react";
import deliveryStore from "../../../stores/DeliveryStore";
import { getCookieByName } from "../../../services/CookiesService";
import {
  formatIsoDate,
  formatIsoDateTime,
} from "../../../utils/format/formatIsoDate";
import {
  startConnection,
  onReceiveOrders,
  onReceiveStatusUpdate,
  requestOrders,
  requestOrderCancellation,
  requestNewDelivery,
  onReceiveErrors,
  requestErrors,
  requestMarkErrorAsSolved,
  offReceiveOrders,
  offReceiveStatusUpdate,
} from "../../../services/SignalRService";
const FilterBody = ({ heads }) => {
  //global
  //const [deliveries, setDeliveries] = useState([]);
  const deliveries = deliveryStore((state) => state.deliveries);
  const setDeliveries = deliveryStore((state) => state.setDeliveries);
  //local
  const [errors, setErrors] = useState([]);

  const statusColorMap = {
    Cancelado: "text-red-600",
    Pendiente: "text-yellow-500",
    Retornado: "text-orange-600",
  };

  const defaultColor = "text-green-600";

  useEffect(() => {
    const fetchData = async () => {
      await startConnection();
      await requestOrders();
      await requestErrors();
    };
    console.log(getCookieByName("session"));

    fetchData();
  }, []);

  let indexNumber = 1;

  return (
    <tbody className=" flex flex-col">
      {deliveries.length > 0 ? (
        deliveries.map((delivery, index) => (
          <>
            {delivery.storeFiltered && (
              <>
                {delivery.dateFiltered && (
                  <>
                    {delivery?.filter && (
                      <tr
                        key={delivery.index}
                        className={`border-t border-black ${
                          indexNumber % 2 === 0 ? "bg-slate-100" : "bg-white"
                        }  flex pc:flex-row movil:flex-col`}
                      >
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b grid  pc:grid-cols-1  movil:grid-cols-2 grid-flow-col ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">
                              {heads[0].name + indexNumber}
                            </h2>
                          </div>
                          <span className="font-medium   text-md/normal flex justify-center items-center">
                            <span className="pc:block movil:hidden">
                              {indexNumber++} -
                            </span>
                            <i
                              className="fa-solid fa-bag-shopping fa-2xl  ml-1 border-b"
                              style={{ color: "black" }}
                            ></i>
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 grid-flow-col">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[1].name}</h2>
                          </div>
                          <span className="font-medium   text-md/normal">
                            {formatIsoDate(delivery.creationDate) +
                              " " +
                              formatIsoDateTime(delivery.creationDate)}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 grid-flow-col">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[2].name}</h2>
                          </div>
                          <span className="font-medium   text-md/normal">
                            {delivery.deliveryShortId}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2  grid-flow-col">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[3].name}</h2>
                          </div>
                          <span className="font-medium   text-md/normal">
                            {delivery.orderId}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[4].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.storeId}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[5].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal inline">
                            {delivery.courierName == null ||
                            delivery.courierName == ""
                              ? "-"
                              : delivery.courierName}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[6].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.courierPhoneNumber == null ||
                            delivery.courierPhoneNumber == ""
                              ? "-"
                              : delivery.courierPhoneNumber}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[7].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.vhicleType == null ||
                            delivery.vehicleType == ""
                              ? "-"
                              : delivery.estatus == "Cancelado"
                              ? ""
                              : delivery.vehicleType}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[8].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.vehicleModel == null ||
                            delivery.vehicleModel == ""
                              ? "-"
                              : delivery.vehicleModel}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[9].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.vehicleColor == null ||
                            delivery.vehicleColor == ""
                              ? "-"
                              : delivery.vehicleColor}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[10].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.minutesUntilPickup > 0 &&
                            !["Cancelado", "Retornado", "Entregado"].includes(
                              delivery.estatus
                            )
                              ? delivery.minutesUntilPickup + " mins"
                              : "N/A"}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[11].name}</h2>
                          </div>
                          <span className="font-medium   text-md/normal">
                            {delivery.minutesUntilDropoff > 0 &&
                            !["Cancelado", "Retornado", "Entregado"].includes(
                              delivery.Estatus
                            )
                              ? delivery.minutesUntilDropoff + " mins"
                              : "N/A"}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[12].name}</h2>
                          </div>
                          <span
                            className={`font-semibold  text-md/normal ${
                              statusColorMap[delivery.estatus] || defaultColor
                            }`}
                          >
                            {delivery.estatus == null
                              ? "Procesando..."
                              : delivery.estatus}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-center min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[13].name}</h2>
                          </div>
                          <a
                            href={delivery.trackingUrl}
                            className={`p-2 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold ${
                              delivery.estatus === "Entregado" ||
                              delivery.estatus === "Cancelado" ||
                              delivery.estatus === "Retornado"
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                                : "hover:bg-black hover:text-white bg-gray-300"
                            }`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Localización
                            <i className="fa-solid fa-location-crosshairs"></i>
                          </a>
                        </td>
                        <td className="p-3 pl-0 text-center min-w-[140px] border-b   grid    pc:grid-cols-1   movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[14].name}</h2>
                          </div>
                          <button
                            disabled
                            className={`p-2.5 rounded-lg before:text-light-inverse text-md/normal font-semibold ${
                              delivery.availableAction === 1 ||
                              delivery.availableAction === 3 ||
                              (delivery.isCopy == true &&
                                delivery.availableAction != 0) ||
                              delivery.estatus == null
                                ? "bg-gray-300 text-gray-500"
                                : "  bg-gray-300"
                            }`}
                          >
                            {delivery.availableAction === 1 ||
                            delivery.availableAction === 2 ||
                            delivery.availableAction === 4
                              ? "Nuevo pedido"
                              : "Cancelar"}
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ))
      ) : (
        <>
          <b className="m-4">NOTA: No se han cargado las órdenes</b>
        </>
      )}
      {errors.length !== 0 ? (
        errors.map((error) => (
          <tr
            key={`${error.OrderId}-${error.ErrorDate}`}
            className="border-b border-dashed last:border-b-0"
          >
            <td className="text-center p-3 pl-0">
              <span className="font-semibold text-light-inverse text-md/normal">
                {"Error en envío"}
              </span>
            </td>
            <td className="text-center p-3 pl-0">
              <span className="font-semibold text-light-inverse text-md/normal">
                {error.OrderId}
              </span>
            </td>
            <td className="text-center p-3 pl-0">
              <span className="font-semibold text-light-inverse text-md/normal">
                {error.StoreId}
              </span>
            </td>
            <td className="text-center p-3 pl-0" colSpan="9">
              <span className="font-semibold text-light-inverse text-md/normal text-orange-500">
                {error.ErrorMessage}
              </span>
            </td>
            <td className="p-3 pl-0 text-center">
              <button
                className={
                  "p-2.5 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold hover:bg-black hover:text-white bg-gray-300"
                }
                onClick={() => handleSolvedClick(error)}
              >
                {"Marcar como resuelto"}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <></>
      )}
    </tbody>
  );
};
export default FilterBody;
