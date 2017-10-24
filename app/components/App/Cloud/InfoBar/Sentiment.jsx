import PropTypes from 'prop-types';
import React from 'react';

/**
 * Import styles
 */
import styles from '../../../../stylesheets/App/Cloud/InfoBar/Sentiment.scss';

const propTypes = {
  volume: PropTypes.number.isRequired,
  sentiment: PropTypes.shape({
    positive: PropTypes.number,
    neutral: PropTypes.number,
    negative: PropTypes.number,
  }).isRequired,
};

const Sentiment = (props) => {
  /**
   * Renders the volume information of the selected topic
   * @return {ReactComponent}
   */
  const { volume, sentiment } = props;

  return (
    <div className={styles.section}>
      <h3>Total mentions: {volume || '0'}</h3>
      <p>Positive mentions: <span className={styles.colorGreen}>{sentiment.positive || '0'}</span></p>
      <p>Neutral mentions: {sentiment.neutral || '0'}</p>
      <p>Negative mentions: <span className={styles.colorRed}>{sentiment.negative || '0'}</span></p>
    </div>
  );
};

export default Sentiment;

Sentiment.propTypes = propTypes;
