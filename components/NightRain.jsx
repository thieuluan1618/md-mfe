"use client";

import Rain from "react-rain-animation";
import MoonNight from "./MoonNight";

const NightRain = () => {
  return (
    <>
      {/* Night sky background */}
      <MoonNight />

      {/* Rain overlay with darker droplets for night */}
      <div style={{ filter: 'brightness(0.7)' }}>
        <Rain numDrops={100} />
      </div>
    </>
  );
};

export default NightRain;
