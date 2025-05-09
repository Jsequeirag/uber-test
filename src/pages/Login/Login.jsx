import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import "./bg.css";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import deliveryStore from "../../stores/DeliveryStore";
const Login = () => {
  //global
  const setBranchSelected = deliveryStore((state) => state.setBranchSelected);
  const branchSelected = deliveryStore((state) => state.branchSelected);
  //local
  const [userCredentials, setUserCredentials] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleData(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  let navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const url =
      "https://uberdirectwebhookapi-cyhqhnfygqaggae5.canadacentral-01.azurewebsites.net/Authenticate";
    const data = {
      UserName: userCredentials.username,
      Password: userCredentials.password,
    }; // Replace with hashed password

    axios
      .post(url, data)
      .then(async (res) => {
        setLoading(false);
        localStorage.setItem(
          "storeUser",
          res.data.userInfo.storeUser === null
            ? "admin"
            : res.data.userInfo.storeUser
        );
        localStorage.setItem("user", res.data.userInfo.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        window.location.reload();
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
        setLoading(false);
      });
  };
  useEffect(() => {}, []);

  return (
    <motion.div
      className="box "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="layout flex justify-center flex-col items-center h-[94vh] bg-[url('/public/uber-bg.jpg">
        <form
          onSubmit={handleLogin}
          className="mt-2 backdrop-blur-3xl  shadow-md shadow-gray-800 rounded-xl px-8 pt-6 pb-8  flex flex-col desktop:min-w-[30%] laptop:min-w-[50%] tablet:min-w-[80%] phone:min-w-[80%]"
        >
          <div className="m-4 flex justify-center items-center flex-col">
            <motion.div
              className="box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <img src="/apple-touch-icon.png" width="75" height="75" alt="" />
            </motion.div>

            <h1 id="uber-name" className="text-black text-2xl font-semibold ">
              Uber
              <span
                id="direct-name"
                className="ml-1 text-black   text-2xl font-thin"
              >
                Direct
              </span>
            </h1>
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              type="text"
              name="username"
              placeholder="Usuario"
              onChange={handleData}
              required
              autoComplete="off"
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-black  text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              name="password"
              placeholder="******"
              onChange={handleData}
              required
            ></input>
            <p className="text-red-700 text-xs italic">{errorMessage}</p>
          </div>
          <div className="flex items-center flex-col ">
            <button
              className="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 mb-2 rounded w-[200px] text-center"
              type="submit"
            >
              {loading ? <Loading /> : "Ingresar"}
            </button>
            <a
              className="inline-block align-baseline text-black  font-bold text-sm text-blue hover:text-blue-darker"
              href="#"
            >
              he olvidado la contraseña
            </a>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
