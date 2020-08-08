import React, { Component } from 'react';

class SingleNews extends Component {
    state = {
        date: null,
        title: null,
        content: null
    };

    render() {
        return (
            <article>
                <h2>Title</h2>
                <div></div>
            </article>
        );
    }
}

export default SingleNews;
