import { React, useState, useEffect, useCallback } from "react";
import deliveryStore from "../../../stores/DeliveryStore";
import { getCookieByName } from "../../../services/CookiesService";
import signalRErrorStore from "../../../stores/ServerErrorConnection";
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
const DeliveriesBody = ({ heads }) => {
  //global
  //const [deliveries, setDeliveries] = useState([]);
  const deliveries = deliveryStore((state) => state.deliveries);
  const setDeliveries = deliveryStore((state) => state.setDeliveries);
  const setSignalRError = signalRErrorStore(
    (state) => state.setSignalRErrorConnection
  );
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
      const connectionstatus = await startConnection();
      setSignalRError(connectionstatus.connectionError);
      await requestOrders();
      await requestErrors();
    };
    console.log(getCookieByName("session"));

    fetchData();
  }, []);

  useEffect(() => {
    // Rest of your code dependent on specific variables
    onReceiveOrders((message) => {
      console.log("Holas");
      const receivedDeliveries = JSON.parse(message);
      setDeliveries(receivedDeliveries);
    });

    onReceiveStatusUpdate((message) => {
      const parsedMessage = JSON.parse(message);
      let new_deliveries = [...deliveries];

      let foundDelivery = new_deliveries.find(
        (delivery) => delivery.OrderId === parsedMessage.orderId
      );

      if (foundDelivery) {
        if (Object.prototype.hasOwnProperty.call(parsedMessage, "estatus")) {
          foundDelivery.Estatus = parsedMessage.estatus;
        }
        if (
          Object.prototype.hasOwnProperty.call(parsedMessage, "courierName")
        ) {
          foundDelivery.CourierName = parsedMessage.courierName;
        }
        if (
          Object.prototype.hasOwnProperty.call(parsedMessage, "vehicleType")
        ) {
          foundDelivery.VehicleType = parsedMessage.vehicleType;
        }
        if (
          Object.prototype.hasOwnProperty.call(parsedMessage, "vehicleModel")
        ) {
          foundDelivery.VehicleModel = parsedMessage.vehicleModel;
        }
        if (
          Object.prototype.hasOwnProperty.call(parsedMessage, "vehicleColor")
        ) {
          foundDelivery.VehicleColor = parsedMessage.vehicleColor;
        }
        if (
          Object.prototype.hasOwnProperty.call(
            parsedMessage,
            "courierPhoneNumber"
          )
        ) {
          foundDelivery.CourierPhoneNumber = parsedMessage.courierPhoneNumber;
        }
        if (
          Object.prototype.hasOwnProperty.call(
            parsedMessage,
            "minutesUntilPickup"
          )
        ) {
          foundDelivery.MinutesUntilPickup = parsedMessage.minutesUntilPickup;
          console.log(foundDelivery.MinutesUntilPickup);
        }
        if (
          Object.prototype.hasOwnProperty.call(
            parsedMessage,
            "minutesUntilDropoff"
          )
        ) {
          foundDelivery.MinutesUntilDropoff = parsedMessage.minutesUntilDropoff;
          console.log(foundDelivery.MinutesUntilDropoff);
        }
        if (
          Object.prototype.hasOwnProperty.call(parsedMessage, "availableAction")
        ) {
          foundDelivery.AvailableAction = parsedMessage.availableAction;
        }
      } else {
        console.log("Delivery not found");
      }
      offReceiveStatusUpdate();
      offReceiveOrders();

      setDeliveries(new_deliveries);
    });
    // You can include additional dependencies if needed, like deliveries, etc.
  }, [deliveries, setDeliveries]);

  const handleCancelClick = useCallback(async (orderId) => {
    await requestOrderCancellation(orderId);
    console.log("Cancellation action triggered");
  }, []);

  const handleNewDeliveryClick = async (data) => {
    console.log("Se llamó la función");
    let serializedData = JSON.stringify(data);
    await requestNewDelivery(serializedData);
    console.log("New Delivery action triggered");
  };

  useEffect(() => {
    // Rest of your code dependent on specific variables
    const handleErrorsMessage = (message) => {
      const receivedErrors = JSON.parse(message);
      for (const error of receivedErrors) {
        error.CreationDate = new Date(error.CreationDate);
      }
      setErrors(receivedErrors);
    };

    onReceiveErrors(handleErrorsMessage);
  }, [errors]);

  const handleSolvedClick = useCallback(async (data) => {
    let serializedData = JSON.stringify(data);
    await requestMarkErrorAsSolved(serializedData);
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
                            {formatIsoDate(delivery.CreationDate) +
                              " " +
                              formatIsoDateTime(delivery.CreationDate)}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 grid-flow-col">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[2].name}</h2>
                          </div>
                          <span className="font-medium   text-md/normal">
                            {delivery.DeliveryShortId}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2  grid-flow-col">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[3].name}</h2>
                          </div>
                          <span className="font-medium   text-md/normal">
                            {delivery.OrderId}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[4].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.StoreId}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[5].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal inline">
                            {delivery.CourierName == null ||
                            delivery.CourierName == ""
                              ? "-"
                              : delivery.CourierName}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[6].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.CourierPhoneNumber == null ||
                            delivery.CourierPhoneNumber == ""
                              ? "-"
                              : delivery.CourierPhoneNumber}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[7].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.VehicleType == null ||
                            delivery.VehicleType == ""
                              ? "-"
                              : delivery.Estatus == "Cancelado"
                              ? ""
                              : delivery.VehicleType}
                          </span>
                          {/*comentario prueba*/}
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[8].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.VehicleModel == null ||
                            delivery.VehicleModel == ""
                              ? "-"
                              : delivery.VehicleModel}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[9].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.VehicleColor == null ||
                            delivery.VehicleColor == ""
                              ? "-"
                              : delivery.VehicleColor}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[10].name}</h2>
                          </div>
                          <span className="font-medium  text-md/normal">
                            {delivery.MinutesUntilPickup > 0 &&
                            !["Cancelado", "Retornado", "Entregado"].includes(
                              delivery.Estatus
                            )
                              ? delivery.MinutesUntilPickup + " mins"
                              : "N/A"}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[11].name}</h2>
                          </div>
                          <span className="font-medium   text-md/normal">
                            {delivery.MinutesUntilDropoff > 0 &&
                            !["Cancelado", "Retornado", "Entregado"].includes(
                              delivery.Estatus
                            )
                              ? delivery.MinutesUntilDropoff + " mins"
                              : "N/A"}
                          </span>
                        </td>
                        <td className="text-center p-3 pl-0 min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[12].name}</h2>
                          </div>
                          <span
                            className={`font-semibold  text-md/normal ${
                              statusColorMap[delivery.Estatus] || defaultColor
                            }`}
                          >
                            {delivery.Estatus == null
                              ? "Procesando..."
                              : delivery.Estatus}
                          </span>
                        </td>
                        <td className="p-3 pl-0 text-center min-w-[140px] border-b   grid  pc:grid-cols-1  movil:grid-cols-2 ">
                          <div className="pc:hidden movil:block">
                            <h2 className="font-semibold">{heads[13].name}</h2>
                          </div>
                          <a
                            href={delivery.TrackingUrl}
                            className={`p-2 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold ${
                              delivery.Estatus === "Entregado" ||
                              delivery.Estatus === "Cancelado"
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
                            className={`p-2.5 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold ${
                              delivery.AvailableAction === 1 ||
                              (delivery.IsCopy == true &&
                                delivery.AvailableAction != 0) ||
                              delivery.Estatus == null
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                                : "hover:bg-black hover:text-white bg-gray-300"
                            }`}
                            onClick={() => {
                              if (
                                delivery.AvailableAction === 2 &&
                                !delivery.IsCopy
                              ) {
                                delivery.Variant = "resend";
                                handleNewDeliveryClick(delivery);
                              } else if (
                                delivery.AvailableAction === 3 &&
                                !delivery.IsCopy
                              ) {
                                delivery.Variant = "resend";
                                handleNewDeliveryClick(delivery);
                              } else if (
                                delivery.AvailableAction === 4 &&
                                !delivery.IsCopy
                              ) {
                                delivery.Variant = "complement";
                                handleNewDeliveryClick(delivery);
                              } else if (delivery.AvailableAction === 0) {
                                handleCancelClick(delivery.OrderId);
                              }
                            }}
                            disabled={delivery.AvailableAction === 1}
                          >
                            {delivery.AvailableAction === 1 ||
                            delivery.AvailableAction === 2 ||
                            delivery.AvailableAction === 4 ||
                            delivery.AvailableAction === 3
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
export default DeliveriesBody;
