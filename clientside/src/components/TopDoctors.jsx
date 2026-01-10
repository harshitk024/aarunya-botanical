import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors,getDoctorsData } = useContext(AppContext);

  useEffect(() => {

    getDoctorsData()

  },[])

  
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 bg-gray-50 p-5">
      <h1 className="text-3xl font-medium  p-5 w-full text-center">Consult Top Ayurveda Doctors</h1>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item.id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50 max-h-80 w-full" src={item.image} alt=""/>
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.isActive ? "text-green-500" : "text-gray-500"
                }`}
              >
                <p
                  className={`w-2 h-2 ${
                    item.isActive ? "bg-green-500" : "bg-gray-500"
                  } rounded-full`}
                ></p>
                <p>{item.isActive ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm ">{item.degree}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TopDoctors;
