"use client"; // Ensure it's a client-side component

import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim"; // Using slim version for better performance

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    // console.log("Particles initialized");
    await loadSlim(engine); // Loads the slim preset
  }, []);

  return (
    <Particles
      className="absolute inset-0 -z-10"
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true }, // Ensures particles cover the whole screen
        background: {
          color: "#000", // Background color
        },
        particles: {
          number: {
            value: 100, // Number of particles
            density: { enable: true, value_area: 800 },
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 1,
            random: true,
          },
          move: {
            enable: true,
            speed: 2.5,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out", // Ensures particles move out of bounds smoothly
          },
        },
        interactivity: {
          events: {
            onHover: { enable: false, mode: "grab" },
            onClick: { enable: false, mode: "repulse" },
          },
          modes: {
            grab: { distance: 200, duration: 0.4 },
          },
        },
      }}
    />
  );
}
