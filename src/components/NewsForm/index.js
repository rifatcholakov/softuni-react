import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { db } from '../../configs/firebase';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.module.css';

class NewForm extends Component {
    state = {
        title: null,
        urlPath: null,
        featuredImage: null,
        category: 'select-category',
        editorState: EditorState.createEmpty()
    };

    onTitleChange = e => {
        this.setState({ title: e.target.value });
    };

    onUrlChange = e => {
        this.setState({ urlPath: e.target.value });
    };

    onFeaturedImageChange = e => {
        this.setState({ featuredImage: e.target.value });
    };

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        });
    };

    onCategoryChange = e => {
        this.setState({ category: e.target.value });
    };

    onFormSubmit = e => {
        e.preventDefault();

        const { editorState } = this.state;

        db.collection(this.state.category)
            .doc(this.state.urlPath)
            .set({
                datePosted: Date.now(),
                title: this.state.title,
                featuredImage: this.state.featuredImage,
                text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
            })
            .then(() => {
                console.log('Successfully posted.');
            });
    };

    render() {
        const { editorState } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <input
                    onChange={this.onTitleChange}
                    type="text"
                    placeholder="Title"
                    className={styles.title}
                />

                <input
                    onChange={this.onUrlChange}
                    type="text"
                    placeholder="URL path"
                    className={styles.url}
                />

                <input
                    onChange={this.onFeaturedImageChange}
                    type="text"
                    placeholder="Fetured image url"
                    className={styles['featured-image']}
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
                    onChange={this.onCategoryChange}
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
                <input
                    className={styles['submit-btn']}
                    type="submit"
                    value="Post"
                />
            </form>
        );
    }
}

export default NewForm;
