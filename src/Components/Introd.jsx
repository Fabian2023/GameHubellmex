import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import intro from "../images/intro 6.mp4";

const Introd = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    // Reproduce el video automáticamente cuando el componente se monta
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleClick = () => {
    // Redirige a la ruta /registro al hacer clic en el video
    navigate("/registro");
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-black"
      onClick={handleClick} // Maneja el clic en todo el contenedor del video
    >
      <video
        ref={videoRef}
        src={intro}
        className="w-full h-auto cursor-pointer"
        autoPlay
        muted
        loop
        controls={false} // Elimina los controles si no deseas que el usuario los vea
      />
    </div>
  );
};

export default Introd;
