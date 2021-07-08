import React, { Component } from 'react';

export class Character extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let text = this.props.confirmed ?
            `Your character was ${this.props.name} from ${this.props.source}! Thanks for playing!`
            : `Is your character ${this.props.name} from ${this.props.source}?`;

        return (
            <div>
                { this.props.imageLink &&
                    <img src={this.props.imageLink} alt={this.props.name + ' from ' + this.props.source} />
                }
                <p>{text}</p>
                { !this.props.confirmed &&
                    <div>
                        <button className="btn btn-success" onClick={() => this.props.finalizeResults(false)}>Yes</button> <button className="btn btn-danger" onClick={() => alert("You win!")}>No</button>
                    </div>
                }
            </div>
        );
    }
}