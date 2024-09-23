import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import registro from "../images/REGISTRO ID.png";
import fondo from "../images/fondo.png";
import {checkInServiceJs} from "../firebase/firebaseServiceJs"


const Registro = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false); 
  const [isLoaded, setIsLoaded] = useState(false); 
  const navigate = useNavigate(); 

  const handleDivClick =async () => {
    const attending  = await   checkInServiceJs.getAttendeeByUserCode({userCode:inputValue})
    console.log(attending);
     //llamarlo para validar el cod
     if   (attending === null) {
         return setError(true); // Muestra el error si el código es incorrecto
        } 
        const userParticipation  = await checkInServiceJs.getUserParticipation({userCode:inputValue})

        console.log(userParticipation?.points);

        localStorage.setItem("userCode", inputValue);
        

        checkInServiceJs.saveUserParticipation({userCode:inputValue, points:userParticipation?.points ??10, newParticipation:true})

        navigate ("/game",{state:{userCode:inputValue}})



  };

  // Controla cuando las imágenes principales están completamente cargadas
  useEffect(() => {
    const img = new Image();
    img.src = registro;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Imagen de fondo fija siempre visible */}
      <img
        src={fondo}
        alt="Fondo de pantalla"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {isLoaded && (
        <div className="relative w-full h-screen flex justify-center items-center">
          <img
            src={registro}
            alt="Fondo"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div
            className="absolute top-[1180px] left-40 w-[750px] h-32 z-10 cursor-pointer"
            onClick={handleDivClick}
          ></div>

          <div className="relative z-20 mt-48 flex flex-col justify-center items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mb-8 p-4 w-[720px] h-32 rounded-3xl text-center text-6xl border-2 border-gray-300 bg-gray-300"
              placeholder="Ingresa el código"
            />
            {error && (
              <p className="text-red-500 text-4xl mt-4">
                Código incorrecto. Inténtalo de nuevo.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;
