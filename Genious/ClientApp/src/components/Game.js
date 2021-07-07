import React, { Component } from 'react';
import { Question } from './Question';
import { History } from './History';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuestion: null,
            history: [],
            characters: [],
            inProgress: false
        };
        this.startGame = this.startGame.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.askQuestion = this.askQuestion.bind(this);
        this.finalizeResults = this.finalizeResults.bind(this);
    }

    startGame() {
        this.setState({ inProgress: true }, () => this.askQuestion());
    }

    askQuestion() {
        let askedIds = [];
        this.state.history.forEach(h => askedIds.push(h.q.questionId));
        
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                askedQuestionIds: askedIds,
                possibleCharacters: this.state.characters
            })
        };

        fetch('/Game/NewQuestion', options).then(response => response.json())
            .then(data => {
                this.setState({ activeQuestion: data });
            });
    }

    handleAnswer(e) {
        this.setState((prevState) => {
            let q = prevState.activeQuestion;
            let a = {
                QuestionId: q.questionId,
                Value: parseInt(e)
            };
            return {
                activeQuestion: null,
                history: [...prevState.history, { q: q, a: a }]
            };
        }, () => {
            let answers = [];
            this.state.history.forEach(h => answers.push(h.a));

            let options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accepted': 'application/json' },
                body: JSON.stringify(answers)
            };

            fetch('/Game/SubmitAnswer', options).then(response => response.json())
                .then(data => {
                    this.setState({ characters: data }, () => {
                        if (this.state.characters.length === 0) {
                            //prompt user for character name
                            alert("I give up!");
                        } else if (this.state.characters.length === 1) {
                            this.setState({ activeQuestion: null });
                        } else {
                            this.askQuestion();
                        }
                    });
                });
        });
    }

    finalizeResults(newCharacter) {
        let answers = [];
        this.state.history.forEach(h => answers.push(h.a));

        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accepted': 'application/json' },
            body: JSON.stringify({
                answers: answers,
                character: this.state.characters[0],
                newCharacter: newCharacter
            })
        };

        fetch('/Game/FinalizeResults', options).then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

    render() {
        return (
            <div>
                <h1>Genious</h1>
                <button className="btn btn-primary" onClick={this.startGame} style={{ display: this.state.inProgress ? "none" : "" }}>Play</button>
                { this.state.characters.length === 1 &&
                    <div>
                        { this.state.characters[0].imageLink != null &&
                            <img src={this.state.characters[0].imageLink} alt={this.state.characters[0].name} />
                        }
                        <p>Is your character {this.state.characters[0].name}?</p>
                        <button className="btn btn-success" onClick={() => this.finalizeResults(false)}>Yes</button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={() => alert("You win!")}>No</button>
                    </div>
                }
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
