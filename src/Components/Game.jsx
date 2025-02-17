import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./GameEfect.css";
import obj1 from "../images/13.png";
import obj2 from "../images/14.png";
import obj3 from "../images/15.png";
import obj4 from "../images/16.png";
import fondogame from "../images/fondo.png";
import uno from "../images/1.png";
import dos from "../images/2.png";
import tres from "../images/3.png";

// Componente para el efecto de explosión 💥
// eslint-disable-next-line react/prop-types
const ExplosionEffect = ({ x, y }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 5, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="absolute w-12 h-12 md:w-20 md:h-20 bg-yellow-600 rounded-full"
    style={{ top: y, left: x }}
  />
);

const Game = () => {
  const navigate = useNavigate();
  const images = [obj1, obj2, obj3, obj4];

  const [activeDrops, setActiveDrops] = useState(
    new Array(5).fill(null).map(() => ({
      image: images[Math.floor(Math.random() * images.length)],
      visible: true,
    }))
  );

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [countdown, setCountdown] = useState(3);
  const [explosions, setExplosions] = useState([]); // Almacena explosiones activas

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      navigate("/result", { state: { score } });
    }
  }, [countdown, timeLeft, navigate, score]);

  const handleClick = (event, index) => {
    console.log(`Click en gota ${index}`);
    setScore((prev) => Math.min(prev + 2, 100));

    // Captura la posición del clic para la explosión
    const { clientX, clientY } = event;
    setExplosions((prev) => [...prev, { id: Date.now(), x: clientX, y: clientY }]);

    // Ocultar la gota clickeada
    setActiveDrops((prevDrops) =>
      prevDrops.map((drop, i) => (i === index ? { ...drop, visible: false } : drop))
    );

    // Reaparecer la gota después de 1s con una nueva imagen
    setTimeout(() => {
      setActiveDrops((prevDrops) =>
        prevDrops.map((drop, i) =>
          i === index
            ? {
                image: images[Math.floor(Math.random() * images.length)],
                visible: true,
              }
            : drop
        )
      );
    }, 1000);

    // Remover la explosión después de 500ms
    setTimeout(() => {
      setExplosions((prev) => prev.filter((exp) => exp.id !== Date.now()));
    }, 500);
  };

  const getCountdownImage = () => {
    if (countdown === 3) return tres;
    if (countdown === 2) return dos;
    if (countdown === 1) return uno;
    return null;
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={fondogame}
        alt="Fondo de juego"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {countdown > 0 ? (
        <div className="countdown-container flex justify-center items-center">
          <img
            src={getCountdownImage()}
            alt={`Número ${countdown}`}
            className="countdown-image"
            style={{
              width: "30vw",
              height: "30vw",
              maxWidth: "300px",
              maxHeight: "300px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      ) : (
        <>
          {/* PUNTOS Y TIEMPO - ANIMADOS */}
          <div className="absolute top-8 left-0 right-0 gap-8 flex justify-between px-6 sm:px-16 md:px-24 z-10">
            <p className="text-2xl sm:text-4xl md:text-7xl text-black mb-2 bg-[#FAC224] rounded-xl w-[150px] sm:w-[200px] md:w-[450px] h-20 sm:h-24 md:h-28 flex justify-center items-center font-semibold">
              Puntaje:{" "}
              <motion.span
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="ml-2"
              >
                {score}
              </motion.span>
            </p>
            <p className="text-2xl sm:text-4xl md:text-7xl text-black bg-[#FAC224] rounded-xl w-[150px] sm:w-[300px] md:w-[450px] h-20 sm:h-24 md:h-28 flex justify-center items-center font-semibold">
              Tiempo:{" "}
              <motion.span
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="ml-2"
              >
                {timeLeft}s
              </motion.span>
            </p>
          </div>

          {/* GOTAS */}
          <div className="gotas">
            {activeDrops.map((drop, index) => (
              <div
                key={index}
                className="gota"
                style={{
                  backgroundImage: `url(${drop.image})`,
                  opacity: drop.visible ? 1 : 0,
                  transform: drop.visible ? "scale(1)" : "scale(0)",
                  transition: "opacity 0.3s, transform 0.3s",
                  width: "20vw",  // Ajustar el tamaño de la gota
                  height: "20vw", // Ajustar el tamaño de la gota
                  maxWidth: "200px",
                  maxHeight: "200px",
                  cursor: "pointer",  // Cambiar el cursor para indicar que es clickeable
                }}
                onClick={(e) => handleClick(e, index)}
              ></div>
            ))}
          </div>

          {/* EXPLOSIONES */}
          {explosions.map(({ id, x, y }) => (
            <ExplosionEffect key={id} x={x} y={y} />
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
