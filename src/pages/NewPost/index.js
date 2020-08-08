import React, { Component } from 'react';
import NewsForm from '../../components/NewsForm';
import styles from './index.module.css';

const NewPost = () => {
    return (
        <div>
            <p className={styles.quote}>Remeber: You Make The News! 🙂</p>
            <NewsForm />
        </div>
    );
};

export default NewPost;
