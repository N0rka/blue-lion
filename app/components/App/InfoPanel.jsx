import PropTypes from 'prop-types';
import React from 'react';

import styles from '../../stylesheets/App/InfoPanel.scss';

const propTypes = {
  isDisplayed: PropTypes.bool.isRequired,
  onModifyInfoPanelDisplayRequest: PropTypes.func.isRequired,
};

export default class InfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleDisplayModificationRequest = this.handleDisplayModificationRequest.bind(this);
  }

  handleDisplayModificationRequest() {
    this.props.onModifyInfoPanelDisplayRequest();
  }

  /**
   * Renders a panel informing on the purpose of the project
   * and the available interactions for the user
   * @return {ReactComponent}
   */
  render() {
    if (this.props.isDisplayed) {
      return (
        <div className={styles.container}>
          <div className={styles.section}>
            <h2> <span className={styles.title}>blue-lion</span> is a simple word cloud project for demonstration purpose.</h2>
            <div className={styles.subSection}>
              <span className={styles.subTitle}>In a nutshell..</span>
              <p>It simulates social listening of countries name,
                and display information about the sentiment and the media where the topic appears.</p>
              <span className={styles.note}>
                The more a topic appears in media, the bigger its font-size is.
                The color of the topic depends of its sentiment score.
              </span>
            </div>
            <div className={styles.subSection}>
              <span className={styles.subTitle}>Interactions</span>
              <p>Select a topic to display its detailed information.</p>
              <p>Click on the Default button to generate a list of topics with always the same labels.</p>
              <p>Click on the Random button to generate a list of topics with random labels.</p>
              <span className={styles.note}>Note that in both case, the other values (Sentiment and Media) are always random.</span>
              <p>Hover a piece of the pie chart to display its corresponding percentage.</p>
            </div>
          </div>
          <button
            className={styles.closeButton}
            onClick={this.handleDisplayModificationRequest}
          >
            ^
          </button>
        </div>
      );
    }
    return null;
  }
};

InfoPanel.propTypes = propTypes;
