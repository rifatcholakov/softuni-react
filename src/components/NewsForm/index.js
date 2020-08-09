import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { db } from '../../configs/firebase';
import Button from '../Button';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.module.css';

class NewForm extends Component {
    state = {
        title: '',
        urlPath: '',
        featuredImage: '',
        editorState: EditorState.createEmpty(),
        category: 'select-category'
    };

    loadArticle = () => {
        db.collection(this.props.match.params.category)
            .doc(this.props.match.params.postURL)
            .get()
            .then(doc => {
                const data = doc.data();

                this.setState({
                    title: data.title,
                    urlPath: this.props.match.params.postURL,
                    featuredImage: data.featuredImage,
                    category: this.props.match.params.category,
                    editorState: EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            htmlToDraft(data.text).contentBlocks
                        )
                    )
                });
            });
    };

    componentDidMount() {
        if (this.props.editMode) {
            this.loadArticle();
        }
    }

    onFieldChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        });
    };

    updateArticle = () => {
        db.collection(this.state.category)
            .doc(this.state.urlPath)
            .update({
                title: this.state.title,
                featuredImage: this.state.featuredImage,
                text: draftToHtml(
                    convertToRaw(this.state.editorState.getCurrentContent())
                )
            })
            .then(() =>
                this.props.history.push(
                    `/${this.state.category}/${this.state.urlPath}`
                )
            );
    };

    addNewArticle = () => {
        db.collection(this.state.category)
            .doc(this.state.urlPath)
            .set({
                datePosted: Date.now(),
                title: this.state.title,
                featuredImage: this.state.featuredImage,
                text: draftToHtml(
                    convertToRaw(this.state.editorState.getCurrentContent())
                )
            })
            .then(() =>
                this.props.history.push(
                    `/${this.state.category}/${this.state.urlPath}`
                )
            );
    };

    onFormSubmit = e => {
        e.preventDefault();

        if (this.props.editMode) {
            this.updateArticle();
        } else {
            this.addNewArticle();
        }
    };

    render() {
        const { editorState } = this.state;

        return (
            <div>
                <p className={styles.quote}>{this.props.quote}</p>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        onChange={this.onFieldChange}
                        value={this.state.title}
                        type="text"
                        placeholder="Title"
                        className={styles.title}
                        name="title"
                    />

                    <input
                        onChange={this.onFieldChange}
                        value={this.state.urlPath}
                        disabled={this.props.editMode}
                        type="text"
                        placeholder="URL path"
                        className={styles.url}
                        name="urlPath"
                    />

                    <input
                        onChange={this.onFieldChange}
                        value={this.state.featuredImage}
                        type="text"
                        placeholder="Fetured image url"
                        className={styles['featured-image']}
                        name="featuredImage"
                    />

                    <div className={styles.texteditor}>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="demo-wrapper"
                            editorClassName={styles['editor-inside']}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>

                    <select
                        className={styles.category}
                        value={this.state.category}
                        onChange={this.onFieldChange}
                        name="category"
                    >
                        <option value="select-category" disabled>
                            Select category
                        </option>
                        <option value="world">World</option>
                        <option value="politics">Politics</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                        <option value="sport">Sport</option>
                    </select>
                    <Button text="Post" styles={{ display: 'block' }} />
                </form>
            </div>
        );
    }
}

export default NewForm;
