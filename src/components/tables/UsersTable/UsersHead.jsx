import { React, useState } from "react";
import userStore from "../../../stores/UserStore";
import { usersFilteredAscent } from "../../../utils/filters/usersFilters";
const UsersHead = () => {
  const [nameAscIcon, setNameAscIcon] = useState(false);
  const [lastNameAscIcon, setlastNameAscIcon] = useState(false);
  const [branchAscIcon, setbranchAscIcon] = useState(false);
  const users = userStore((state) => state.users);
  return (
    <thead className="align-bottom">
      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
        <th
          className="pb-3 text-center min-w-[100px] cursor-pointer"
          onClick={() => {
            userStore
              .getState()
              .setUsers(usersFilteredAscent(users, "UserName"));
            setNameAscIcon(!nameAscIcon);
          }}
        >
          Usuario
          {/*nameAscIcon ? (
            <i className="fa-solid fa-arrow-up-z-a"></i>
          ) : (
            <i className="fa-solid fa-arrow-down-a-z"></i>
          )*/}
        </th>
        <th
          className="pb-3 text-center  min-w-[100px]  cursor-pointer"
          onClick={() => {
            userStore.getState().setUsers(usersFilteredAscent(users, "branch"));
            setbranchAscIcon(!branchAscIcon);
          }}
        >
          Sucursal
          {/*branchAscIcon ? (
            <i className="fa-solid fa-arrow-up-z-a"></i>
          ) : (
            <i className="fa-solid fa-arrow-down-a-z"></i>
          )*/}
        </th>
        <th
          className="pb-3 text-center min-w-[100px] cursor-pointer hover:ring-slate-400"
          onClick={() => statusOrder}
        >
          Editar
        </th>{" "}
        <th
          className="pb-3 text-center min-w-[100px] cursor-pointer hover:ring-slate-400"
          onClick={() => statusOrder}
        >
          Eliminar
        </th>
      </tr>
    </thead>
  );
};

export default UsersHead;
