import React, { Component, Fragment } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons";

import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: "https://exercise-tracker-backend.herokuapp.com",
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
      
        axios
        .post(`${URL}/api/exercise/new-user/`, {
            username: newUser
        })
        .then(response => {
            alert(`New User ${newUser} Successfully Added! You will be redirected to your new profile data. Please save your id to add exercises!`);
        })
        .catch(err => {
            console.log(err);
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
          .get(`${URL}/api/exercise/users/${userId}`)
          .then(response => {
            axios
              .post(`${URL}/api/exercise/new-exercise/`, {
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
                window.location.href = `${URL}/api/exercise/logs/${
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
          <Fragment>
              <Header/>
              <Main/>
              <Footer/>
          </Fragment>
      )
  }
}

export default App;
