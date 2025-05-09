import { React, useState, useEffect } from "react";
import axios from "axios";
const ParameterForm = () => {
  //localStorage
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios("http://localhost:3000/companyInformation", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      setCompanyInformation(res.data);
    });
  }, []);

  const [companyInformation, setCompanyInformation] = useState({});
  const handleImage = (e) => {
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      console.log(encoded);
      setCompanyInformation({
        ...companyInformation,
        ["imgBase64"]: encoded,
      });
    };
  };
  return (
    <form className="desktop:w-[55%] laptop:w-[100%] tablet:w-[100%] phone:w-[100%]  min-w-[300px] rounded-2xl p-8  bg-white  border border-dashed bg-clip-border border-gray-300">
      <div className="mb-4 flex flex-col">
        <div className="flex justify-center">
          <img
            className="h-40 w-40 object-contain rounded border border-solid p-2"
            src={`data:image/png;base64,${companyInformation.imgBase64}`}
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
      </div>
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-4"
          for="user"
        >
          Compañia
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="user"
          name="user"
          value={companyInformation?.name}
          type="text"
          placeholder="Compañia"
          disabled
        />
      </div>
    </form>
  );
};

export default ParameterForm;
