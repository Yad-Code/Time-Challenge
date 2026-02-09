import { useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [totalScore, setTotalScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
  const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

  if (remainingTime <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    if (score > totalScore && score != 100) {
      setTotalScore(score);
    }
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime((prevRemainingTime) => (prevRemainingTime -= 10));
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        onReset={handleReset}
        remainingTime={remainingTime}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p>Best Score: {totalScore}</p>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
