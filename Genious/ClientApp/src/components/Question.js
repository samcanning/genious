import React, { Component } from 'react';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(e) {
        this.setState({ selected: e.target.value });
    }

    render() {
        return (
            <div id="activeQuestion" data-question-id={this.props.id}>
                <p>{this.props.text}</p>
                <div onChange={this.onChangeValue}>
                    <label htmlFor="yes">
                        <input type="radio" name="answer" id="yes" value="1" /> Yes
                    </label>
                    <br />
                    <label htmlFor="no">
                        <input type="radio" name="answer" id="no" value="2" /> No
                    </label>
                    <br />
                    <label htmlFor="dontknow">
                        <input type="radio" name="answer" id="dontknow" value="3" /> Don't know
                    </label>
                    <br />
                    <label htmlFor="probably">
                        <input type="radio" name="answer" id="probably" value="4" /> Probably
                    </label>
                    <br />
                    <label htmlFor="probablynot">
                        <input type="radio" name="answer" id="probablynot" value="5" /> Probably not
                    </label>
                    <br />
                </div>
                <button className="btn btn-primary" onClick={() => this.props.submitAnswer(this.state.selected)} disabled={this.state.selected == null}>Submit</button>
            </div>
        );
    }
}