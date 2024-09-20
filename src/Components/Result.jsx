import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const score = location.state?.score || 0; // Obtiene el puntaje del estado pasado
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/"); // Navega a la pantalla de inicio para reiniciar
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl mb-4">Resultado Final</h1>
      <p className="text-5xl mb-8">Puntaje: {score} puntos</p>
      <button
        onClick={handleRestart}
        className="bg-blue-500 hover:bg-blue-700  w-96 h-24 rounded-xl text-cyan-50 text-5xl"
      >
        Volver a Empezar
      </button>
    </div>
  );
};

export default Result;
