import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import "./Profile.css";

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const BACKEND = process.env.REACT_APP_BACKEND;

  //fetch all profile entries
  // useEffect(() => {
  //   fetch(urlcat(BACKEND, "/daybits/register/profile"))
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setProfile(data);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const showProfile = (profile) => {
      fetch(urlcat(BACKEND, "/daybits/register/profile"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setProfile(data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };
    showProfile();
  }, []);

  // <Button
  //   onClick={() => navigate("/daybits/journal")}
  //   variant="contained"
  //   sx={{ mt: 3, mb: 2 }}
  //   style={{
  //     fontFamily: "Montserrat",
  //     backgroundColor: "#FE7965",
  //     color: "white",
  //   }}
  // >
  //   Write a journal today!
  // </Button>;

  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate("/daybits/journal");
  };

  return (
    <div className="profileContainer">
      <div className="profileContent">
        {loading ? (
          <p>loading</p>
        ) : (
          <>
            <div className="profileDetails"></div>
            <h1>My Profile</h1>

            <h3 style={{ marginTop: "3rem" }}>
              I want to
              <span style={{ color: "green", fontStyle: "italic" }}>
                &nbsp; {profile.habitstatus} &nbsp;
              </span>
              my habit of
              <span style={{ color: "green", fontStyle: "italic" }}>
                &nbsp; {profile.habit} &nbsp;
              </span>
              <br />
              <br />
              Target duration / frequency:
              <span style={{ color: "green", fontStyle: "italic" }}>
                &nbsp;{profile.target} &nbsp;
              </span>
              <br />
              <br />
              My goal is to
              <span style={{ color: "green", fontStyle: "italic" }}>
                &nbsp;{profile.goal} &nbsp;
              </span>
            </h3>
            <div className="editButton">
              <Link
                style={{ textDecoration: "none" }}
                to="/daybits/editprofile"
              >
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    fontFamily: "Montserrat",
                    backgroundColor: "white",
                    color: "black",
                    marginTop: "3em",
                  }}
                >
                  Edit
                </Button>
              </Link>
            </div>

            <Button
              onClick={handleClickButton}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
