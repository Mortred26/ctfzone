import React, { useEffect, useRef } from "react";

const MatrixRainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    const fontSize = 16;
    const columns = Math.floor(W / fontSize);
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops.push(0);
    }
    const str = "JavaScript Hacking Effect";

    function draw() {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, W, H);
      context.font = "1000 " + fontSize + "px monospace";
      context.fillStyle = "#00cc33";

      for (let i = 0; i < columns; i++) {
        const index = Math.floor(Math.random() * str.length);
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        context.fillText(str[index], x, y);

        if (y >= canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: "#111",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Make sure it's behind other content
      }}
    />
  );
};

export default MatrixRainEffect;
