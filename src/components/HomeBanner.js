
"use client";

import { useEffect, useRef, useState } from "react";
import { Bebas_Neue, Montserrat } from "next/font/google";

/* ==========================================
   GOOGLE FONTS
========================================== */

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/* ==========================================
   DESTINATIONS
========================================== */

const destinations = [
  { name: "Canada", flag: "🇨🇦", position: "canada" },
  { name: "USA", flag: "🇺🇸", position: "usa" },
  { name: "UK", flag: "🇬🇧", position: "uk" },
  { name: "Ireland", flag: "🇮🇪", position: "ireland" },
  { name: "Australia", flag: "🇦🇺", position: "australia" },
  { name: "New Zealand", flag: "🇳🇿", position: "newzealand" },
  { name: "Malaysia", flag: "🇲🇾", position: "malaysia" },
  { name: "Europe", flag: "🇪🇺", position: "europe" },
  { name: "Japan", flag: "🇯🇵", position: "japan" },
  { name: "Germany", flag: "🇩🇪", position: "germany" },
];

const palette = [
  "#FFD36C",
  "#FF557D",
  "#65E5FF",
  "#B99AFF",
  "#FFFFFF",
  "#FF9C48",
];

const random = (min, max) =>
  min + Math.random() * (max - min);

/* ==========================================
   HOME BANNER COMPONENT
========================================== */

export default function HomeBanner() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const finaleRef = useRef(null);

  const [counter, setCounter] = useState(20);
  const [reached, setReached] = useState(false);

  /* ==========================================
     FIREWORKS AND COUNTER ANIMATION
  ========================================== */

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;

    if (!hero || !canvas) return;

    const ctx = canvas.getContext("2d");

    const motion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let dpr = 1;

    let mobile = false;
    let visible = true;
    let disposed = false;

    let rockets = [];
    let sparks = [];
    let queue = [];

    let animationFrame = 0;
    let counterFrame = 0;

    let lastTime = 0;
    let elapsed = 0;
    let activeUntil = 0;
    let nextLaunch = 0;

    let resizeObserver;
    let visibilityObserver;

    /* ==========================================
       RESPONSIVE CANVAS
    ========================================== */

    function resize() {
      if (!ctx || disposed) return;

      width = hero.clientWidth;
      height = hero.clientHeight;

      mobile = width <= 767;

      dpr = Math.min(
        window.devicePixelRatio || 1,
        mobile ? 1 : 1.5
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    if (ctx) {
      resize();

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(hero);
      } else {
        window.addEventListener("resize", resize);
      }
    }

    /* ==========================================
       GROUND TO SKY ROCKET LAUNCH
    ========================================== */

    function launch(position, grand = false) {
      if (!width || !height) return;

      if (rockets.length >= (mobile ? 4 : 7)) {
        return;
      }

      const x = width * position;

      const target = height * random(
        mobile ? 0.18 : 0.13,
        mobile ? 0.42 : 0.36
      );

      rockets.push({
        x,
        y: height + 4,

        startX: x,
        startY: height + 4,

        target,

        dx: width * random(-0.035, 0.035),

        duration: random(0.85, 1.25),
        age: 0,

        trail: [],

        color: grand
          ? palette[0]
          : palette[
              Math.floor(random(0, palette.length))
            ],

        grand,
      });
    }

    /* ==========================================
       LARGE FIREWORK EXPLOSION
    ========================================== */

    function burst(rocket) {
      const count = mobile
        ? rocket.grand
          ? 65
          : 48
        : rocket.grand
          ? 120
          : 85;

      const cap = mobile ? 320 : 700;

      const explosionScale = mobile ? 1.45 : 1.8;

      const screenScale = Math.min(
        1,
        width / 700 + 0.25
      );

      for (
        let i = 0;
        i < count && sparks.length < cap;
        i++
      ) {
        const angle =
          (i / count) * Math.PI * 2 +
          random(-0.04, 0.04);

        const speed =
          random(45, rocket.grand ? 150 : 115) *
          screenScale *
          explosionScale;

        const life = random(1.1, 1.9);

        sparks.push({
          x: rocket.x,
          y: rocket.y,

          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,

          life,
          max: life,

          color:
            i % 9 === 0
              ? "#FFFFFF"
              : rocket.color,

          size: mobile
            ? random(1, 2)
            : random(1.2, 2.5),
        });
      }
    }

    /* ==========================================
       CLEAR CANVAS
    ========================================== */

    function clear() {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    }

    /* ==========================================
       FIREWORK ANIMATION LOOP
    ========================================== */

    function frame(now) {
      animationFrame = 0;

      if (
        disposed ||
        !visible ||
        document.hidden ||
        motion.matches
      ) {
        lastTime = 0;
        return;
      }

      const dt = lastTime
        ? Math.min((now - lastTime) / 1000, 0.035)
        : 1 / 60;

      lastTime = now;
      elapsed += dt;

      clear();

      /* Scheduled celebration fireworks */

      while (
        queue.length &&
        queue[0].at <= elapsed
      ) {
        const item = queue.shift();
        launch(item.x, true);
      }

      /* Continuous rocket launches */

      if (
        elapsed < activeUntil &&
        elapsed >= nextLaunch
      ) {
        launch(random(0.12, 0.88));

        nextLaunch =
          elapsed +
          (mobile
            ? random(0.8, 1.25)
            : random(0.48, 0.85));
      }

      ctx.globalCompositeOperation = "lighter";

      /* Rocket movement */

      for (
        let i = rockets.length - 1;
        i >= 0;
        i--
      ) {
        const rocket = rockets[i];

        rocket.age += dt;

        const t = Math.min(
          1,
          rocket.age / rocket.duration
        );

        const ease =
          1 - Math.pow(1 - t, 1.45);

        rocket.x =
          rocket.startX + rocket.dx * t;

        rocket.y =
          rocket.startY +
          (rocket.target - rocket.startY) * ease;

        /* Rocket trail */

        rocket.trail.push({
          x: rocket.x,
          y: rocket.y,
          age: elapsed,
        });

        while (
          rocket.trail.length &&
          elapsed - rocket.trail[0].age > 0.24
        ) {
          rocket.trail.shift();
        }

        /* Golden rocket trail */

        for (
          let j = 1;
          j < rocket.trail.length;
          j++
        ) {
          const a = rocket.trail[j - 1];
          const b = rocket.trail[j];

          ctx.globalAlpha =
            (j / rocket.trail.length) * 0.8;

          ctx.strokeStyle = "#FFBE58";

          ctx.lineWidth =
            1 + j / rocket.trail.length;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        /* Bright rocket head */

        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFF5CF";

        ctx.fillRect(
          rocket.x - 1.5,
          rocket.y - 1.5,
          3,
          3
        );

        /* Explode at highest point */

        if (t >= 1) {
          burst(rocket);
          rockets.splice(i, 1);
        }
      }

      /* Large explosion particles */

      let activeParticles = 0;

      for (const particle of sparks) {
        particle.life -= dt;

        if (particle.life <= 0) {
          continue;
        }

        const x = particle.x;
        const y = particle.y;

        const drag = Math.exp(-1.15 * dt);

        particle.vx *= drag;

        particle.vy =
          particle.vy * drag + 65 * dt;

        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        ctx.globalAlpha = Math.min(
          1,
          (particle.life / particle.max) * 1.6
        );

        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size;
        ctx.lineCap = "round";

        ctx.beginPath();

        ctx.moveTo(
          x - particle.vx * 0.065,
          y - particle.vy * 0.065
        );

        ctx.lineTo(
          particle.x,
          particle.y
        );

        ctx.stroke();

        sparks[activeParticles++] = particle;
      }

      sparks.length = activeParticles;

      ctx.globalAlpha = 1;

      ctx.globalCompositeOperation =
        "source-over";

      /* Continue only while active */

      if (
        elapsed < activeUntil ||
        rockets.length ||
        sparks.length ||
        queue.length
      ) {
        animationFrame =
          requestAnimationFrame(frame);
      } else {
        lastTime = 0;
        clear();
      }
    }

    /* ==========================================
       PERFORMANCE MANAGEMENT
    ========================================== */

    function wake() {
      if (
        ctx &&
        !disposed &&
        !animationFrame &&
        visible &&
        !document.hidden &&
        !motion.matches &&
        (
          elapsed < activeUntil ||
          rockets.length ||
          sparks.length ||
          queue.length
        )
      ) {
        lastTime = 0;

        animationFrame =
          requestAnimationFrame(frame);
      }
    }

    function pause() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = 0;
      lastTime = 0;
    }

    /* ==========================================
       START FIREWORKS
    ========================================== */

    function start(seconds) {
      if (!ctx || motion.matches || disposed) {
        return;
      }

      activeUntil = Math.max(
        activeUntil,
        elapsed + seconds
      );

      wake();
    }

    /* ==========================================
       GRAND CELEBRATION FIREWORKS
    ========================================== */

    function finale() {
      if (!ctx || motion.matches || disposed) {
        return;
      }

      queue = [];

      [0.18, 0.5, 0.82].forEach((x, i) => {
        queue.push({
          x,
          at: elapsed + i * 0.18,
        });
      });

      queue.sort((a, b) => a.at - b.at);

      start(5);
    }

    finaleRef.current = finale;

    /* ==========================================
       PAUSE WHEN OUTSIDE VIEWPORT
    ========================================== */

    if ("IntersectionObserver" in window) {
      visibilityObserver =
        new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;

          if (visible) {
            wake();
          } else {
            pause();
          }
        });

      visibilityObserver.observe(hero);
    }

    /* ==========================================
       PAUSE IN INACTIVE BROWSER TAB
    ========================================== */

    function handleVisibility() {
      if (document.hidden) {
        pause();
      } else {
        wake();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    /* ==========================================
       REDUCED MOTION SUPPORT
    ========================================== */

    function handleMotionChange() {
      if (motion.matches) {
        pause();

        cancelAnimationFrame(counterFrame);

        rockets = [];
        sparks = [];
        queue = [];

        activeUntil = elapsed;

        clear();

        setCounter(20);
        setReached(false);
      }
    }

    if (motion.addEventListener) {
      motion.addEventListener(
        "change",
        handleMotionChange
      );
    } else {
      motion.addListener(handleMotionChange);
    }

    /* ==========================================
       20 YEARS COUNTER ANIMATION
    ========================================== */

    const begin = performance.now();

    function count(now) {
      if (disposed || motion.matches) {
        return;
      }

      const t = Math.min(
        1,
        (now - begin) / 1500
      );

      const value = Math.floor(
        20 * (1 - Math.pow(1 - t, 3))
      );

      setCounter(value);

      if (t < 1) {
        counterFrame =
          requestAnimationFrame(count);
      } else {
        setCounter(20);
        setReached(true);

        finale();
      }
    }

    /* Initialize animation */

    if (motion.matches) {
      setCounter(20);
    } else {
      setCounter(0);
      setReached(false);

      counterFrame =
        requestAnimationFrame(count);

      /* Fireworks run for 60 seconds */

      start(60);
    }

    /* ==========================================
       REACT CLEANUP
    ========================================== */

    return () => {
      disposed = true;

      pause();

      cancelAnimationFrame(counterFrame);

      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();

      window.removeEventListener(
        "resize",
        resize
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      if (motion.removeEventListener) {
        motion.removeEventListener(
          "change",
          handleMotionChange
        );
      } else {
        motion.removeListener(
          handleMotionChange
        );
      }

      rockets = [];
      sparks = [];
      queue = [];

      finaleRef.current = null;

      clear();
    };
  }, []);

  /* ==========================================
     CELEBRATION BUTTON
  ========================================== */

  const handleCelebration = () => {
    finaleRef.current?.();
  };

  /* ==========================================
     COMPONENT HTML / JSX
  ========================================== */

  return (
    <>
      <section
        ref={heroRef}
        id="study-anniversary-hero"
        className={montserrat.className}
      >
        {/* FIREWORKS CANVAS */}

        <canvas
          ref={canvasRef}
          className="anniversary-fireworks"
          aria-hidden="true"
        />

        {/* BACKGROUND GLOW */}

        <div
          className="hero-glow"
          aria-hidden="true"
        />

        {/* HERO CONTENT */}

        <div className="hero-content">
          <div className="hero-left">
            <h1
              className={`hero-title ${bebasNeue.className}`}
            >
              YOUR STUDY ABROAD DREAM
              <br />
              IS OUR ONLY PRIORITY
            </h1>

            <p className="hero-description">
              Get personalized expert guidance - from
              shortlisting institutions to getting your
              student visa approved. We&apos;ve got
              your back!
            </p>

            <a
              href="https://celebration.pfecglobal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
            >
              Book Free Consultation
              <span aria-hidden="true">➜</span>
            </a>
          </div>

          {/* 20 YEARS ANNIVERSARY */}

          <div className="anniversary">
            <div className="anniversary-logo">
              <img
                src="https://pfecglobal.in/wp-content/uploads/2026/11/fether2.png"
                className="anniversary-feather left-feather"
                alt=""
                decoding="async"
              />

              <div
                className="anniversary-number-area"
                aria-label="20 years"
              >
                <div
                  className={`anniversary-number ${
                    reached ? "reached" : ""
                  }`}
                  aria-hidden="true"
                >
                  <span>{counter}</span>
                </div>

                <div
                  className="anniversary-years"
                  aria-hidden="true"
                >
                  YEARS
                </div>
              </div>

              <img
                src="https://pfecglobal.in/wp-content/uploads/2026/11/fether1.png"
                className="anniversary-feather right-feather"
                alt=""
                decoding="async"
              />
            </div>

            <button
              type="button"
              onClick={handleCelebration}
              className="anniversary-button"
            >
              Watch the Celebration
            </button>
          </div>
        </div>

        {/* VISUAL STAGE */}

        <div className="hero-visual-stage">

          {/* MOVING PFEC BACKGROUND STRIP */}

          <div
            className="stripe-band"
            aria-hidden="true"
          >
            <div className="stripe-track">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  className="stripe-group"
                >
                  {Array.from(
                    { length: 20 },
                    (_, index) => (
                      <div
                        key={index}
                        className="stripe"
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DESTINATION LABELS */}

          <div className="destination-labels">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                className={`destination ${destination.position}`}
              >
                <span aria-hidden="true">
                  {destination.flag}
                </span>

                {destination.name}
              </div>
            ))}
          </div>

          {/* MAIN GRADUATE IMAGE */}

          <div className="hero-main-image">
            <img
              src="https://pfecglobal.in/wp-content/uploads/2026/11/image-861.webp"
              alt="Study abroad graduate and international landmarks"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* BOTTOM SHADOW */}

          <div
            className="hero-bottom-shadow"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ==========================================
          COMPLETE COMPONENT CSS
      ========================================== */}

      <style jsx global>{`

        /* ==========================================
           MAIN HERO CONTAINER
        ========================================== */

        #study-anniversary-hero {
          position: relative;
          width: 100%;
          max-width: 1250px;
          margin: 0 auto;
          overflow: hidden;
          isolation: isolate;
          border-radius: 24px;

          background: linear-gradient(
            180deg,
            #13058d 0%,
            #0a064c 65%,
            #030212 100%
          );

          color: #ffffff;
        }

        #study-anniversary-hero *,
        #study-anniversary-hero *::before,
        #study-anniversary-hero *::after {
          box-sizing: border-box;
        }

        #study-anniversary-hero p,
        #study-anniversary-hero a,
        #study-anniversary-hero button,
        #study-anniversary-hero .destination,
        #study-anniversary-hero .anniversary-number,
        #study-anniversary-hero .anniversary-number span,
        #study-anniversary-hero .anniversary-years {
          font-family: ${montserrat.style.fontFamily} !important;
        }

        /* ==========================================
           FIREWORKS CANVAS
        ========================================== */

        #study-anniversary-hero .anniversary-fireworks {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 50;
          pointer-events: none;
        }

        /* ==========================================
           BACKGROUND GLOW
        ========================================== */

        #study-anniversary-hero .hero-glow {
          position: absolute;
          top: -260px;
          left: 50%;
          width: min(1000px, 100%);
          height: 650px;

          transform: translateX(-50%);

          border-radius: 50%;

          background: rgba(53, 32, 255, 0.28);

          filter: blur(100px);

          pointer-events: none;

          animation: pfecGlowPulse 6s ease-in-out infinite;
        }

        @keyframes pfecGlowPulse {
          0%, 100% {
            opacity: 0.55;
          }

          50% {
            opacity: 1;
          }
        }

        /* ==========================================
           HERO CONTENT
        ========================================== */

        #study-anniversary-hero .hero-content {
          position: relative;
          z-index: 35;

          display: grid;
          grid-template-columns: 1.3fr 0.7fr;

          gap: 30px;
          padding: 48px 7% 0;
        }

        #study-anniversary-hero .hero-left {
          max-width: 690px;
          min-width: 0;

          animation: pfecFadeUp 0.8s ease-out both;
        }

        /* ==========================================
           MAIN HEADING - BEBAS NEUE
        ========================================== */

        #study-anniversary-hero .hero-title {
          margin: 0 0 15px;

          color: #ffffff;

          font-family: ${bebasNeue.style.fontFamily} !important;

          font-size: clamp(32px, 4.1vw, 70px);
          font-weight: 400 !important;
          line-height: 1.1;
          letter-spacing: 0.5px;

          text-transform: uppercase;
        }

        /* ==========================================
           DESCRIPTION - MONTSERRAT
        ========================================== */

        #study-anniversary-hero .hero-description {
          max-width: 490px;

          margin: 15px 0;

          color: rgba(255, 255, 255, 0.93);

          font-size: 15px;
          font-weight: 400;
          line-height: 1.5;
        }

        /* ==========================================
           CONSULTATION BUTTON
        ========================================== */

        #study-anniversary-hero .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 12px;

          margin-top: 4px;
          padding: 12px 18px;

          border-radius: 9px;

          background: #f04c38;

          color: #ffffff !important;

          text-decoration: none !important;

          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }

        #study-anniversary-hero .hero-cta:hover {
          background: #ff715e;

          transform: translateY(-3px);
        }

        #study-anniversary-hero .hero-cta:focus-visible,
        #study-anniversary-hero .anniversary-button:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 4px;
        }

        /* ==========================================
           ANNIVERSARY CONTAINER
        ========================================== */

        #study-anniversary-hero .anniversary {
          position: relative;
          z-index: 35;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-self: end;

          width: 240px;

          animation: pfecFadeUp 0.9s ease-out both;
        }

        #study-anniversary-hero .anniversary-logo {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 230px;
          height: 125px;
        }

        /* ==========================================
           GOLDEN ANNIVERSARY FEATHERS
        ========================================== */

        #study-anniversary-hero .anniversary-feather {
          position: absolute;
          top: 3px;

          width: 78px;
          height: 112px;

          object-fit: contain;

          pointer-events: none;

          filter: drop-shadow(
            0 3px 5px rgba(255, 190, 50, 0.3)
          );

          animation: pfecFeatherFloat 3.5s ease-in-out infinite;
        }

        #study-anniversary-hero .left-feather {
          left: 0;
        }

        #study-anniversary-hero .right-feather {
          right: 0;

          animation-delay: 0.4s;
        }

        @keyframes pfecFeatherFloat {
          0%, 100% {
            translate: 0 0;
            rotate: -2deg;
          }

          50% {
            translate: 0 -5px;
            rotate: 2deg;
          }
        }

        /* ==========================================
           20 YEARS - REDUCED SPACING
        ========================================== */

        #study-anniversary-hero .anniversary-number-area {
          position: relative;
          z-index: 2;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 0;

          margin: 0;
          padding: 0;

          text-align: center;
        }

        #study-anniversary-hero .anniversary-number {
          margin: 0;
          padding: 0;

          color: #ffd36c;

          font-size: 91px;
          font-weight: 900;
          line-height: 0.85;
          letter-spacing: -5px;

          text-shadow:
            0 3px 1px #b56a13,
            0 5px 12px rgba(255, 190, 50, 0.5);
        }

        #study-anniversary-hero .anniversary-number span {
          font-weight: 900;
          line-height: inherit;
        }

        #study-anniversary-hero .anniversary-years {
          margin: -5px 0 0;
          padding: 0;

          color: #ffcf59;

          font-size: 27px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0;

          text-shadow: 0 2px 5px #d58b19;
        }

        #study-anniversary-hero .anniversary-number.reached {
          animation: pfecAnniversaryPop 0.65s ease-out;
        }

        @keyframes pfecAnniversaryPop {
          0% {
            transform: scale(1);
          }

          45% {
            transform: scale(1.15);
          }

          100% {
            transform: scale(1);
          }
        }

        /* ==========================================
           WATCH CELEBRATION BUTTON
        ========================================== */

        #study-anniversary-hero .anniversary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          margin-top: 12px;
          padding: 14px 20px;

          border: 1px solid rgba(255, 255, 255, 0.12);

          border-radius: 13px;

          background: rgba(10, 5, 60, 0.85);

          color: #ffffff !important;

          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;

          white-space: nowrap;

          cursor: pointer;
          appearance: none;

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }

        #study-anniversary-hero .anniversary-button:hover {
          background: #29209a;

          transform: translateY(-3px);
        }

        /* ==========================================
           VISUAL STAGE
        ========================================== */

        #study-anniversary-hero .hero-visual-stage {
          position: relative;

          width: 100%;
          height: clamp(330px, 32vw, 450px);

          margin-top: 0;
        }

        /* ==========================================
           MOVING PFEC BACKGROUND STRIP
           40% OPACITY REDUCTION
        ========================================== */

        #study-anniversary-hero .stripe-band {
          position: absolute;

          top: 26%;
          left: 0;
          right: 0;

          height: 33%;

          overflow: hidden;

          background: rgba(7, 4, 76, 0.8);

          opacity: 0.6;

          z-index: 1;

          pointer-events: none;
        }

        #study-anniversary-hero .stripe-track {
          display: flex;

          width: max-content;
          height: 100%;

          animation: pfecStripeScroll 18s linear infinite;

          will-change: transform;
        }

        #study-anniversary-hero .stripe-group {
          display: flex;
          flex-shrink: 0;

          height: 100%;
        }

        #study-anniversary-hero .stripe {
          flex: 0 0 85px;

          height: 100%;

          transform: skewX(-18deg);

          border-left: 12px solid #07044c;
          border-right: 12px solid #07044c;
        }

        #study-anniversary-hero .stripe:nth-child(4n + 1) {
          background: #1510a2;
        }

        #study-anniversary-hero .stripe:nth-child(4n + 2) {
          background: #9695c8;
        }

        #study-anniversary-hero .stripe:nth-child(4n + 3) {
          background: #d1d0ea;
        }

        #study-anniversary-hero .stripe:nth-child(4n + 4) {
          background: #b0afd9;
        }

        @keyframes pfecStripeScroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* ==========================================
           DESTINATION LABELS
        ========================================== */

        #study-anniversary-hero .destination-labels {
          position: absolute;
          inset: 0;

          z-index: 30;

          pointer-events: none;
        }

        #study-anniversary-hero .destination {
          position: absolute;

          display: inline-flex;
          align-items: center;

          gap: 5px;
          padding: 5px 10px;

          border-radius: 6px;

          background: #ffffff;
          color: #242424;

          font-size: clamp(9px, 0.85vw, 12px);
          font-weight: 500;
          line-height: 1.2;

          white-space: nowrap;

          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.14);

          opacity: 0;

          animation:
            pfecDestinationEnter 0.7s ease-out forwards,
            pfecDestinationFloat 4s ease-in-out infinite;

          will-change: transform;
        }

        #study-anniversary-hero .destination span {
          font-size: 14px;
          line-height: 1;
        }

        /* ==========================================
           DESKTOP DESTINATION POSITIONS
        ========================================== */

        #study-anniversary-hero .canada {
          top: 8%;
          left: 24%;
          animation-delay: 0.2s, 1s;
        }

        #study-anniversary-hero .usa {
          top: 15%;
          left: 37%;
          animation-delay: 0.4s, 1.2s;
        }

        #study-anniversary-hero .uk {
          top: 38%;
          left: 17%;
          animation-delay: 0.6s, 1.4s;
        }

        #study-anniversary-hero .ireland {
          top: 27%;
          left: 55%;
          animation-delay: 0.8s, 1.6s;
        }

        #study-anniversary-hero .australia {
          top: 66%;
          left: 9%;
          animation-delay: 1s, 1.8s;
        }

        #study-anniversary-hero .newzealand {
          top: 7%;
          left: 70%;
          animation-delay: 1.2s, 2s;
        }

        #study-anniversary-hero .malaysia {
          top: 20%;
          left: 77%;
          animation-delay: 1.4s, 2.2s;
        }

        #study-anniversary-hero .europe {
          top: 38%;
          right: 15%;
          animation-delay: 1.6s, 2.4s;
        }

        #study-anniversary-hero .japan {
          top: 55%;
          right: 10%;
          animation-delay: 1.8s, 2.6s;
        }

        #study-anniversary-hero .germany {
          top: 65%;
          right: 4%;
          animation-delay: 2s, 2.8s;
        }

        @keyframes pfecDestinationEnter {
          from {
            opacity: 0;
            translate: 0 12px;
          }

          to {
            opacity: 1;
            translate: 0 0;
          }
        }

        @keyframes pfecDestinationFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        /* ==========================================
           MAIN GRADUATE IMAGE
        ========================================== */

        #study-anniversary-hero .hero-main-image {
          position: absolute;

          left: 50%;
          bottom: -1%;

          transform: translateX(-50%);

          z-index: 20;

          width: 94%;
          max-width: 980px;

          animation: pfecImageEnter 0.9s ease-out both;
        }

        #study-anniversary-hero .hero-main-image img {
          display: block;

          width: 100%;
          height: auto;
          max-width: none;

          object-fit: contain;
          object-position: center bottom;

          pointer-events: none;
          user-select: none;

          filter: drop-shadow(
            0 12px 18px rgba(0, 0, 0, 0.18)
          );

          animation: pfecImageFloat 6s ease-in-out infinite;
        }

        @keyframes pfecImageEnter {
          from {
            opacity: 0;
            translate: 0 30px;
          }

          to {
            opacity: 1;
            translate: 0 0;
          }
        }

        @keyframes pfecImageFloat {
          0%, 100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -6px;
          }
        }

        /* ==========================================
           BOTTOM SHADOW
        ========================================== */

        #study-anniversary-hero .hero-bottom-shadow {
          position: absolute;
          inset: auto 0 0;

          z-index: 40;

          height: 10%;

          background: linear-gradient(
            to top,
            rgba(4, 3, 22, 0.2),
            transparent
          );

          pointer-events: none;
        }

        /* ==========================================
           GENERAL FADE ANIMATION
        ========================================== */

        @keyframes pfecFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ==========================================
           TABLET RESPONSIVE
        ========================================== */

        @media screen and (max-width: 1024px) {

          #study-anniversary-hero .hero-content {
            padding: 40px 5% 0;
            gap: 15px;
          }

          #study-anniversary-hero .hero-title {
            font-size: clamp(28px, 4vw, 42px);
          }

          #study-anniversary-hero .anniversary {
            scale: 0.85;
            transform-origin: top right;
          }

          #study-anniversary-hero .hero-main-image {
            width: 96%;
          }
        }

        /* ==========================================
           MOBILE RESPONSIVE
           NO OVERLAPPING ELEMENTS
        ========================================== */

        @media screen and (max-width: 767px) {

          #study-anniversary-hero {
            width: 100%;
            max-width: 100%;

            margin: 0 auto;

            border-radius: 0 0 18px 18px;

            overflow: hidden;
          }

          /* Mobile header content */

          #study-anniversary-hero .hero-content {
            position: relative;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            gap: 24px;

            width: 100%;

            padding: 28px 20px 0;
          }

          #study-anniversary-hero .hero-left {
            width: 100%;
            max-width: 100%;

            text-align: center;
          }

          /* Mobile heading */

          #study-anniversary-hero .hero-title {
            font-size: clamp(28px, 7.8vw, 42px);
            font-weight: 400 !important;
            line-height: 1.08;
            letter-spacing: 0.5px;

            margin: 0 0 14px;

            text-align: center;
          }

          /* Mobile description */

          #study-anniversary-hero .hero-description {
            font-size: 13px;
            font-weight: 400;
            line-height: 1.7;

            max-width: 420px;

            margin: 0 auto 18px;

            text-align: center;
          }

          /* Mobile consultation button */

          #study-anniversary-hero .hero-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            gap: 12px;

            min-height: 46px;
            max-width: 100%;

            margin: 0 auto;

            padding: 13px 22px;

            font-size: 13px;
            font-weight: 700;

            border-radius: 8px;

            text-align: center;
          }

          /* Mobile anniversary */

          #study-anniversary-hero .anniversary {
            position: relative;

            inset: auto;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            justify-self: auto;

            width: 100%;
            max-width: 250px;

            margin: 0 auto;
            padding: 0;

            scale: 1;

            transform-origin: center;

            z-index: 35;
          }

          #study-anniversary-hero .anniversary-logo {
            position: relative;

            display: flex;
            align-items: center;
            justify-content: center;

            width: 190px;
            height: 94px;

            margin: 0 auto;
          }

          /* Mobile golden feathers */

          #study-anniversary-hero .anniversary-feather {
            top: 0;

            width: 56px;
            height: 90px;

            object-fit: contain;
          }

          #study-anniversary-hero .left-feather {
            left: 0;
          }

          #study-anniversary-hero .right-feather {
            right: 0;
          }

          /* Mobile 20 years */

          #study-anniversary-hero .anniversary-number-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            gap: 0;

            margin: 0;
            padding: 0;
          }

          #study-anniversary-hero .anniversary-number {
            font-size: 72px;
            font-weight: 900;
            line-height: 0.85;
            letter-spacing: -4px;

            margin: 0;
            padding: 0;
          }

          #study-anniversary-hero .anniversary-years {
            font-size: 21px;
            font-weight: 900;
            line-height: 1;
            letter-spacing: 0.5px;

            margin: -3px 0 0;
            padding: 0;
          }

          /* Mobile celebration button */

          #study-anniversary-hero .anniversary-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            min-height: 44px;

            margin: 10px auto 0;
            padding: 10px 18px;

            font-size: 11px;
            font-weight: 500;
            line-height: 1.4;

            border-radius: 8px;

            text-align: center;

            white-space: nowrap;
          }

          /* Mobile visual stage */

          #study-anniversary-hero .hero-visual-stage {
            position: relative;

            display: flex;
            flex-direction: column;

            width: 100%;
            height: auto;
            min-height: 0;

            margin: 20px 0 0;
            padding: 0;

            overflow: hidden;
          }

          /* Mobile background strip */

          #study-anniversary-hero .stripe-band {
            position: absolute;

            top: auto;
            bottom: 18%;
            left: 0;
            right: 0;

            width: 100%;
            height: 30%;

            opacity: 0.4;

            z-index: 1;
          }

          #study-anniversary-hero .stripe {
            flex-basis: 55px;

            border-left-width: 8px;
            border-right-width: 8px;
          }

          /* Mobile destination labels */

          #study-anniversary-hero .destination-labels {
            position: relative;

            inset: auto;

            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;

            gap: 8px;

            width: 100%;

            padding: 4px 16px 16px;

            z-index: 30;
          }

          #study-anniversary-hero .destination {
            position: relative;

            inset: auto !important;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            gap: 5px;

            padding: 6px 9px;
            margin: 0;

            font-size: 10px;
            font-weight: 500;
            line-height: 1.3;

            border-radius: 5px;

            background: #ffffff;
            color: #242424;

            white-space: nowrap;

            opacity: 1;

            transform: none;
            translate: none;

            animation: none;

            will-change: auto;

            box-shadow:
              0 2px 6px rgba(0, 0, 0, 0.12);
          }

          #study-anniversary-hero .destination span {
            font-size: 12px;
            line-height: 1;
          }

          /* Mobile graduate image */

          #study-anniversary-hero .hero-main-image {
            position: relative;

            inset: auto;

            width: 100%;
            max-width: 100%;

            margin: 0 auto;

            transform: none;
            translate: none;

            animation: none;

            z-index: 20;
          }

          #study-anniversary-hero .hero-main-image img {
            display: block;

            width: 100%;
            max-width: 100%;
            height: auto;

            margin: 0;

            object-fit: contain;
            object-position: center bottom;

            animation: none;
            filter: none;
          }

          /* Mobile fireworks */

          #study-anniversary-hero .anniversary-fireworks {
            width: 100%;
            height: 100%;

            opacity: 0.65;

            pointer-events: none;
          }

          /* Mobile bottom shadow */

          #study-anniversary-hero .hero-bottom-shadow {
            height: 5%;

            background: linear-gradient(
              to top,
              rgba(4, 3, 22, 0.12),
              transparent
            );
          }
        }

        /* ==========================================
           SMALL MOBILE DEVICES
           380PX AND BELOW
        ========================================== */

        @media screen and (max-width: 380px) {

          #study-anniversary-hero .hero-content {
            padding: 24px 15px 0;
            gap: 20px;
          }

          #study-anniversary-hero .hero-title {
            font-size: 28px;
            line-height: 1.1;
          }

          #study-anniversary-hero .hero-description {
            font-size: 12px;
            line-height: 1.65;
          }

          #study-anniversary-hero .hero-cta {
            font-size: 12px;
            padding: 12px 16px;
          }

          #study-anniversary-hero .anniversary-logo {
            width: 170px;
            height: 85px;
          }

          #study-anniversary-hero .anniversary-number {
            font-size: 64px;
          }

          #study-anniversary-hero .anniversary-years {
            font-size: 19px;
          }

          #study-anniversary-hero .anniversary-feather {
            width: 49px;
            height: 80px;
          }

          #study-anniversary-hero .destination-labels {
            gap: 6px;
            padding: 4px 10px 14px;
          }

          #study-anniversary-hero .destination {
            font-size: 9px;
            padding: 5px 7px;
          }
        }

        /* ==========================================
           REDUCED MOTION ACCESSIBILITY
        ========================================== */

        @media (prefers-reduced-motion: reduce) {

          #study-anniversary-hero *,
          #study-anniversary-hero *::before,
          #study-anniversary-hero *::after {
            animation: none !important;
            transition: none !important;
          }

          #study-anniversary-hero .destination {
            opacity: 1;
          }

          #study-anniversary-hero .anniversary-fireworks {
            display: none;
          }
        }

      `}</style>
    </>
  );
}
