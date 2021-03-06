import { useEffect, useState } from "react";
import urlcat from "urlcat";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserRow from "../components/UserRow";
import dayjs from "dayjs"; // ES 2015
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const BACKEND = process.env.REACT_APP_BACKEND;

const Account = () => {
  const [userJournals, setUserJournals] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  //fetch all journal entries of particular user
  useEffect(() => {
    const showUserJournals = (userEntries) => {
      fetch(urlcat(BACKEND, "/daybits/journal/account"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEntries),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserJournals(data);
          setLoad(true);
        })
        .catch((error) => console.log(error));
    };
    showUserJournals();
  }, [load]);

  let arrTitle = [];
  let arrUser = userJournals.username;
  let arrJournalBody = [];
  let arrJournalId = [];
  let arrJournalDate = [];
  let arrAchievedGoal = [];

  const createArr = (userJournals) => {
    if (load) {
      for (let i = 0; i < userJournals.journals.length; i++) {
        arrJournalId.push(userJournals.journals[i]._id);
        arrTitle.push(userJournals.journals[i].title);
        arrJournalBody.push(userJournals.journals[i].journalBody);
        arrJournalDate.push(
          dayjs(userJournals.journals[i].createdAt).format("DD-MM-YYYY")
        );
        arrAchievedGoal.push(userJournals.journals[i].dailyGoalAchieved);
      }
    }
    return;
  };

  if (load) {
    console.log("load", load);

    createArr(userJournals);
  }
  //BUG that prevents refresh of data???
  console.log("arrTitle:", arrTitle);
  console.log("userJournals", userJournals);
  console.log(arrUser);
  //delete journal entry
  const handleDelete = (id) => () => {
    const url = urlcat(BACKEND, `/daybits/journal/${id}`);
    fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
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

  console.log(arrTitle);

  //createArr(userJournals);
  return (
    <>
      {arrTitle.length !== 0 ? (
        <>
          <h2 style={{ marginTop: "2rem" }}>All Your Posts </h2>
          <TableContainer component={Paper} style={{ margin: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
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
                  <TableCell
                    style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                    align="center"
                  >
                    Click to Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <UserRow
                arrTitle={arrTitle}
                arrUser={arrUser}
                arrJournalBody={arrJournalBody}
                arrJournalId={arrJournalId}
                handleDelete={handleDelete}
                arrJournalDate={arrJournalDate}
                arrAchievedGoal={arrAchievedGoal}
              />
            </Table>
          </TableContainer>
        </>
      ) : (
        <div className="emptyContainer">
          <div className="emptyTitle">
            <h2>Nothing to see here!</h2>
            <Button
              onClick={() => navigate("/daybits/journal")}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                fontFamily: "Montserrat",
                backgroundColor: "#FE7965",
                color: "white",
              }}
            >
              Write a journal today!
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
