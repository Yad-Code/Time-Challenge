import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({
  ref,
  remainingTime,
  targetTime,
  onReset,
}) {
  const dialog = useRef();

  const result = remainingTime > 0 && remainingTime < targetTime * 1000;

  //now we have detached the ref so we can change dialog element
  //to whatever we want...
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  {
    /*Point calculations */
  }
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      <h2>You {result ? "Won" : "Lost"}</h2>
      {result && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{(remainingTime / 1000).toFixed(2)} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
}
