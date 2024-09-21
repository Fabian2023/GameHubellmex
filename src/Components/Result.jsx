import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkInServiceJs } from "../firebase/firebaseServiceJs";
import fondocierre from "../images/CIERRE.png";
import cierrevideo from "../images/cierre 6.mp4"; 

const Result = () => {
  const location = useLocation();
  const score = Math.min(location.state?.score || 0, 100);  // Obtiene el puntaje del estado pasado
  const userCode = localStorage.getItem("userCode") || "";

  console.log("User Code:", userCode);
  const navigate = useNavigate();
  
  const [showScore, setShowScore] = useState(true); 
  const [showVideo, setShowVideo] = useState(false); 

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowScore(false);
      setShowVideo(true);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  const handleVideoEnd = () => {
    navigate("/"); 
  };

  useEffect(() => {
    saveData()
  }, []);

  const saveData = async () => {
    const previewParticipation = await checkInServiceJs.getUserParticipation({
      userCode,
    });
    if (previewParticipation.participationDateList.length === 1) {
      checkInServiceJs.saveUserParticipation({
        userCode,
        points: Math.min(previewParticipation.points + score, 100), 
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen">
      <img
        src={fondocierre}
        alt="Fondo de juego"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {showScore && (
        <div className="relative z-10 flex justify-center items-center h-full w-full">
          <p className="text-5xl text-white bg-[#FAC224] rounded-xl w-[80%] max-w-lg h-24 flex justify-center items-center font-semibold text-center">
            Puntaje Final: {score} pts
          </p>
        </div>
      )}

      {showVideo && (
        <video
          src={cierrevideo}
          className="relative z-10 w-full h-full object-cover"
          autoPlay
          muted 
          onEnded={handleVideoEnd}
        />
      )}
    </div>
  );
};

export default Result;
