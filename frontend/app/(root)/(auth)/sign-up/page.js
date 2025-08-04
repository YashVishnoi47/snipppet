"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertOffsetToTimes, motion } from "framer-motion";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    FirstName: "",
    LastName: "",
    aboutUser: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignIn = async ({ email }) => {
    const res = await signIn("credentials", {
      email,
      password: formData.password,
      redirect: false,
    });

    // const data = await res.json();

    if (res.ok) {
      router.push("/userProfile");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("data.error");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("api/auth/signUp", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data)

    if (res.ok) {
      if (data.user) {
        handleSignIn({ email: data.user.email });
      }
    } else {
      setLoading(false);
      const message = data.message;
      toast.error(message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4 select-none">
      {/* <FloatNav /> */}
      <motion.div
        className="w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-10 py-12 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-8 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sign Up
        </motion.h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onSubmit={handleSignUp}
        >
          {[
            { name: "userName", type: "text", placeholder: "Username" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "password", type: "password", placeholder: "Password" },
            { name: "FirstName", type: "text", placeholder: "First Name" },
            { name: "LastName", type: "text", placeholder: "Last Name" },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <label htmlFor={field.name} className="text-sm font-medium mb-1">
                {field.placeholder}
              </label>
              <input
                id={field.name}
                type={field.type}
                required
                placeholder={field.placeholder}
                className="rounded-lg px-4 py-2 bg-transparent placeholder-white/70 text-white border border-white/30 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/30 transition-all duration-200"
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
              />
            </motion.div>
          ))}

          {/* About You - Larger but not oversized */}
          <motion.div
            className="col-span-full flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label htmlFor="aboutUser" className="text-sm font-medium mb-1">
              About You
            </label>
            <textarea
              id="aboutUser"
              rows={4}
              required
              placeholder="Tell us a little about yourself..."
              className="rounded-lg px-4 py-2 bg-transparent placeholder-white/70 text-white border border-white/30 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/30 transition-all duration-200 resize-none"
              onChange={(e) =>
                setFormData({ ...formData, aboutUser: e.target.value })
              }
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="col-span-full mt-2 bg-[#7C3AED] hover:bg-[#7C3AED]/20 hover:border-[#7C3AED] border border-black text-white font-semibold py-2.5 rounded-xl transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 cursor-pointer"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
          >
            {loading ? (
              <Image
                src={"/gaerSpinner.svg"}
                width={20}
                height={20}
                alt="gear"
              />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        <Separator className="my-5 bg-white/20" />

        <motion.div
          className="text-center text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#7C3AED] hover:text-[#9F7AEA] transition-colors duration-300 underline-offset-2 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
