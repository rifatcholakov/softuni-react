import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Card = ({ article }) => {
    return (
        <div className={styles.card}>
            <Link to={article.link} className={styles.link}>
                <div className={styles['image-box']}>
                    <img
                        src={article.featuredImage}
                        alt={article.title}
                        className={styles.featuredImage}
                    />
                </div>
                <div className={styles['title-box']}>
                    <h2 className={styles.title}>{article.title}</h2>
                </div>
            </Link>
        </div>
    );
};

export default Card;
