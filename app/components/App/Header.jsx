import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../stylesheets/App/Header.scss';

const propTypes = {
  onReloadTopicsRequest: PropTypes.func.isRequired,
};

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleDefaultTopicsLoading = this.handleDefaultTopicsLoading.bind(this);
        this.handleRandomTopicsLoading = this.handleRandomTopicsLoading.bind(this);
    }

    handleDefaultTopicsLoading() {
        this.props.onReloadTopicsRequest();
    }

    handleRandomTopicsLoading() {
        this.props.onReloadTopicsRequest('random');
    }

  /**
   * Render
   * @return {ReactComponent}
   */
    render() {
        return (
          <div className={styles.container}>
            <span className={styles.title}>Word Cloud</span>
            <button onClick={this.handleDefaultTopicsLoading}>
                    default
            </button>
            <button onClick={this.handleRandomTopicsLoading}>
                    random
            </button>
          </div>
        );
    }
}

Header.propTypes = propTypes;
