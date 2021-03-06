import React, { Component } from 'react';

export class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const questions = this.props.items.map((i) => {
            let value = "";
            if (i.a.Value === 1) {
                value = "Yes";
            } else if (i.a.Value === 2) {
                value = "No";
            } else if (i.a.Value === 3) {
                value = "Don't know";
            } else if (i.a.Value === 4) {
                value = "Probably";
            } else if (i.a.Value === 5) {
                value = "Probably not";
            }

            return <li key={i.q.questionId}>{i.q.text} {value}</li>
        });

        return (
            <div id="previousQuestions" style={{ marginTop: "10px" }}>
                <ul>
                    {questions}
                </ul>
            </div>
        );
    }
}