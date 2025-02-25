import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { isValidPhoneNumber } from "react-phone-number-input";

const Login = () => {
  const { auth } = useAuth();
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const axiosPublic = useAxiosPublic();

  const name = "";
  const email = "";
  const role = "user";
  const cart = [];

  const userData = { phone, name, email, role, cart };



  const validatePhoneNumber = () => {
    if (!phone) {
      setErrorMessage("Phone number is required");
      return false;
    }
    if (!isValidPhoneNumber(phone)) {
      setErrorMessage("Invalid phone number");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const sendOtp = async () => {
    if (!validatePhoneNumber()) return;
    setIsSending(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSending(false);
    }
  };



  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setErrorMessage("OTP must be 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      const data = await user.confirm(otp);
      if (data) {
        await axiosPublic.post("/user", userData);
        Swal.fire({
          title: "লগইন সফল হয়েছে!!",
          icon: "success",
          draggable: true,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    } catch (err) {
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    // Create style element
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `;

    // Add to document head
    document.head.appendChild(style);

    // Cleanup on unmount
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div>

      <div className=" my-16 flex justify-center items-center w-full">
        {/* ... helmet ... */}
        <Helmet>
          <title>Login - Holistic Agro</title>
        </Helmet>
        <h2></h2>
        <div className="border p-6 shadow-2xl rounded-xl max-w-sm transition-all duration-300">
          {/* Logo and Title */}
          <div className="flex flex-col items-center pb-3 gap-4">
            <img
              className="w-2/6"
              src="https://i.ibb.co.com/D7fgpMQ/logo-removebg-preview.png"
              alt="Holistic Agro Logo"
            />
            <h2 className="text-xl">লগ ইন</h2>
            <p className="text-center  text-gray-600">
              {!user
                ? "আপনার ফোন নম্বরটি লিখুন"
                : "আপনার ফোনে পাঠানো কোডটি লিখুন।"}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {!user ? (
              <div className="space-y-4">
                <PhoneInput
                  className={`input input-bordered w-full ${
                    errorMessage ? "border-red-500" : ""
                  }`}
                  placeholder="Enter phone number"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="BD"
                  value={phone}
                  onChange={setPhone}
                />
                <button
                  onClick={sendOtp}
                  disabled={isSending}
                  className="btn bg-primaryColor text-white w-full relative"
                >
                  {isSending ? (
                    <>
                      <span className="invisible">Send OTP</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      </div>
                    </>
                  ) : (
                    "কোড পাঠান"
                  )}
                </button>
                <div className=" flex justify-center">
                  <div id="recaptcha" className="mx-auto "></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex flex-col gap-2">
                  <input
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setErrorMessage("");
                    }}
                    type="text"
                    placeholder="৬-সংখ্যার কোডটি লিখুন"
                    className="input input-bordered w-full text-center text-lg"
                    maxLength="6"
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={isVerifying}
                    className="btn bg-primaryColor text-white w-full relative"
                  >
                    {isVerifying ? (
                      <>
                        <span className="invisible">Verify OTP</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        </div>
                      </>
                    ) : (
                      "কোডটি যাচাই করুন"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-center mt-3 text-2xl ">
        লগইন করতে কোন সমস্যা হলে পেজটি রিফ্রেস করুন অথবা এই নাম্বারে যোগাযোগ
        করুন - 01780071268
      </h2>
    </div>
  );
};

export default Login;
