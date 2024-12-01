import React, { useReducer, useState } from "react";
import logo from "../assets/images/logo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [onLogin, setLogin] = useState(false);
  const [obscured, setObscured] = useState(true);
  //   const [onReset, setOnReset] = useState(false);
  //   const [sent, setSent] = useState(false);
  //   const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();

  const [form, updateForm] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      email: "",
      password: "",
      error: "",
    }
  );

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLogin(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (e) {
      console.log(e);
      setLogin(false);
      updateForm({ error: "Invalid email or password." });
    }
  };

  return (
    <div className="w-full h-screen flex flex-row font-inter text-[#F2F2F2]">
      <div className="w-[40%] bg-[#296441F5]/95 flex flex-col items-end justify-center">
        <img src={logo} className="w-[400px] mr-[-90px]" />
      </div>
      <div className="w-[60%] h-full flex flex-col items-center gap-8 py-10 justify-center">
        <h1 className="font-inter-bold italic text-3xl w-60 text-center">
          Smart Solid Waste Collection
        </h1>
        <div className="w-[400px] h-[400px] ">
          <form
            onSubmit={handleSignIn}
            className="flex flex-col z-10 w-full py-4"
          >
            <label className="py-2 text-lg font-inter-bold">
              Email Address
            </label>
            <input
              type="text"
              value={form.email}
              className="px-4 border font-inter-bold text-[#1F2F3D] h-14 rounded-xl bg-[#F2F2F2] focus:outline-none"
              name="username"
              pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?"
              title="Please enter a valid email"
              required={true}
              onChange={(e) => {
                updateForm({ email: e.target.value });
              }}
            />
            <label className="pt-2 py-2 text-lg font-inter-bold">
              Password
            </label>
            <div className="px-4 bg-[#F2F2F2] h-14 rounded-xl w-full flex flex-row items-center">
              <input
                type={obscured ? "password" : "text"}
                value={form.password}
                className=" border text-[#1F2F3D] font-inter-bold h-full flex-1 bg-transparent border-none rounded-l-xl focus:outline-none"
                name="username"
                required={true}
                onChange={(e) => {
                  updateForm({ password: e.target.value });
                }}
              />
              {obscured ? (
                <EyeIcon
                  onClick={() => {
                    setObscured(false);
                  }}
                  className="text-slate-400 w-6 h-6 cursor-pointer"
                />
              ) : (
                <EyeSlashIcon
                  onClick={() => {
                    setObscured(true);
                  }}
                  className="text-slate-400 w-6 h-6 cursor-pointer"
                />
              )}
            </div>

            <button
              disabled={onLogin}
              type="submit"
              className="mt-8 flex w-full h-14 bg-[#19AF0C] rounded-xl justify-center items-center"
            >
              {onLogin ? (
                <div className="flex flex-row items-center gap-4 text-white ">
                  <CircularProgress size="18px" color="inherit" />
                  <p className="text-sm">Logging in, please wait...</p>
                </div>
              ) : (
                <p className="text-lg font-inter-bold">Login</p>
              )}
            </button>
            <p
              className={`${
                form.error ? "opacity-100" : "opacity-0"
              } p-2 h-4 text-xs font-bold text-[#E8090C]`}
            >
              {form.error}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
