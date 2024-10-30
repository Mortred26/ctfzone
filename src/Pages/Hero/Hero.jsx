import React, { useEffect, useRef } from "react";
import { Container } from "../../Components/Container/Container";
import { HiFlag } from "react-icons/hi2";
import "./style.css";
import { Link } from "react-router-dom";
import { Header } from "../../Components/Header/Header";

export const Hero = () => {
  const canvasRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const banner = bannerRef.current;
    const ctx = canvas.getContext("2d");

    let dots = [];
    const arrayColors = ["#eee"];
    const numDots = 100; // Adjust the number of dots for performance
    const maxDistance = 100;
    const mouseConnectionDistance = 150;
    let animationFrameId;

    function resizeCanvas() {
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;
    }

    resizeCanvas();

    function createDots() {
      dots = [];
      for (let i = 0; i < numDots; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 2,
          color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
          dx: (Math.random() - 0.5) * 0.5, // Adjust speed for smoother animation
          dy: (Math.random() - 0.5) * 0.5,
        });
      }
    }

    createDots();

    const mouse = {
      x: null,
      y: null,
    };

    banner.addEventListener("mousemove", (event) => {
      const rect = banner.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });

    banner.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    function updateDots() {
      dots.forEach((dot) => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > canvas.width) dot.dx = -dot.dx;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy = -dot.dy;
      });
    }

    function drawDots() {
      dots.forEach((dot) => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function connectDots() {
      ctx.beginPath();
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
          }
        }
      }
      ctx.strokeStyle = "rgba(238, 238, 238, 0.5)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function connectDotsToMouse() {
      if (mouse.x === null || mouse.y === null) return;

      ctx.beginPath();
      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseConnectionDistance) {
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
        }
      });
      ctx.strokeStyle = "rgba(238, 238, 238, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateDots();
      drawDots();
      connectDots();
      connectDotsToMouse();
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createDots();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <section className="hero" ref={bannerRef}>
        <canvas id="dotsCanvas" ref={canvasRef}></canvas>
        <Container>
          <div className="hero-box">
            <h1 className="hero-title">Welcome to Cyberchallange</h1>
            <div className="hero-text-wrapper">
              <p className="hero-text">
                Cyberchallange is an educational platform on cybersecurity
                created with the aim of developing cybersecurity in Uzbekistan.
                On this platform, you can test your knowledge and improve your
                cybersecurity skills.
              </p>
              <div className="trigger"></div>
              <div className="trigger"></div>
              <div className="trigger"></div>
            </div>
            <Link className="hero-btn" to="/teams">
              <HiFlag /> Start mission
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};
