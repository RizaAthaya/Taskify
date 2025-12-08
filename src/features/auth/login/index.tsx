import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import GoogleForm from "../components/google/GoogleForm";

const Login = () => {
  const navigate = useNavigate();
  const [rightLoaded, setRightLoaded] = useState(false);
  const [leftLoaded, setLeftLoaded] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left side */}
      <div className="lg:w-1/2 items-center justify-center flex-col text-purple-800 gap-14 py-10 px-32 bg-white hidden lg:flex relative">
        {/* placeholder */}
        {!leftLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse z-0"></div>}

        <div
          className={`flex flex-col gap-5 transition-opacity duration-700 z-10 ${leftLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <h1 className="font-bold text-4xl">Welcome to Taskify! 👋</h1>
          <p className="text-left text-lg">
            A simple and efficient task management platform designed to help you organize, track,
            and complete your daily activities. Perfect for staying productive and keeping your work
            on schedule.
          </p>
        </div>

        {/* Image with fade-in */}
        <img
          src="/src/assets/todos.svg"
          alt="Todos illustration"
          className={`max-w-md xl:max-w-lg transition-opacity duration-700 z-10 ${leftLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLeftLoaded(true)}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Right side */}
      <div className="w-full h-full lg:w-1/2 flex items-center justify-center relative overflow-hidden bg-purple-800">
        {/* Background Image */}
        <img
          src="/src/assets/work.jpg"
          alt="Work background"
          loading="eager"
          fetchPriority="high"
          onLoad={() => setRightLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out delay-150 ${
            rightLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-purple-800 backdrop-blur-sm transition-opacity duration-200"
          style={{ opacity: rightLoaded ? 0.5 : 0 }}
        ></div>

        {/* Form Box */}
        <div className="relative w-[calc(100%-36px)] lg:w-full max-w-md bg-white p-6 lg:p-8 rounded-lg shadow-lg z-10">
          <LoginForm />

          {/* Line */}
          <div className="flex items-center my-4">
            <div className="grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <div className="flex justify-center mt-4">
            <GoogleForm />
          </div>

          {/* to register */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Have no account yet?{" "}
              <button
                onClick={() => navigate("/auth/register")}
                className="text-purple-600 hover:underline cursor-pointer"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
