import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameEfect.css";
import obj1 from "../images/13.png";
import obj2 from "../images/14.png";
import obj3 from "../images/15.png";
import obj4 from "../images/16.png";
import obj5 from "../images/17.png";
import obj6 from "../images/18.png";
import obj7 from "../images/19.png";
import obj8 from "../images/20T.png";
import obj9 from "../images/21.png";
import obj10 from "../images/22.png";
import obj11 from "../images/23.png";
import obj12 from "../images/24.png";


import fondogame from "../images/JUEGO00 _ CONTEO.png";
import uno from "../images/1.png";
import dos from "../images/2.png";
import tres from "../images/3.png";

const Game = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [countdown, setCountdown] = useState(3); // Temporizador inicial de 3 segundos
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();

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
      navigate("/result", {
        state: { score, userCode: location.state?.userCode },
      });
    }
  }, [countdown, timeLeft, navigate, score]);

  const handleClick = (index) => {
    if (!clicked[index]) {
      setScore((prevScore) => Math.min(prevScore + 2, 100)); // Limitar el puntaje a 100
    }

    setCurrentImage((prev) => (prev + 1) % 12);

    setClicked((prevClicked) =>
      prevClicked.map((c, i) => (i === index ? true : c))
    );

    setTimeout(() => {
      setClicked((prevClicked) =>
        prevClicked.map((c, i) => (i === index ? false : c))
      );
    }, 1000);
  };

  const getImage = () => {
    // Retornar el objeto correspondiente al índice actual
    const images = [
      obj1,
      obj2,
      obj3,
      obj4,
      obj5,
      obj6,
      obj7,
      obj8,
      obj9,
      obj10,
      obj11,
      obj12,
      
    ];
    return images[currentImage];
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
              width: "300px",
              height: "300px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      ) : (
        <>
          <div className="absolute top-96 left-0 right-0 flex justify-between  px-24   z-10">
            <p className="text-5xl text-white mb-2 bg-[#FAC224] rounded-xl w-96 h-24 flex justify-center items-center font-semibold ">
              Puntaje: {score}{" "}
            </p>
            <p className="text-5xl text-white bg-[#FAC224] rounded-xl w-96 h-24 flex justify-center items-center font-semibold ">
              Tiempo: {timeLeft}s
            </p>
          </div>

          <div className="gotas">
            {clicked.map((isClicked, index) => (
              <div
                key={index}
                className="gota"
                style={{
                  backgroundImage: `url(${getImage()})`,
                  opacity: isClicked ? 0 : 1,
                  transform: isClicked ? "scale(0)" : "scale(1)",
                  transition: "none", // Sin transición
                }}
                onClick={() => handleClick(index)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
