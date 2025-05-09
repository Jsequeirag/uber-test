import { useState, React, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

const Profile = () => {
  const [formValues, setFormValues] = useState({});
  const [profileInformation, setProfileInformation] = useState({});
  //localStorage
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    axios("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      setProfileInformation(res.data);
    });
  }, []);

  function handleFormValues(e) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    alert(formValues);
  };
  const handleImage = (e) => {
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }

      setProfileInformation({
        ...profileInformation,
        ["imgBase64"]: encoded,
      });
    };
  };
  return (
    <Layout>
      <h3 className="flex flex-col items-start justify-center  text-xl/tight text-dark px-8 py-8">
        <span className="font-semibold text-dark">Perfil de usuario</span>
      </h3>

      <div className="flex px-3 mb-6 bg-light/30 justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-auto  rounded-2xl px-8 pt-6 pb-8 mb-4 bg-white  border border-dashed bg-clip-border border-gray-300 "
        >
          <div className="flex justify-center">
            <img
              className="h-40 w-40 object-contain rounded border border-solid p-2"
              src={`data:image/png;base64,${profileInformation.imgBase64}`}
              alt="Company photo"
            />
          </div>
          <div className="flex justify-center mt-4">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-bg-gray-50 file:black
      hover:file:bg-gray-400
    "
                accept="image/png, image/jpeg"
                onChange={handleImage}
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user"
            >
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="user"
              name="user"
              type="text"
              placeholder="Usuario"
              onChange={handleFormValues}
            />
          </div>{" "}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="123456789"
              onChange={handleFormValues}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className=" p-2.5 cursor-pointer rounded-lg before:text-light-inverse text-md/normal font-semibold hover:bg-black hover:text-white bg-gray-300"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
