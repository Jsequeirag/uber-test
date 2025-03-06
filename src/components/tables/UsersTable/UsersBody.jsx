import { React, useState, useEffect } from "react";
import axios from "axios";
import userStore from "../../../stores/UserStore";
import branchStore from "../../../stores/BranchStore";
import { NotifySuccess, NotifyError, NotifyInfo } from "../../Toasty/Notify";

import MicroModal from "react-micro-modal";
const UsersBody = () => {
  //global
  const users = userStore((state) => state.users);
  const resetFormState = userStore((state) => state.resetFormState);
  const setHiddenForm = userStore((state) => state.setFormHidden);
  const branches = branchStore((state) => state.branches);
  //local
  const [action, setAction] = useState(false);
  //delete User
  const deleteBranch = (idUser) => {
    setAction(true);
    axios
      .post(
        `https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/DeleteUser`,
        {
          UserId: idUser,
        }
      )
      .then((res) => {
        userStore.getState().deleteUser(idUser);
        userStore.getState().setUsers(res.data.usuarios);
        NotifySuccess("Eliminado");
        setAction(false);
      })
      .catch((e) => {
        NotifyError();
        setAction(false);
      });
  };
  //get users
  useEffect(() => {
    axios
      .get(
        "https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/GetAllUser"
      )
      .then((res) => {
        userStore.getState().setUsers(res.data);
      });
  }, []);
  const validateUniqueUser = (storeId) => {
    let usersBranch = users.filter((value) => value.storeId === storeId);
    return usersBranch.length;
  };

  return (
    <tbody>
      <MicroModal
        openInitially={false}
        open={action}
        trigger={(open) => <div onClick={open}></div>}
      >
        {(close) => (
          <button onClick={close}>
            <p className="text-xl">
              Procesando <i class="fa-solid fa-circle-notch fa-spin fa-lg"></i>{" "}
            </p>
          </button>
        )}
      </MicroModal>
      {users.length !== 0 ? (
        users.map(
          (user) =>
            !user?.filtered && (
              <tr key={user.userId} className="border-b  last:border-b-0">
                <td className="text-center p-3 pl-0">
                  <span className="font-semibold text-light-inverse text-md/normal">
                    {user.userName}
                  </span>
                </td>
                <td className="text-center p-3 pl-0">
                  <span className="font-semibold text-light-inverse text-md/normal">
                    {user.storeId?.toUpperCase()}
                  </span>
                </td>

                <td className="p-3 pl-0 text-center">
                  <a href="#userForm">
                    <button
                      className={` p-2.5 ${
                        Object.entries(branches).length > 0 && !action
                          ? "cursor-pointer hover:bg-black hover:text-white shadow shadow-gray-400"
                          : null
                      } rounded-full before:text-light-inverse text-md/normal font-semibold  bg-gray-300 `}
                      onClick={() => {
                        resetFormState();
                        userStore.getState().setFormStateForEdit(user);
                        setHiddenForm();
                      }}
                      disabled={
                        Object.entries(branches).length > 0 && !action
                          ? false
                          : true
                      }
                    >
                      Editar<i className="fa-solid fa-pen ml-1"></i>
                    </button>
                  </a>
                </td>
                <td className="p-3 pl-0 text-center">
                  <button
                    className={`p-2.5 ${
                      Object.entries(branches).length > 0 && !action
                        ? "cursor-pointer hover:bg-black hover:text-white shadow shadow-gray-400"
                        : null
                    } rounded-full before:text-light-inverse text-md/normal font-semibold  bg-gray-300 `}
                    onClick={() => {
                      if (validateUniqueUser(user.storeId) > 1) {
                        resetFormState();
                        deleteBranch(user.userId);
                      } else {
                        NotifyInfo("Unico Usuario, no se puede borrar");
                      }
                    }}
                    disabled={
                      Object.entries(branches).length > 0 && !action
                        ? false
                        : true
                    }
                  >
                    Eliminar<i className="fa-solid fa-trash ml-1 "></i>
                  </button>
                </td>
              </tr>
            )
        )
      ) : (
        <div className="w-full text-center font-bold">Cargando...</div>
      )}
    </tbody>
  );
};
export default UsersBody;
