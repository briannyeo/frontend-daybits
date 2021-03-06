import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";

import dayjs from "dayjs"; // ES 2015
import "./Progress.css";

const BACKEND = process.env.REACT_APP_BACKEND;

const Progress = () => {
  const [progress, setProgress] = useState([]);
  // const [countSuccess, setCountSuccess] = useState(0);
  // const [countFail, setCountFail] = useState(0);
  // const [daysLeft, setDaysLeft] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  //fetch all user + journal data

  useEffect(() => {
    const showProgress = (progress) => {
      fetch(urlcat(BACKEND, "/daybits/register/progress"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(progress),
      })
        .then((response) => response.json())
        .then((data) => {
          setProgress(data);

          setLoad(true);
        })
        .catch((error) => console.log(error));
    };
    showProgress();
  }, []);

  let countSuccess = [];
  let countFail = [];
  let daysLeft = [];

  //X days closer to goal - current date minus start date
  const dateProgress = Date.parse(dayjs().format("DD-MMM-YYYY"));
  //console.log("dateProgress", dateProgress);

  const dateStarted = Date.parse(
    dayjs(progress.startDate).format("DD-MMM-YYYY")
  );
  //console.log("dateStarted", dateStarted);

  const daysRemaining = Math.floor((dateProgress - dateStarted) / 86400000);
  //console.log("days remaining", daysRemaining);
  daysLeft.push(daysRemaining);
  //setDaysLeft(daysRemaining);

  const endDate = dayjs(progress.startDate)
    .add(30, "day")
    .format("DD-MMM-YYYY");

  let navigate = useNavigate();

  const createArrProgress = (progress) => {
    // console.log("progress", progress);
    // console.log(progress.habit);
    // console.log(progress.journals.length);

    let count = 0;
    let counter = 0;

    for (let i = 0; i < progress.journals.length; i++) {
      //No. of days succeeded = counting number of days the 'daily goal achieved' was true

      if (progress.journals[i].dailyGoalAchieved === true) {
        count += 1;
        // console.log("count of TRUE", count);
        countSuccess.push(count);
        //setCountSuccess(count);
        // console.log("CountSuccess in state", countSuccess);
      }
      //No. of days missed = counting number of days missed (if journal was written but daily goal achieved was false)
      if (
        progress.journals[i].title &&
        progress.journals[i].dailyGoalAchieved === false
      ) {
        counter += 1;
        //console.log("counter of FALSE", counter);
        countFail.push(counter);
        //setCountFail(counter);
        // console.log("CountFail in state", countFail);
      }
    }

    return;
  };

  if (load) {
    createArrProgress(progress);
  }

  const handleClick = () => {
    navigate("/daybits/journal");
  };

  return (
    <div className="progressContainer">
      <h2 style={{ marginTop: "1rem" }}>My Planner</h2>
      <div className="progressInfo">
        <h4>
          No. of days succeeded:{" "}
          <span style={{ color: "green" }}>
            {countSuccess[countSuccess.length - 1]}
          </span>
        </h4>
        <h4>
          No. of days missed:{" "}
          <span style={{ color: "red" }}>
            {countFail[countFail.length - 1]}
          </span>
        </h4>
        <h4>
          You are <span style={{ color: "#5CBFC6" }}>{daysLeft}</span> days
          closer to{" "}
          <span style={{ color: "#5CBFC6" }}>{progress.habitstatus}ing</span>{" "}
          your habit of{" "}
          <span style={{ color: "#5CBFC6" }}>{progress.habit}</span>
        </h4>
        <h4>
          Your challenge ends on:{" "}
          <span style={{ color: "#5CBFC6" }}>{endDate}</span>
        </h4>
      </div>
    </div>
  );
};

export default Progress;
