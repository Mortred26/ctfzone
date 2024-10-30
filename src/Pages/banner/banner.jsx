import React, { useEffect, useRef } from "react";

const MatrixRainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Function to set the canvas dimensions
    const setCanvasSize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      return { W, H };
    };

    const { W, H } = setCanvasSize();

    const fontSize = Math.min(28, W / 20); // Adjust font size based on screen width
    const columns = Math.floor(W / fontSize);
    const drops = Array(columns).fill(0); // Initialize drops array with zeros
    const str = "JavaScript Hacking Effect";

    function draw() {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, W, H);
      context.font = `${fontSize}px monospace`; // Set font size
      context.fillStyle = "#00cc33";

      for (let i = 0; i < columns; i++) {
        const index = Math.floor(Math.random() * str.length);
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Reset the drop position if it goes off screen
        if (y >= H && Math.random() > 0.99) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }

        context.fillText(str[index], x, y);
      }
    }

    const interval = setInterval(draw, 35);

    // Resize event handler
    const handleResize = () => {
      const { W, H } = setCanvasSize();
      // Recalculate font size and columns on resize
      const newFontSize = Math.min(28, W / 20);
      const newColumns = Math.floor(W / newFontSize);

      // Adjust drops array size
      drops.length = newColumns;
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
          drops[i] = 0; // Initialize new drops
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
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
        width: "100%", // Use viewport width for full coverage
        height: "100%", // Use viewport height for full coverage
        zIndex: -1,
      }}
    />
  );
};

export default MatrixRainEffect;
