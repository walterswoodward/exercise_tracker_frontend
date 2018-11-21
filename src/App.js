import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">Exercise Tracker</div>
        <div className="createUserForm">
          POST /api/exercise/new-user
          <input className="create_input" placeholder="username" />
          <button>Submit</button>
        </div>
        <div className="updateUserForm">
          POST /api/exercise/add
          <input className="update_input" placeholder="userId*" />
          <input className="update_input" placeholder="description*" />
          <input className="update_input" placeholder="duration*(mins.)" />
          <input className="update_input" placeholder="date(yyyy-mm-dd)" />
          <button>Submit</button>
          GET users's exercise log: GET /api/exercise/log?USERID
          [&from][&to][&limit]
          {} = required, [ ] = optional from, to = dates (yyyy-mm-dd); limit =
          number
        </div>
      </div>
    );
  }
}

export default App;
