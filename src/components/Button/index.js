import React from 'react';
import styles from './index.module.css';

const Button = props => {
    return (
        <input
            onClick={props.onClick}
            className={styles['submit-btn']}
            style={props.styles}
            type="submit"
            value={props.text}
        />
    );
};

export default Button;
