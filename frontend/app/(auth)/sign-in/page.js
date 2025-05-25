"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SignInpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-8">
      <motion.div
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Sign In
        </h1>
        <form className="flex flex-col gap-5 h-96" onSubmit={handleSignIn}>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type={"email"}
              className="rounded-lg px-4 py-2 bg-white/20 backdrop-blur-md placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 border border-white/30 transition-all duration-300"
              onChange={(e) => setEmail(e.target.value)}
              // required={["password"].includes(password)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type={"password"}
              className="rounded-lg px-4 py-2 bg-white/20 backdrop-blur-md placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 border border-white/30 transition-all duration-300"
              onChange={(e) => setPassword(e.target.value)}
              // required={["email"].includes(email)}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition duration-300 font-semibold py-3 rounded-xl mt-2"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInpage;
