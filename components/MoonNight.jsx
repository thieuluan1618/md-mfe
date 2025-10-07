"use client";

const MoonNight = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Stars background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'black url(/night-theme/stars.webp) repeat',
          zIndex: 0
        }}
      />

      {/* Twinkling stars */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          width: '10000px',
          right: 0,
          background: 'transparent url(/night-theme/twinkling.webp) repeat',
          backgroundSize: '1000px 1000px',
          zIndex: 2,
          animation: 'move-background 50s linear infinite'
        }}
      />

      {/* Clouds */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          width: '10000px',
          right: 0,
          background: 'transparent url(/night-theme/clouds_repeat.webp) repeat',
          backgroundSize: '1000px 1000px',
          zIndex: 3,
          animation: 'move-background 140s linear infinite'
        }}
      />

      {/* Moon */}
      <img
        src="/night-theme/moon2.webp"
        alt="Moon"
        className="absolute"
        style={{
          height: '35vh',
          width: 'auto',
          right: '20px',
          top: '10px',
          zIndex: 3
        }}
      />
    </div>
  );
};

export default MoonNight;
