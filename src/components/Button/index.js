import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
    text: PropTypes.string.isRequired,
    styles: PropTypes.object,
    onClick: PropTypes.func
};

export default Button;
