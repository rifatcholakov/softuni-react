import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import SimpleReactValidator from 'simple-react-validator';

import { db } from '../../configs/firebase';
import Button from '../Button';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.module.css';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            element: (message, className) => (
                <div className={className}>{message}</div>
            )
        });

        this.state = {
            title: '',
            urlPath: '',
            featuredImage: '',
            editorState: EditorState.createEmpty(),
            category: ''
        };
    }

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
        const mode = this.props.match.url.split('/')[1];

        if (mode === 'edit') {
            this.loadArticle();
        }
    }

    onFieldChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
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

        if (this.validator.allValid()) {
            if (this.props.editMode) {
                this.updateArticle();
            } else {
                this.addNewArticle();
            }
        } else {
            this.validator.showMessages();
        }
    };

    render() {
        const { editorState } = this.state;

        return (
            <div>
                <p className={styles.quote}>Make sure the story is great 😉</p>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        onChange={this.onFieldChange}
                        value={this.state.title}
                        type="text"
                        placeholder="Title"
                        className={styles.title}
                        name="title"
                    />
                    {this.validator.message(
                        'title',
                        this.state.title,
                        'required',
                        { className: styles.error }
                    )}

                    <input
                        onChange={this.onFieldChange}
                        value={this.state.urlPath}
                        disabled={this.props.editMode}
                        type="text"
                        placeholder="URL path"
                        className={styles.url}
                        name="urlPath"
                    />
                    {this.validator.message(
                        'urlPath',
                        this.state.urlPath,
                        'required|alpha_num_dash',
                        { className: styles.error }
                    )}

                    <input
                        onChange={this.onFieldChange}
                        value={this.state.featuredImage}
                        type="text"
                        placeholder="Fetured image url"
                        className={styles['featured-image']}
                        name="featuredImage"
                    />
                    {this.validator.message(
                        'featuredImage',
                        this.state.featuredImage,
                        'required|url',
                        { className: styles.error }
                    )}

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
                        <option value="" disabled>
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
                    {this.validator.message(
                        'category',
                        this.state.category,
                        'required',
                        { className: styles.error }
                    )}

                    <Button
                        text={this.props.editMode ? 'Update' : 'Post'}
                        styles={{ display: 'block' }}
                    />
                </form>
            </div>
        );
    }
}

export default NewForm;
