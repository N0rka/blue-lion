import PropTypes from 'prop-types';
import React from 'react';

/**
 * Import styles
 */
import styles from '../../../stylesheets/App/Cloud/InfoBar.scss';

/**
 * Import Components
 */
import PageType from './InfoBar/PageType.jsx';
import Sentiment from './InfoBar/Sentiment.jsx';

const propTypes = {
  selectedWordInfo: PropTypes.shape({
    label: PropTypes.string,
    volume: PropTypes.number,
    sentiment: PropTypes.shape({
      positive: PropTypes.number,
      neutral: PropTypes.number,
      negative: PropTypes.number,
    }),
    pageType: PropTypes.shape({
      blog: PropTypes.number,
      facebook: PropTypes.number,
      forum: PropTypes.number,
      general: PropTypes.number,
      image: PropTypes.number,
      news: PropTypes.number,
      review: PropTypes.number,
      twitter: PropTypes.number,
      video: PropTypes.number,
    }),
  }),
  pieChartPercentage: PropTypes.number.isRequired,
  onPathOver: PropTypes.func.isRequired,
  onPathOut: PropTypes.func.isRequired,
};

const defaultProps = {
  selectedWordInfo: null,
};

const InfoBar = (props) => {
  /**
   * Renders selected topic information
   * @return {ReactComponent}
   */
  const {
    selectedWordInfo,
    pieChartPercentage,
    onPathOver,
    onPathOut
  } = props;

  if (selectedWordInfo !== null) {
    return (
      <div className={styles.container}>
        <div className={styles.label}>
          <h1>Info on topic {selectedWordInfo.label}</h1>
        </div>
        <Sentiment
          volume={selectedWordInfo.volume}
          sentiment={selectedWordInfo.sentiment}
        />
        <PageType
          pageType={selectedWordInfo.pageType}
          pieChartPercentage={pieChartPercentage}
          onPathOver={onPathOver}
          onPathOut={onPathOut}
        />
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <p>Select a topic to view its information.</p>
    </div>
  );
};

export default InfoBar;

InfoBar.propTypes = propTypes;

InfoBar.defaultProps = defaultProps;
