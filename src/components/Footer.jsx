import { Link } from "react-router-dom";
import { FaFacebook, FaHeart } from "react-icons/fa6";
const Footer = () => {
  const handleScrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  return (
    <div className=" bg-primaryColor text-white  pt-6 mt-5 pb-1 px-3 border ">
      <footer className="footer container mx-auto relative">
        <aside className="flex items-center justify-between w-full ">
          <div>

          <img
            className="w-16"
            src="https://i.ibb.co.com/D7fgpMQ/logo-removebg-preview.png"
            alt=""
          />
          <p>
            Holistic Agro
            <br />
            Providing reliable agro services
          </p>
          </div>
          <a className="lg:hidden  hover:scale-110 transition-transform duration-300" href="https://www.facebook.com/profile.php?id=100088410444444" target="_blank">
            <FaFacebook className="text-4xl"/>
          </a>
        </aside>
        <nav className="font-bold">
          <Link onClick={handleScrollToTop} to="/about-us">
            {" "}
            About Us{" "}
          </Link>
          <Link onClick={handleScrollToTop} to="/return-policy">
            {" "}
            রিটার্ন পলিসি{" "}
          </Link>
          <Link onClick={handleScrollToTop} to="/refund-policy">
            {" "}
            রিফান্ড পলিসি{" "}
          </Link>
        </nav>
        <nav className="font-bold">
          <Link to="/career" onClick={handleScrollToTop}>
            Career in Holistic Agro
          </Link>
          <Link to="/employees" onClick={handleScrollToTop}>
            Holistic Agro Employees
          </Link>

          <Link to="/problem-and-solutions" onClick={handleScrollToTop}>
          মাছ ও পানির সমস্যা ও সমাধান
          </Link>
        </nav>
        <a 
      href="https://www.facebook.com/profile.php?id=100088410444444" 
      target="_blank"
      className="hidden lg:flex absolute -bottom-10 left-3  hover:scale-110 transition-transform duration-300 "
      rel="noreferrer"
    >
      <FaFacebook className="text-4xl " />
    </a>
      </footer>
      <div className="flex justify-center mt-10 text-sm text-[#FFFFFF] hover:opacity-90 ">
        <a
          className="flex justify-center items-center"
          target="_blank"
          href="https://jobayerahmed.surge.sh"
        >
          Made with <FaHeart className="mx-1 text-xs" /> by{" "}
          <span className="hover:underline ml-1"> Jobayer Ahmed</span>{" "}
        </a>
      </div>
    </div>
  );
};

export default Footer;
