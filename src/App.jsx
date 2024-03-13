import { useEffect, useState } from "react";
import "./App.css";
import questionData from "./Question.json";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  const handleAnswerClick = (selectedOption) => {
    if(selectedOption === questionData
      [currentQuestion].answer)
     {
        setScore((prevScore) => prevScore  + 1);      
     }

    if (currentQuestion < questionData.length - 1) 
    {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    }else{
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }else{
      clearInterval(interval);
      setShowScore(true);
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);

  return (
    <div className="quiz-app w-[600px] p-4 bg-white shadow-md rounded">
      {showScore ? (
        <div className="score-section text-center" >
          <h2 className="mt-4 font-medium mb-3">
            Your Score : <span className="font-semibold text-lg ">{score}/{questionData.length }</span>
          </h2>
          <button className="py-2 px-4  font-normal rounded-3xl bg-red-500 text-white cursor-pointer transition duration-300 ease 
          hover:bg-red-400" onClick={handleRestartQuiz}>
            Restart
          </button>
        </div>
      ) : (
        <div className="question-section text-center ">
          <h1 className=" text-xl font-bold my-3 text-green-600">Question {currentQuestion + 1}</h1>
          <p className="text-xl font-medium">{questionData[currentQuestion].question}</p>
          <div className="options flex justify-center items-end gap-2 mt-4 ">
           {questionData[currentQuestion].options.map((option, index) => (
             <button className="py-2 px-4 font-normal rounded-3xl bg-green-600 text-white cursor-pointer transition duration-300 ease hover:bg-green-500"
            key={index} onClick={() => handleAnswerClick(option)}>
             {option}
           </button>
           ))}            
          </div>
          <div className="timer mt-4 font-medium ">
            Time Left: <span className="font-bold text-lg ">{timer}s</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
