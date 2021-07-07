import React, { Component } from 'react';
import { Question } from './Question';
import { History } from './History';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuestion: null,
            history: [],
            character: {},
            inProgress: false
        };
        this.startGame = this.startGame.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    startGame() {
        fetch('game/getquestion').then(response => response.json())
            .then(data => {
                this.setState((prevState) => {
                    return {
                        activeQuestion: data[0],
                        inProgress: true
                    }
                });
            });
    }

    handleAnswer(e) {
        this.setState((prevState) => {
            let q = prevState.activeQuestion;
            let a = {
                questionId: q.questionId,
                value: e
            };
            return {
                activeQuestion: null,
                history: [...prevState.history, { q: q, a: a }]
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Genious</h1>
                <button className="btn btn-primary" onClick={this.startGame} style={{ display: this.state.inProgress ? "none" : "" }}>Play</button>
                { this.state.activeQuestion != null &&
                    <Question
                        id={this.state.activeQuestion.questionId}
                        text={this.state.activeQuestion.text}
                        submitAnswer={this.handleAnswer}
                    />
                }
                <History items={this.state.history} />
            </div>
        );
    }
}
