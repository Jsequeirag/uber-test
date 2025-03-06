import React from "react";
const statusOrder = () => {
  setDeliveries(deliveries.sort(compare("name")));
};
function compare(prop) {
  return function (a, b) {
    console.log(prop); // outputs -> name
    return -1; // sort stuff
  };
}

const DeliveriesHead = ({ heads }) => {
  return (
    <thead className="align-bottom pc:block movil:hidden">
      <tr className="font-semibold text-[0.95rem] text-secondary-dark min-w-[140px] ">
        {heads.map((head, index) => (
          <th
            key={index}
            className="pb-3 text-center min-w-[140px]"
            onClick={head?.action}
          >
            {head.name}
            {head?.icon && <i className={head.icon}></i>}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DeliveriesHead;
