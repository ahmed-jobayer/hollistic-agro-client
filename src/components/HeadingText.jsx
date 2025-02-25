import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeadingText = () => {
  const [shake, setShake] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-primaryColor p-3 text-center text-white">
      <div className="flex flex-col lg:flex-row items-center justify-center ">
        <span className="mr-2">আমাদের যে কোন পণ্য অর্ডার করতে কল বা </span>
        <span className="mr-2">
          WhatsApp করুন: <a href="tel:+8801733326363">+8801733326363</a>
        </span>
      </div>
      <button className={`hover:underline ${shake ? "animate-shake" : ""} bg-white text-primaryColor p-2 rounded-md mt-2 text-sm lg:text-base`}>
        <Link to="/problem-and-solutions">মাছ ও পানির সমস্যা ও সমাধান করতে এখানে ক্লিক করুন</Link>
      </button>
    </div>
  );
};

export default HeadingText;
