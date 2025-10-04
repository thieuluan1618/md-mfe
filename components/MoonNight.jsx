"use client";

const MoonNight = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Stars background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat',
          zIndex: 0
        }}
      />

      {/* Twinkling stars */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          width: '10000px',
          right: 0,
          background: 'transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png) repeat',
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
          background: 'transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/clouds_repeat.png) repeat',
          backgroundSize: '1000px 1000px',
          zIndex: 3,
          animation: 'move-background 140s linear infinite'
        }}
      />

      {/* Moon */}
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png"
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
