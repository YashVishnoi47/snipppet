"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    FirstName: "",
    LastName: "",
    aboutUser: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch("api/auth/signUp", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/sign-in");
    } else {
      const { message } = await res.json();
      alert(message);
    }
  };

  return (
    // <div className="w-full h-screen gap-4 flex flex-col justify-center items-center border-2 border-red-600">
    //   <h1 className="text-3xl font-bold">Sign Up</h1>
    //   <form
    //     className="flex flex-col w-[35%] rounded-2xl  border-black h-[80%] border-2 gap-5 justify-center items-center"
    //     onSubmit={handleSignUp}
    //   >
    //     <input
    //       type="text"
    //       placeholder="UserName"
    //       onChange={(e) =>
    //         setFormData({ ...formData, userName: e.target.value })
    //       }
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       onChange={(e) =>
    //         setFormData({ ...formData, password: e.target.value })
    //       }
    //     />
    //     <input
    //       type="text"
    //       placeholder="FirstName"
    //       onChange={(e) =>
    //         setFormData({ ...formData, FirstName: e.target.value })
    //       }
    //     />
    //     <input
    //       type="text"
    //       placeholder="LastName"
    //       onChange={(e) =>
    //         setFormData({ ...formData, LastName: e.target.value })
    //       }
    //     />
    //     <input
    //       type="text"
    //       placeholder="aboutUser"
    //       onChange={(e) =>
    //         setFormData({ ...formData, aboutUser: e.target.value })
    //       }
    //     />
    //     <button type="submit">Signup</button>
    //   </form>
    // </div>

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-8">
      <motion.div
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Create Account
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
          {[
            { label: "Username", type: "text", key: "userName" },
            { label: "Email", type: "email", key: "email" },
            { label: "Password", type: "password", key: "password" },
            { label: "First Name", type: "text", key: "firstName" },
            { label: "Last Name", type: "text", key: "lastName" },
          ].map(({ label, type, key }) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                className="rounded-lg px-4 py-2 bg-white/20 backdrop-blur-md placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 border border-white/30 transition-all duration-300"
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                required={["userName", "email", "password"].includes(key)}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">About You</label>
            <textarea
              className="rounded-lg px-4 py-2 bg-white/20 backdrop-blur-md placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 border border-white/30 transition-all duration-300 resize-none h-28"
              value={formData.aboutUser}
              onChange={(e) =>
                setFormData({ ...formData, aboutUser: e.target.value })
              }
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition duration-300 font-semibold py-3 rounded-xl mt-2"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
