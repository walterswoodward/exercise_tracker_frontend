import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: "https://exercise-tracker-backend.herokuapp.com/",
      newUser: "",
      userId: null,
      username: null,
      description: null,
      duration: null,
      date: null,
      redirect: false
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { userId, description, duration, date, newUser, URL } = this.state;
    if (e.target.name === "submitNewUser") {
      if (newUser === "") {
        alert("Sorry! Please enter a username!");
        return;
      }
      axios.get(`${URL}api/exercise/users/`).then(response => {
        if (!response.data.every(item => item.username !== newUser)) {
          alert("Sorry! That name is already taken! Please choose another!");
          return;
        } else {
          axios
            .post(`${URL}api/exercise/new-user/`, {
              username: newUser
            })
            .then(response => {
              alert(
                `New User ${newUser} Successfully Added! You will be redirected to your new profile data. Please save your id to add exercises!`
              );
              window.location.href = `${URL}api/exercise/users/${
                response.data._id
              }`;
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }

    if (e.target.name === "submitNewExercise") {
      if (userId === null) {
        alert("Sorry! A valid userId is required");
        return;
      }
      if (description === null) {
        alert("Sorry! A valid description is required");
        return;
      }
      if (duration === null) {
        alert("Sorry! A valid duration is required");
        return;
      }
      if (date === null) {
        alert("Sorry! A valid date is required");
        return;
      } else if (!Date.parse(date)) {
        alert(
          "Please ensure the date provided is both valid and correctly formatted (e.g. YYYY-MM-DD)"
        );
      }

      if (userId && description && duration && Date.parse(date)) {
        axios
          .get(`${URL}api/exercise/users/${userId}`)
          .then(response => {
            axios
              .post(`${URL}api/exercise/new-exercise/`, {
                username: response.data.username,
                userId: userId,
                description: description,
                duration: duration,
                date: date
              })
              .then(response => {
                alert(
                  `WOOHOO! Keep up the great work ${response.data.username}!`
                );
                window.location.href = `${URL}api/exercise/logs/${
                  response.data._id
                }`;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
            alert("Please make sure you enter a valid userId");
          });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="content">
            <div className="App_title">
              Exercise Tracker{" "}
              <FontAwesomeIcon icon={faRunning} className="faRunning" />
            </div>
            <div className="createUserForm">
            <div className="createUserLabel">
              Create a new user name here!
              </div>
              <input
                className="user_input"
                placeholder="username"
                onChange={event =>
                  this.handleChange("newUser", event.target.value)
                }
                type="text"
                value={this.state.newUser}
                required
              />
              <button onClick={this.handleSubmit} name="submitNewUser">
                Submit
              </button>
            </div>
            <div className="createExerciseForm">
            <div className="createExLabel">
              Create a new exercise log here!

            </div>
              <input
                className="exercise_input"
                id="exInput_userId"
                placeholder="userId*"
                onChange={event =>
                  this.handleChange("userId", event.target.value)
                }
                type="text"
                required
              />
              <input
                className="exercise_input"
                id="exInput_description"
                placeholder="description*"
                onChange={event =>
                  this.handleChange("description", event.target.value)
                }
                type="text"
                required
              />
              <input
                className="exercise_input"
                id="exInput_duration"
                placeholder="duration*(mins.)"
                onChange={event =>
                  this.handleChange("duration", event.target.value)
                }
                type="number"
                required
              />
              <input
                className="exercise_input"
                id="exInput_date"
                placeholder="date(yyyy-mm-dd)"
                onChange={event =>
                  this.handleChange("date", event.target.value)
                }
                type="text"
                required
              />
              <button onClick={this.handleSubmit} name="submitNewExercise">
                Submit
              </button>
              <br />
            </div>
          </div>

          <div className="guidelines">
            <div className="guidelines_title"> Querying Exercise Logs </div>
            <div className="guidelines_paragraphs">
              <div className="paragraphs_intro">
                {" "}
                If you'd like to query an exercise log, you will need the userId
                associated with your account. Example queries are provided below.
              </div>
              <div className="guidelines_paragraph">
                This link will show you all of{" "}
                <a
                  href="https://exercise-tracker-backend.herokuapp.com/api/exercise/log?userId=5bf7a334e52b0900047f60ec"
                  alt="Jasper's exercise logs"
                >
                  {" "}
                  Jasper's exercise logs
                </a>
                .
              </div>
              <div className="guidelines_paragraph">
                This link will query only{" "}
                <a
                  href="https://exercise-tracker-backend.herokuapp.com/api/exercise/log?userId=5bf7a334e52b0900047f60ec&limit=3"
                  alt="Jasper's exercise logs"
                >
                  {" "}
                  three of Jasper's exercise logs
                </a>
                .
              </div>
              <div className="guidelines_paragraph">
                Lastly, this link will query{" "}
                <a
                  href="https://exercise-tracker-backend.herokuapp.com/api/exercise/log?userId=5bf7a334e52b0900047f60ec&from=2018-10-01&to=2018-11-01"
                  alt="Jasper's exercise logs"
                >
                  {" "}
                  Jasper's exercise logs from 2018-10-01 to 2018-11-01
                </a>
                . Looks like Jasper took October off!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
