import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./JourneyTime.module.scss";

const JourneyTime = () => {
  const [journeyTime, setJourneyTime] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/tfl_journey");
      setJourneyTime(data.journey_time + "m");
    };
    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className={styles.large}>{journeyTime}</div>
      <div className={styles.caption}>Estimated time to TCR</div>
    </div>
  );
};
export default JourneyTime;
