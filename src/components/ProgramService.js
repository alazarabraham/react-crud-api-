import React, { Component } from 'react';
export default class ProgramService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      programId: "",
      programName: ''
        };

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // get all entities - GET
    fetch("http://localhost:8080/api/programs", {
      "method": "GET",
      "headers": {
        'Accept': "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
      this.setState({
        programs: response
      })
    })
    .catch(err => { console.log(err); 
    });
  }

  create(e) {
    // add entity - POST
    e.preventDefault();

    // creates entity
    fetch("http://localhost:8080/api/programs", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        programName: this.state.programName,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

    // this will update entries with PUT
    fetch(`http://localhost:8080/api/programs/${this.state.programId}`, {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
            programId: this.state.programId,
            programName: this.state.programName,
        })
        })
        .then(response => response.json())
        .then(response => { console.log(response);
        })
        .catch(err => { console.log(err); });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(`http://localhost:8080/api/programs/${this.state.programId}`, {
      "method": "DELETE",
      "headers": {
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Make An API Call in React</h1>
              <table>
                <thead>
                    <tr>
                        <th>Program ID</th>
                        <th>Program Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.programs && this.state.programs.map(program => {
                        return <tr>
                            <td>{program.programId}</td>
                            <td>{program.programName}</td>
                        </tr>
                    })}
                </tbody>
            </table>
              <form className="d-flex flex-column">
                <legend className="text-center">Add-Update-Delete program</legend>
                <label htmlFor="programId">
                  Program ID:
                  <input
                    name="programId"
                    id="programId"
                    type="text"
                    className="form-control"
                    value={this.state.programId}
                    onChange={(e) => this.handleChange({ programId: e.target.value })}
                    />
                </label>
                <label htmlFor="name">
                  Program Name:
                  <input
                    name="programName"
                    id="programName"
                    type="text"
                    className="form-control"
                    value={this.state.programName}
                    onChange={(e) => this.handleChange({ programName: e.target.value })}
                    required
                    />
                </label>

               
                <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                  Add
                </button>
                <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                    Update
                </button>
                <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                    Delete
                </button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

