import React from "react";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import Table from "@mui/material/Table";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import JournalRow from "../components/JournalRow";
import dayjs from "dayjs"; // ES 2015

import "./Comjournal.css";

<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Rammetto+One&display=swap"
  rel="stylesheet"
></link>;
const BACKEND = process.env.REACT_APP_BACKEND;

const Comjournal = () => {
  const [journallist, setJournallist] = useState([]);
  const [load, setLoad] = useState(false);
  const [comments, setComments] = useState([]);

  //fetch all journal entries
  useEffect(() => {
    const showJournal = (journalEntry) => {
      fetch(urlcat(BACKEND, "/daybits/journal"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(journalEntry),
      })
        .then((response) => response.json())
        .then((data) => {
          setJournallist(data);
          setLoad(true);
        })
        .catch((error) => console.log(error));
    };
    showJournal();
  }, [load]);

  const handleDelete = (id) => () => {
    const url = urlcat(BACKEND, `/daybits/journal/${id}`);
    fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }) //add credentails true
      .then((response) => response.json())
      .then((data) => {
        alert("post deleted");
      })
      .then(() => {
        arrJournalId.filter((entry) => {
          return entry._id !== id;
        });
        setLoad(false);
      });
  };

  let arrTitle = [];
  let arrUser = [];
  let arrJournalBody = [];
  let arrJournalId = [];
  let arrJournalDate = [];
  let arrComments = [];
  let arrAchievedGoal = [];

  // console.log("arrJournalID:", arrJournalId);
  // console.log("journalist is", journallist);
  // console.log("arrJournalDate", arrJournalDate);
  // console.log("arrAchievedgoal", arrAchievedGoal);

  //to add to respective arrays
  const createArr = (journallist) => {
    for (let i = 0; i < journallist.length; i++) {
      for (let x = 0; x < journallist[i].journals.length; x++) {
        arrTitle.push(journallist[i].journals[x].title);
        arrJournalBody.push(journallist[i].journals[x].journalBody);
        arrUser.push(journallist[i].username);
        arrJournalId.push(journallist[i].journals[x]._id);
        arrJournalDate.push(
          dayjs(journallist[i].journals[x].createdAt).format("DD-MM-YYYY")
        );
        arrAchievedGoal.push(journallist[i].journals[x].dailyGoalAchieved);
      }
    }
    return;
  };

  //FETCH FROM COMMENT SCHEMA
  //fetch all comments
  useEffect(() => {
    const showComments = (comments) => {
      fetch(urlcat(BACKEND, "/daybits/comments"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comments),
      })
        .then((response) => response.json())
        .then((data) => {
          setComments(data);
          setLoad(true);
        })
        .catch((error) => console.log(error));
    };
    showComments();
  }, []);

  createArr(journallist);

  // const journalArray = [];
  // journalArray.push(arrTitle);
  // journalArray.push(arrUser);
  // journalArray.push(arrJournalBody);
  // journalArray.push(arrJournalId);

  // console.log(journalArray);
  // const journalArray1 = {};

  return (
    <div className="comJournalContainer">
      <TableContainer
        component={Paper}
        style={{ marginRight: "1rem", fontFamily: "Montserrat" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                align="center"
              >
                Posted by
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                align="center"
              >
                Title
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                align="center"
              >
                Posted On:
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                align="center"
              >
                Goal Achieved
              </TableCell>
            </TableRow>
          </TableHead>
          <JournalRow
            arrTitle={arrTitle}
            arrUser={arrUser}
            arrJournalBody={arrJournalBody}
            arrJournalId={arrJournalId}
            handleDelete={handleDelete}
            arrJournalDate={arrJournalDate}
            arrAchievedGoal={arrAchievedGoal}
          />
          {/* <TableBody>{tableCells}</TableBody> */}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Comjournal;
