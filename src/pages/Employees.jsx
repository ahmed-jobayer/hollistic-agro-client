import useEmployes from "../hooks/useEmployes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Employees = () => {
  const [employees] = useEmployes();
  // Separate Employees and Non Employees
  const employeeList = employees.filter(
    (emp) => emp.employeeType === "Employee"
  );
  const nonEmployeeList = employees.filter(
    (emp) => emp.employeeType === "Non Employee"
  );
  console.log(employeeList, nonEmployeeList);
  return (
    <div className="w-full container mx-auto mt-12">
      {/* s;ider for nonEmployeeList in mobile */}
      <div className="md:hidden lg:hidden ">
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >
          {nonEmployeeList.map((employee) => (
            <SwiperSlide key={employee._id} className="flex ">
              <img
                src={employee.employeeImage}
                alt="Non Employee"
                className="rounded-lg shadow-lg w-full p-4"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* nonEmployeeList in pc*/}
      <div className="hidden lg:grid gap-8 grid-cols-3 p-2">
        {nonEmployeeList?.map((employee) => (
          <div key={employee._id} className="relative group">
            <img src={employee.employeeImage} alt={employee.employeeType} />
          </div>
        ))}
      </div>
      {/* regular employee */}
      <div className="flex justify-center">

      <p className="text-center rounded-full pb-3 px-4 mb-12 my-6 font-bold text-3xl bg-primaryColor text-white p-2 inline-block">
        Holistic Agro Employees
      </p>
      </div>

      {/* Display Employees */}
      <div className="grid gap-8 grid-cols-2 lg:grid-cols-3 p-2">
        {employeeList?.map((employee) => (
          <div key={employee._id} className="relative group">
            <img src={employee.employeeImage} alt={employee.employeeType} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
