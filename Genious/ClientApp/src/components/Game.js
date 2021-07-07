import React, { Component } from 'react';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            character: {},
            inProgress: false
        };
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        fetch('game/getquestion').then(response => response.json()).then(data => this.setState((state) => { return { inProgress: !state.inProgress } }));
    }

    render() {
        return (
            <div>
                <h1>Genious</h1>
                <button className="btn btn-primary" onClick={this.startGame} style={{ display: this.state.inProgress ? "none" : "" }}>Play</button>
            </div>
        );
    }
}
