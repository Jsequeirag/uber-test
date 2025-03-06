import React, { useEffect, useState } from "react";
import DeliveriesBody from "./DeliveriesBody";
import DeliveriesHead from "./DeliveriesHead";
import DeliveriesHeader from "./DeliveriesHeader";
import deliveryStore from "../../../stores/DeliveryStore";

import branchesStore from "../../../stores/BranchStore";

const DeliveriesTable = () => {
  const deliveries = deliveryStore((state) => state.deliveries);
  const setOrderByDate = deliveryStore((state) => state.setOrderByDate);
  const orderByDate = deliveryStore((state) => state.orderByDate);
  const branches = branchesStore((state) => state.branches);

  const loadingData = () => {
    let loading = true;
    if (Object.entries(branches).length > 0 && deliveries.length > 0) {
      loading = false;
    }
    return loading;
  };
  const heads = [
    { name: "#" },
    {
      name: "Fecha",
      action: () => setOrderByDate(deliveries),
      icon: orderByDate
        ? "ml-2 fa-solid fa-sort-down"
        : "ml-2 fa-solid fa-sort-up",
    },
    { name: "UberID" },
    { name: "ID Factura" },
    { name: "ID Tienda" },
    { name: "Repartidor" },

    { name: "Tel. Repartidor" },

    { name: "Tipo Veh." },

    { name: "Modelo Veh." },

    { name: "Color Veh." },

    { name: "Pickup" },
    { name: "Dropoff" },
    {
      name: "Estado",
      action: () => statusOrder,
    },
    { name: "Localización" },
    { name: "Acciones" },
  ];

  return (
    <>
      <div className="h-auto  w-[100%] desktop:p-8 mb-2">
        <div className="bg-white rounded-2xl border shadow-md">
          <DeliveriesHeader />
          <div
            className="break-words  rounded-2xl  bg-light/30 "
            id="deliviriesTable"
          >
            <div className="overflow-x-auto max-h-[500px]">
              {loadingData() ? (
                <div className="text-center py-2 fill font-bold">
                  <p className="text-xl">No hay Datos para mostrar</p>
                </div>
              ) : (
                <table className="min-w-[100px] w-full my-0 align-middle text-dark border-neutral-200">
                  <DeliveriesHead heads={heads} />
                  <DeliveriesBody heads={heads} />
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveriesTable;
