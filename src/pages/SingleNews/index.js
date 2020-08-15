import React, { Component } from 'react';
import { db } from '../../configs/firebase';
import styles from './index.module.css';
import Button from '../../components/Button';
import { AuthContext } from '../../providers/AuthProvider';

class SingleNews extends Component {
    state = {
        featuredImage: '',
        title: '',
        text: '',
        datePostedString: ''
    };

    static contextType = AuthContext;

    componentDidMount() {
        const category = this.props.match.params.category;
        const url = this.props.match.params.postURL;

        db.collection(category)
            .doc(url)
            .get()
            .then(doc => {
                const article = doc.data();
                this.setState({
                    ...article
                });

                this.setState({
                    datePostedString: new Date(
                        this.state.datePosted
                    ).toLocaleDateString()
                });

                if (!article) {
                    this.props.history.push('/not-found');
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/not-found');
            });
    }

    onEdit = () => {
        const category = this.props.match.params.category;
        const url = this.props.match.params.postURL;

        this.props.history.push(`/edit/${category}/${url}`);
    };

    onDelete = () => {
        const category = this.props.match.params.category;
        const url = this.props.match.params.postURL;

        db.collection(category)
            .doc(url)
            .delete()
            .then(() => this.props.history.push('/'));
    };

    render() {
        const { currentUser } = this.context;

        return (
            <article>
                <img
                    className={styles['featured-image']}
                    src={this.state.featuredImage}
                    alt={this.state.title}
                />
                <h2 className={styles.title}>{this.state.title}</h2>
                <time className={styles.date}>
                    Posted: {this.state.datePostedString}
                </time>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                        __html: this.state.text
                    }}
                ></div>
                {currentUser ? (
                    <div className={styles.buttons}>
                        <Button text="Edit" onClick={this.onEdit} />
                        <Button
                            text="Delete"
                            styles={{
                                backgroundColor: '#dc3545',
                                marginLeft: '7px',
                                marginTop: '5px'
                            }}
                            onClick={this.onDelete}
                        />
                    </div>
                ) : (
                    ''
                )}
            </article>
        );
    }
}

export default SingleNews;
