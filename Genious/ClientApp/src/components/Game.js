import React, { Component } from 'react';
import { Question } from './Question';
import { History } from './History';
import { Character } from './Character';
import { Search } from './Search';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuestion: null,
            history: [],
            characters: [],
            inProgress: false,
            incorrect: false,
            name: null,
            searchResults: null,
            playButtonText: "Play"
        };
        this.startGame = this.startGame.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.askQuestion = this.askQuestion.bind(this);
        this.finalizeResults = this.finalizeResults.bind(this);
        this.updateName = this.updateName.bind(this);
        this.searchName = this.searchName.bind(this);
        this.confirmName = this.confirmName.bind(this);
    }

    startGame() {
        this.setState({
            activeQuestion: null,
            history: [],
            characters: [],
            inProgress: true,
            incorrect: false,
            name: null,
            searchResults: null
        }, () => this.askQuestion());
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
                Value: parseInt(e, 10)
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
                            this.setState({ incorrect: true });
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
                this.setState({
                    characters: [data],
                    inProgress: false,
                    incorrect: false,
                    playButtonText: "Play again"
                });
            });
    }

    updateName(e) {
        this.setState({ name: e.target.value });
    }

    searchName() {
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accepted': 'application/json' },
            body: JSON.stringify(this.state.name)
        };

        fetch('/Game/SearchCharacter', options).then(response => response.json())
            .then(data => this.setState({ searchResults: data }));
    }

    confirmName(e) {
        let characterId = e.target.getAttribute("data-id");
        this.setState({ characters: [{ CharacterId: characterId }] }, () => this.finalizeResults(false));
    }

    render() {
        return (
            <div>
                <h1>Genious</h1>
                { (!this.state.incorrect && this.state.characters.length === 1) &&
                    <Character
                        name={this.state.characters[0].name}
                        source={this.state.characters[0].source}
                        imageLink={this.state.characters[0].imageLink}
                        confirmed={!this.state.inProgress}
                        finalizeResults={this.finalizeResults}
                    />
                }
                {
                    this.state.incorrect &&
                    <Search results={this.state.searchResults} updateName={this.updateName} searchName={this.searchName} selectName={this.confirmName} />
                }
                {
                    !this.state.inProgress &&
                    <button className="btn btn-primary" onClick={(e) => this.startGame(e)}>{this.state.playButtonText}</button>
                }
                { this.state.activeQuestion != null &&
                    <Question
                        id={this.state.activeQuestion.questionId}
                        text={this.state.activeQuestion.text}
                        submitAnswer={this.handleAnswer}
                    />
                }
                { !this.state.incorrect &&
                    <History items={this.state.history} />
                }
            </div>
        );
    }
}
