// import "react-phone-number-input/style.css";

// import PhoneInput from "react-phone-number-input";
// import { Helmet } from "react-helmet-async";
// import { useEffect, useState } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import { isValidPhoneNumber } from "react-phone-number-input";

// const Login = () => {
//   const { auth } = useAuth();
//   const [phone, setPhone] = useState("");
//   const [user, setUser] = useState(null);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const [isSending, setIsSending] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const axiosPublic = useAxiosPublic();

//   const name = "";
//   const email = "";
//   const role = "user";
//   const cart = [];

//   const userData = { phone, name, email, role, cart };

//   const validatePhoneNumber = () => {
//     if (!phone) {
//       setErrorMessage("Phone number is required");
//       return false;
//     }
//     if (!isValidPhoneNumber(phone)) {
//       setErrorMessage("Invalid phone number");
//       return false;
//     }
//     setErrorMessage("");
//     return true;
//   };

//   const sendOtp = async () => {
//     if (!validatePhoneNumber()) return;
//     setIsSending(true);
//     try {
//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
//       const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
//       setUser(confirmation);
//     } catch (error) {
//       setErrorMessage(error.message);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (otp.length !== 6) {
//       setErrorMessage("OTP must be 6 digits");
//       return;
//     }

//     setIsVerifying(true);
//     try {
//       const data = await user.confirm(otp);
//       if (data) {
//         await axiosPublic.post("/user", userData);
//         Swal.fire({
//           title: "লগইন সফল হয়েছে!!",
//           icon: "success",
//           draggable: true,
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         navigate("/");
//       }
//     } catch (err) {
//       setErrorMessage("Invalid OTP. Please try again.");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   useEffect(() => {
//     // Create style element
//     const style = document.createElement("style");
//     style.textContent = `
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateX(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 0.3s ease-out;
//         }
//       `;

//     // Add to document head
//     document.head.appendChild(style);

//     // Cleanup on unmount
//     return () => document.head.removeChild(style);
//   }, []);

//   return (
//     <div>

//       <div className=" my-16 flex justify-center items-center w-full">
//         {/* ... helmet ... */}
//         <Helmet>
//           <title>Login - Holistic Agro</title>
//         </Helmet>
//         <h2></h2>
//         <div className="border p-6 shadow-2xl rounded-xl max-w-sm transition-all duration-300">
//           {/* Logo and Title */}
//           <div className="flex flex-col items-center pb-3 gap-4">
//             <img
//               className="w-2/6"
//               src="https://i.ibb.co.com/D7fgpMQ/logo-removebg-preview.png"
//               alt="Holistic Agro Logo"
//             />
//             <h2 className="text-xl">লগ ইন</h2>
//             <p className="text-center  text-gray-600">
//               {!user
//                 ? "আপনার ফোন নম্বরটি লিখুন"
//                 : "আপনার ফোনে পাঠানো কোডটি লিখুন।"}
//             </p>
//           </div>

//           {/* Error Message */}
//           {errorMessage && (
//             <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
//               {errorMessage}
//             </div>
//           )}

//           <div className="flex flex-col gap-4">
//             {!user ? (
//               <div className="space-y-4">
//                 <PhoneInput
//                   className={`input input-bordered w-full ${
//                     errorMessage ? "border-red-500" : ""
//                   }`}
//                   placeholder="Enter phone number"
//                   international
//                   countryCallingCodeEditable={false}
//                   defaultCountry="BD"
//                   value={phone}
//                   onChange={setPhone}
//                 />
//                 <button
//                   onClick={sendOtp}
//                   disabled={isSending}
//                   className="btn bg-primaryColor text-white w-full relative"
//                 >
//                   {isSending ? (
//                     <>
//                       <span className="invisible">Send OTP</span>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       </div>
//                     </>
//                   ) : (
//                     "কোড পাঠান"
//                   )}
//                 </button>
//                 <div className=" flex justify-center">
//                   <div id="recaptcha" className="mx-auto "></div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4 animate-fade-in-up">
//                 <div className="flex flex-col gap-2">
//                   <input
//                     onChange={(e) => {
//                       setOtp(e.target.value);
//                       setErrorMessage("");
//                     }}
//                     type="text"
//                     placeholder="৬-সংখ্যার কোডটি লিখুন"
//                     className="input input-bordered w-full text-center text-lg"
//                     maxLength="6"
//                   />
//                   <button
//                     onClick={verifyOtp}
//                     disabled={isVerifying}
//                     className="btn bg-primaryColor text-white w-full relative"
//                   >
//                     {isVerifying ? (
//                       <>
//                         <span className="invisible">Verify OTP</span>
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         </div>
//                       </>
//                     ) : (
//                       "কোডটি যাচাই করুন"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <h2 className="text-center mt-3 text-2xl ">
//         লগইন করতে কোন সমস্যা হলে পেজটি রিফ্রেস করুন অথবা এই নাম্বারে যোগাযোগ
//         করুন - 01780071268
//       </h2>
//     </div>
//   );
// };

// export default Login;

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useRef } from "react";
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
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false);

  // Use a ref to track if reCAPTCHA is initialized
  const recaptchaVerifierRef = useRef(null);
  const recaptchaContainerRef = useRef(null);

  const axiosPublic = useAxiosPublic();

  const name = "";
  const email = "";
  const role = "user";
  const cart = [];

  const userData = { phone, name, email, role, cart };

  // Initialize reCAPTCHA once when component mounts
  useEffect(() => {
    if (!recaptchaVerifierRef.current && auth && isPhoneValid) {
      try {
        // Show loading spinner
        setIsRecaptchaLoading(true);

        // Clear any existing recaptcha instances
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }

        // Reset verification state when recreating reCAPTCHA
        setIsRecaptchaVerified(false);

        // Create new recaptcha instance
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          recaptchaContainerRef.current,
          {
            size: "normal",
            callback: () => {
              console.log("reCAPTCHA solved");
              setIsRecaptchaVerified(true);
            },
            "expired-callback": () => {
              setErrorMessage("reCAPTCHA expired. Please refresh the page.");
              setIsRecaptchaVerified(false);
              recaptchaVerifierRef.current = null;
            },
          }
        );

        // Render the reCAPTCHA
        recaptchaVerifierRef.current
          .render()
          .then(() => {
            // Hide loading spinner after a minimum display time of 2 seconds
            setTimeout(() => {
              setIsRecaptchaLoading(false);
            }, 1500);
          })
          .catch((error) => {
            console.error("reCAPTCHA render error:", error);
            setIsRecaptchaLoading(false);
            setErrorMessage(`reCAPTCHA render error: ${error.message}`);
          });
      } catch (error) {
        console.error("reCAPTCHA initialization error:", error);
        setIsRecaptchaLoading(false);
        setErrorMessage(`reCAPTCHA error: ${error.message}`);
      }
    }

    return () => {
      // Clean up reCAPTCHA when component unmounts or phone changes
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        } catch (error) {
          console.error("Error clearing reCAPTCHA:", error);
        }
      }
    };
  }, [auth, isPhoneValid]);

  const validatePhoneNumber = (value) => {
    const valid = value && isValidPhoneNumber(value);
    setIsPhoneValid(valid);
    return valid;
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setErrorMessage("");
    validatePhoneNumber(value);

    // Clear reCAPTCHA if phone number changes
    if (recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
        setIsRecaptchaVerified(false);
      } catch (error) {
        console.error("Error clearing reCAPTCHA:", error);
      }
    }
  };

  const sendOtp = async () => {
    if (!validatePhoneNumber(phone)) {
      setErrorMessage("Invalid phone number");
      return;
    }

    // Check if reCAPTCHA is initialized and verified
    if (!recaptchaVerifierRef.current || !isRecaptchaVerified) {
      setErrorMessage("Please complete the reCAPTCHA verification");
      return;
    }

    setIsSending(true);
    try {
      // Format the phone number properly
      const formattedPhone = phone.trim();

      // Send OTP
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifierRef.current
      );
      setUser(confirmation);
      setErrorMessage("");
    } catch (error) {
      console.error("Send OTP error:", error);

      // Provide more specific error messages
      if (error.code === "auth/invalid-phone-number") {
        setErrorMessage(
          "Invalid phone number format. Please check and try again."
        );
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage("Too many requests. Please try again later.");
      } else if (error.code === "auth/quota-exceeded") {
        setErrorMessage("SMS quota exceeded. Please try again later.");
      } else {
        setErrorMessage(
          `Error: ${error.message || error.code || "Unknown error"}`
        );
      }

      // Reset reCAPTCHA on error
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
          setIsRecaptchaVerified(false);
          setIsPhoneValid(false); // Reset to trigger reCAPTCHA re-render
          setTimeout(() => setIsPhoneValid(true), 100);
        } catch (e) {
          console.error("Error clearing reCAPTCHA:", e);
        }
      }
    } finally {
      setIsSending(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMessage("OTP must be 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      const data = await user.confirm(otp);
      if (data) {
        // Post user data to server
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
      console.error("OTP verification error:", err);

      if (err.code === "auth/invalid-verification-code") {
        setErrorMessage("Invalid OTP. Please check and try again.");
      } else if (err.code === "auth/code-expired") {
        setErrorMessage("OTP has expired. Please request a new one.");
      } else {
        setErrorMessage(`Error: ${err.message || err.code || "Unknown error"}`);
      }
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
      <div className="my-16 flex justify-center items-center w-full">
        <Helmet>
          <title>Login - Holistic Agro</title>
        </Helmet>

        <div className="border p-6 shadow-2xl rounded-xl max-w-sm transition-all duration-300">
          {/* Logo and Title */}
          <div className="flex flex-col items-center pb-3 gap-4">
            <img
              className="w-2/6"
              src="https://i.ibb.co.com/D7fgpMQ/logo-removebg-preview.png"
              alt="Holistic Agro Logo"
            />
            <h2 className="text-xl">লগ ইন</h2>
            <p className="text-center text-gray-600">
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
                {/* Step 1: Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ১. ফোন নম্বর
                  </label>
                  <PhoneInput
                    className={`input input-bordered w-full ${
                      errorMessage && errorMessage.includes("phone")
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Enter phone number"
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="BD"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  {isPhoneValid && (
                    <div className="text-green-600 text-xs mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      ফোন নম্বর সঠিক আছে
                    </div>
                  )}
                </div>

                {/* Step 2: reCAPTCHA (only shown if phone is valid) */}
                {isPhoneValid && (
                  <div className="animate-fade-in-up">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ২. সিকিউরিটি ভেরিফিকেশন
                    </label>
                    <div className="flex justify-center border p-2 rounded-md">
                      {isRecaptchaLoading ? (
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryColor"></div>
                          <p className="text-sm text-gray-500 mt-2">
                            লোড হচ্ছে...
                          </p>
                        </div>
                      ) : (
                        <div
                          ref={recaptchaContainerRef}
                          id="recaptcha"
                          className="mx-auto"
                        ></div>
                      )}
                    </div>
                    {isRecaptchaVerified && (
                      <div className="text-green-600 text-xs mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 inline mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        রিক্যাপচা সম্পন্ন হয়েছে
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Send OTP Button (only shown if phone is valid AND recaptcha is verified) */}
                {isPhoneValid && isRecaptchaVerified && (
                  <button
                    onClick={sendOtp}
                    disabled={isSending}
                    className="btn bg-primaryColor text-white w-full relative animate-fade-in-up"
                  >
                    {isSending ? (
                      <>
                        <span className="invisible">Send OTP</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        </div>
                      </>
                    ) : (
                      "৩. কোড পাঠান"
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex flex-col gap-2">
                  <input
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setOtp(value);
                      setErrorMessage("");
                    }}
                    type="text"
                    value={otp}
                    placeholder="৬-সংখ্যার কোডটি লিখুন"
                    className="input input-bordered w-full text-center text-lg"
                    maxLength="6"
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={isVerifying || otp.length !== 6}
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
      <h2 className="text-center mt-3 text-2xl">
        লগইন করতে কোন সমস্যা হলে পেজটি রিফ্রেস করুন অথবা এই নাম্বারে যোগাযোগ
        করুন - 01780071268
      </h2>
    </div>
  );
};

export default Login;
