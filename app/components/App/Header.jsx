import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../stylesheets/App/Header.scss';

const propTypes = {
  onReloadTopicsRequest: PropTypes.func.isRequired,
  onModifyInfoPanelDisplayRequest: PropTypes.func.isRequired,
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleDefaultTopicsLoading = this.handleDefaultTopicsLoading.bind(this);
    this.handleRandomTopicsLoading = this.handleRandomTopicsLoading.bind(this);
    this.handleInfoPanelDisplayModificationRequest = this.handleInfoPanelDisplayModificationRequest.bind(this);
  }

  handleDefaultTopicsLoading() {
      this.props.onReloadTopicsRequest();
  }

  handleRandomTopicsLoading() {
      this.props.onReloadTopicsRequest('random');
  }

  handleInfoPanelDisplayModificationRequest() {
    this.props.onModifyInfoPanelDisplayRequest();
  }

  /**
   * Render
   * @return {ReactComponent}
   */
    render() {
        return (
          <div className={styles.container}>
            <span className={styles.title}>Word Cloud</span>
            <button
              className={styles.infoButton}
              onClick={this.handleInfoPanelDisplayModificationRequest}
            >
              i
            </button>
            <button
              className={styles.reloadTopicsButton}
              onClick={this.handleDefaultTopicsLoading}
            >
              Default
            </button>
            <button
              className={styles.reloadTopicsButton}
              onClick={this.handleRandomTopicsLoading}
            >
              Random
            </button>
          </div>
        );
    }
}

Header.propTypes = propTypes;
