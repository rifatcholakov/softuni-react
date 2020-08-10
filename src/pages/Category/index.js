import React, { useEffect, useState } from 'react';
import { db } from '../../configs/firebase';
import Card from '../../components/Card';
import styles from './index.module.css';

const Category = props => {
    const category = props.location.pathname.split('/')[2];

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        db.collection(category)
            .get()
            .then(querySnapshot => {
                setArticles(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
            });
    }, [category]);

    return (
        <div className={styles.container}>
            {articles.map(article => (
                <Card
                    article={{ ...article, link: `/${category}/${article.id}` }}
                    key={article.id}
                />
            ))}
        </div>
    );
};

export default Category;
