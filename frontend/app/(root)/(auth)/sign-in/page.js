"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

const SignInpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.error);
    }
  };

  return (
    <div className="min-h-screen select-none flex items-center justify-center bg-black relative overflow-hidden">
      {/* <FloatNav /> */}
      <motion.div
        className="w-full max-w-lg mt-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)] text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-8 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sign In
        </motion.h1>

        <form
          className="flex flex-col gap-6"
          onSubmit={handleSignIn}
          autoComplete="off"
        >
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="rounded-xl px-4 py-3 bg-transparent placeholder-white/70 text-white border border-white/30 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-300"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="rounded-xl px-4 py-3 bg-transparent placeholder-white/70 text-white border border-white/30 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-300"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="bg-[#7C3AED] hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] border border-black text-white font-semibold py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 flex justify-center items-center"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
          >
            {loading ? <Image src={"/gaerSpinner.svg"} width={20} height={20} alt="gear"/> : "Sign In"}
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Separator className="my-4 bg-white/20" />
          </motion.div>

          <motion.div
            className="flex justify-center text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              Don’t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#7C3AED] hover:text-[#9F7AEA] transition-colors duration-300 underline-offset-2 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInpage;
