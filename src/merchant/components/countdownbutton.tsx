import React, { useState, useEffect } from "react";

interface Props {
  onCountdownComplete?: () => void;
}

const ResendCodeButton: React.FC<Props> = ({ onCountdownComplete }) => {
  const [countdown, setCountdown] = useState<number>(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(intervalId);
          // Call the callback function when countdown is complete
          if (onCountdownComplete) {
            onCountdownComplete();
          }
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onCountdownComplete]);

  return (
    <button className="resendCodeBtn" type="button" disabled={countdown > 0}>
      Resend Code in {Math.floor(countdown / 60).toString().padStart(1, "0")}:
      {(countdown % 60).toString().padStart(2, "0")}
    </button>
  );
};

export default ResendCodeButton;
