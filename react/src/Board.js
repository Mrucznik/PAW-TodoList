import React, { Component } from 'react';
import './Board.css'


class Board extends Component {
  render() {
    return (
        <div class="board">
            <div class="row">
                <div class="list">
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                    <button class="addCardButton">Add Card</button>
                </div>
                <div class="list">
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                    <button class="addCardButton">Add Card</button>
                </div>
                <div class="list">
                    <div class="card"></div>
                    <div class="card"></div>
                    <button class="addCardButton">Add Card</button>
                </div>
                <button class="addCardButton">Add List</button>
            </div>
        </div>
    );
  }
}

export default Board;
