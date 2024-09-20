import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameEfect.css";
import gotaImg from "../images/13.png";
import numero10Img from "../assets/numero-10-1.jpg";
import fondogame from "../images/JUEGO00 _ CONTEO.png";
import uno from "../images/1.png";
import dos from "../images/2.png";
import tres from "../images/3.png";
//import obj1 from "../images/13.png"

const Game = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(500); 
  const [countdown, setCountdown] = useState(3); // Temporizador inicial de 3 segundos
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
      navigate("/result", { state: { score } });
    }
  }, [countdown, timeLeft, navigate, score]);

  const handleClick = (index) => {
    if (!clicked[index]) {
      setScore((prevScore) => prevScore + 10);
    }

    setClicked((prevClicked) =>
      prevClicked.map((c, i) => (i === index ? true : c))
    );

    setTimeout(() => {
      setClicked((prevClicked) =>
        prevClicked.map((c, i) => (i === index ? false : c))
      );
    }, 1000);
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
            style={{ width: "200px", height: "200px", position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
          />
        </div>
      ) : (
        <>
      <div className="absolute top-96 left-0 right-0 flex justify-between  px-24   z-10">
            <p className="text-5xl text-white mb-2 bg-[#FAC224] rounded-xl w-96 h-24 flex justify-center items-center font-semibold ">Puntaje: {score} </p>
            <p className="text-5xl text-white bg-[#FAC224] rounded-xl w-96 h-24 flex justify-center items-center font-semibold ">Tiempo: {timeLeft}s</p>
          </div>

          <div className="gotas">
            {clicked.map((isClicked, index) => (
              <div
                key={index}
                className={`gota ${isClicked ? "numero10Img" : ""}`}
                style={{
                  backgroundImage: `url(${isClicked ? numero10Img : gotaImg})`,
                  ...(isClicked && { width: "5vw", height: "5vw" }),
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
