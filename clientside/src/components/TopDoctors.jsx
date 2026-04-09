import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors, getDoctorsData } = useContext(AppContext);

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10 bg-gray-50 p-5">
      
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-center">
        Consult Top Ayurveda Doctors
      </h1>

      {/* Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {doctors.slice(0, 10).map((item, index) => (
          
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item.id}`);
              window.scrollTo(0, 0);
            }}
            className="bg-white border border-blue-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
          >
            
            {/* Image Container */}
            <div className="w-full h-64 bg-blue-50 overflow-hidden flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-1">
              
              {/* Availability */}
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.isActive ? "text-green-500" : "text-gray-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                <span>
                  {item.isActive ? "Available" : "Not Available"}
                </span>
              </div>

              {/* Name */}
              <p className="text-gray-900 text-lg font-semibold leading-tight">
                {item.name}
              </p>

              {/* Speciality */}
              <p className="text-gray-500 text-sm">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TopDoctors;