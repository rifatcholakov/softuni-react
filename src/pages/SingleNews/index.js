import React, { Component } from 'react';
import { db } from '../../configs/firebase';

class SingleNews extends Component {
    state = {
        newsArticle: {}
    };

    componentDidMount() {
        const category = this.props.match.params.category;
        const url = this.props.match.params.postURL;

        db.collection(category)
            .doc(url)
            .get()
            .then(doc => {
                const newsArticle = doc.data();
                console.log(newsArticle);
                this.setState({
                    newsArticle
                });
                console.log(this.state.newsArticle);
            });
    }

    render() {
        return (
            <article>
                <img
                    src={this.state.newsArticle.featuredImage}
                    alt={this.state.newsArticle.title}
                />
                <h2>{this.state.newsArticle.title}</h2>
                <div></div>
            </article>
        );
    }
}

export default SingleNews;
