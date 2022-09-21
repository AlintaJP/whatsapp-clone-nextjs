import React from "react";
import { Circle } from "better-react-spinkit";
import Image from "next/image";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Image
          src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
          alt="whatsapp logo"
          style={{ marginBottom: 10 }}
          height={200}
          width={200}
          layout="fixed"
        />
        <Circle color="#3CBC28" size={60} />
      </div>
    </div>
  );
};

export default Loading;
