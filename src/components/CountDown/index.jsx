import moment from "moment";
import React, { useEffect, useState } from "react";

const CountDown = ({ targetTime }) => {
  const [renderTime, setRenderTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const calculateTimeRemaining = (targetTime) => {
    const now = moment();
    const duration = moment.duration(targetTime.diff(now));
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return { hours, minutes, seconds };
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = calculateTimeRemaining(targetTime);
      setRenderTime(remaining);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [targetTime]);
  return (
    <div class="deal-countdown is-countdown" data-until="+10h">
      <span class="countdown-row countdown-show3">
        <span class="countdown-section">
          <span class="countdown-amount">{renderTime?.hours || 0}</span>
          <span class="countdown-period">hours</span>
        </span>
        <span class="countdown-section">
          <span class="countdown-amount">{renderTime?.minutes || 0}</span>
          <span class="countdown-period">minutes</span>
        </span>
        <span class="countdown-section">
          <span class="countdown-amount">{renderTime?.seconds || 0}</span>
          <span class="countdown-period">seconds</span>
        </span>
      </span>
    </div>
  );
};

export default CountDown;
