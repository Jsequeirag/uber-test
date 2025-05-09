import React, { useEffect, useState } from "react";
import UserStore from "../../../stores/UserStore";
import MicroModal from "react-micro-modal";
import axios from "axios";
import { goTop } from "../../../utils/responsiveFunctions";
import { Select, initTE } from "tw-elements";
import Toastify from "../../Toasty/Toastify";
import { NotifySuccess, NotifyError, NotifyInfo } from "../../Toasty/Notify";

import branchStore from "../../../stores/BranchStore";
const UserForm = () => {
  //global
  const formState = UserStore((state) => state.formState);
  const users = UserStore((state) => state.users);
  const setHiddenForm = UserStore((state) => state.setFormHidden);
  const formHidden = UserStore((state) => state.formHidden);
  const branches = branchStore((state) => state.branches);
  const setBranches = branchStore((state) => state.setBranches);
  //local
  const accessToken = localStorage.getItem("accessToken");
  const [action, setAction] = useState(false);
  const handleSubmit = async (e) => {
    setAction(true);
    e.preventDefault();
    formState.userId
      ? await axios
          .post(
            `https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/UpdateUser`,
            {
              UserId: formState.userId,
              UserName: formState.userName,
              StoreId: !formState?.storeId
                ? "alajuela la trinidad"
                : formState?.storeId,
              PasswordHash: formState.passwordHash,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            UserStore.getState().setUsers(res.data.usuarios);
            UserStore.getState().resetFormState();
            NotifySuccess("Editado");
            setAction(false);
          })
          .catch((e) => {
            NotifyError();
            console.log(e);
            setAction(false);
          })
      : validateExistingUser() === true
      ? await axios
          .post(
            `https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/CreateUser`,
            {
              UserName: formState.userName,
              StoreId: !formState?.storeId
                ? "alajuela la trinidad"
                : formState.storeId,
              PasswordHash: formState.PasswordHash,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            UserStore.getState().setUsers(res.data.usuarios);
            UserStore.getState().resetFormState();
            NotifySuccess("Registrado");
            setAction(false);
          })
          .catch((e) => {
            NotifyError();
            console.log(e);
            setAction(false);
          })
      : NotifyInfo(`El usuario "${formState.userName}" ya existe`);
    setAction(false);
  };

  const formValuesHandle = (e) => {
    UserStore.getState().setFormState(e);
  };
  //getusers
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
        try {
          setBranches(res.data);
          initTE({ Select });
        } catch (e) {
          console.log(e);
        }
      });
  }, []);
  useEffect(() => {
    try {
      initTE({ Select });
      const singleSelect = document.querySelector("#singleSelection");
      const singleSelectInstance = Select.getInstance(singleSelect);
      formState?.storeId && singleSelectInstance.setValue(formState?.storeId);
    } catch (e) {
      console.log(e);
    }
  }, [formState]);
  const validateExistingUser = () => {
    var isSaved = true;
    users.map((value) => {
      if (
        value.userName.toLocaleUpperCase() ===
        formState.userName.toLocaleUpperCase()
      ) {
        isSaved = false;
      }
    });

    return isSaved;
  };

  return (
    <>
      <Toastify />
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
      <form
        id="userForm"
        onSubmit={handleSubmit}
        className={`  desktop:w-[55%] laptop:w-[100%] tablet:w-[100%] phone:w-[100%] rounded-2xl p-8  bg-white  border  shadow-md border-gray-300  tablet:mb-14 phone:mb-14 tablet:mt-4 phone:mt-4`}
      >
        <h1 className="text-center m-4 font-semibold text-xl">
          {formState.userId ? "Editar Usuario" : "Agregar Usuario"}
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="userName"
            type="text"
            value={formState.userName || ""}
            placeholder="Ingrese nombre de usuario"
            onChange={formValuesHandle}
            required
            autoComplete="off"
            minLength={3}
            disabled={Object.entries(branches).length > 0 ? false : true}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="BranchDirection"
          >
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="identification"
            name="PasswordHash"
            type="Password"
            disabled={Object.entries(branches).length > 0 ? false : true}
            placeholder={
              formState.userId ? "Nueva Contraseña" : "Ingresar Contraseña"
            }
            onChange={formValuesHandle}
            required
            autoComplete="off"
            minLength={6}
            value={formState.PasswordHash || ""}
          />
        </div>
        <div className=" w-[300px] mb-4">
          <label
            htmlFor="singleSelection"
            className="block mb-2  before:text-light-inverse text-md/normal font-semibold text-gray-900 dark:text-black"
          >
            Sucursal
          </label>

          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="storeId"
            onChange={formValuesHandle}
            value={formState.storeId || ""}
            data-te-select-init
            data-te-select-filter="true"
            data-te-select-clear-button="true"
            id="singleSelection"
            data-twe-select-init
            disabled={Object.entries(branches).length > 0 ? false : true}
          >
            {Object.entries(branches).length > 0 ? (
              <>
                {Object.entries(branches).map(([key, value]) => (
                  <option key={key} value={key.toString()}>
                    {key.toString().toLocaleUpperCase()}
                  </option>
                ))}
              </>
            ) : (
              <option>Cargando...</option>
            )}
          </select>
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              goTop();
              setHiddenForm();
              UserStore.getState().resetFormState();
            }}
            type="button"
            className={`mt-5 p-2.5 ${
              Object.entries(branches).length > 0 && !action
                ? "cursor-pointer hover:bg-black hover:text-white  shadow shadow-gray-400"
                : null
            } rounded-full before:text-light-inverse text-md/normal font-semibold  bg-red-300 mx-6`}
            disabled={
              Object.entries(branches).length > 0 && !action ? false : true
            }
          >
            Cancelar
          </button>

          <button
            type="submit"
            className={`mt-5 p-2.5 ${
              Object.entries(branches).length > 0 && !action
                ? "cursor-pointer hover:bg-black hover:text-white  shadow shadow-gray-400"
                : null
            } rounded-full before:text-light-inverse text-md/normal font-semibold  bg-blue-300 mx-6"`}
            disabled={
              Object.entries(branches).length > 0 && !action ? false : true
            }
          >
            {formState.userId ? "Confirmar" : "Registrar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
