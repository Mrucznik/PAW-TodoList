import React, { Component } from 'react';
import axios from 'axios';

class Trello extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        axios.get('http://localhost:8080/tables')
            .then(response => console.log(response));

    }

  render() {
    return (
      <div className="Trello">
          <header>
            <button className='button' onClick={this.handleClick}>
                Click Me
            </button>

          </header>
      </div>
    );
  }
}

export default Trello;
