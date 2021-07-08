import React, { Component } from 'react';

export class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const prompt = this.props.results ? "Is your character listed here?" : "What is your character's name?";
        const results = this.props.results ? this.props.results.map((r) => <li key={r.characterId} data-id={r.characterId} onClick={(e) => this.props.selectName(e)}>{r.name} ({r.source})</li>) : null;

        return (
            <div>
                <p>{prompt}</p>
                <input type="text" onChange={(e) => this.props.updateName(e)} /> <button className="btn btn-primary" onClick={this.props.searchName}>Search</button>
                { this.props.results &&
                    <ul style={{ marginTop: "10px" }}>
                        {results}
                    </ul>
                }
            </div>
        );
    }
}