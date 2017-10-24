import PropTypes from 'prop-types';
import React from 'react';

/**
 * Import styles
 */
import styles from '../../../stylesheets/App/Cloud/WordCloud.scss';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  wordList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    volume: PropTypes.number,
    type: PropTypes.string,
    sentiment: PropTypes.shape({
      positive: PropTypes.number,
      neutral: PropTypes.number,
      negative: PropTypes.number,
    }),
    sentimentScore: PropTypes.number,
    burst: PropTypes.number,
    font: PropTypes.string,
    fontSize: PropTypes.number,
    hasText: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.number,
    rotate: PropTypes.number,
    size: PropTypes.number,
    style: PropTypes.string,
    text: PropTypes.string,
    weight: PropTypes.string,
    x: PropTypes.number,
    x0: PropTypes.number,
    x1: PropTypes.number,
    xoff: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number,
    yoff: PropTypes.number,
  })).isRequired,
  getWordCloudLabelPartialStyle: PropTypes.func.isRequired,
  onSelectWord: PropTypes.func.isRequired,
  selectedWordId: PropTypes.string.isRequired,
};

const WordCloud = (props) => {
    /**
     * Render the word cloud as svg using d3
     * @return {ReactComponent}
     */
        const {
            width,
            height,
            isProcessing,
            wordList,
            getWordCloudLabelPartialStyle,
            onSelectWord,
            selectedWordId,
        } = props;

        if (isProcessing) {
            return (
              <div className={styles.section}>
                <span>Cloud is processing..</span>
              </div>
            );
        }

        if (wordList.length > 0) {
            return (
              <div className={styles.section}>
                <svg width={width} height={height}>
                  <g transform={`translate(${[width / 2, height / 2]})`}>
                    {wordList.map(word => (
                      <text
                        className={getWordCloudLabelPartialStyle(word, selectedWordId)}
                        key={word.id}
                        style={
                          { fontSize: word.size }
                        }
                        onClick={() => onSelectWord(word.id)}
                        textAnchor="middle"
                        transform={`translate(${word.x}, ${word.y})`}
                      >
                        {word.text}
                      </text>
                      ))
                    }
                  </g>
                </svg>
              </div>
            );
        }

        return (
          <div className={styles.section}>
            <span>Cloud - Empty word list..</span>
          </div>
        );
};

export default WordCloud;

WordCloud.propTypes = propTypes;
