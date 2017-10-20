import d3Cloud from 'd3-cloud';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 * Import action functions
 */
import {
    notifyProcessStart,
    updateWordList,
    updateSelectedWordId,
} from '../../actions/cloudActions';

/**
 * Import reducer functions
 */
import {
    getCloudWordList,
    getCloudIsProcessing,
    getCloudSelectedWordId,
} from '../../reducers';

/**
 * Import calculation functions
 */
import {
    getTopicsWithFontSize,
    getWordCloudLabelPartialStyle,
    getCloudSelectedWordSentimentInfo,
} from '../../utils';

/**
 * Import Components
 */
import Sentiment from './Cloud/Sentiment.jsx';
import WordCloud from './Cloud/WordCloud.jsx';

/**
 * Import styles
 */
import styles from '../../stylesheets/App/Cloud.scss';

export class Cloud extends React.Component {
    constructor(props) {
        super(props);
        this.calculateWordCloud = this.calculateWordCloud.bind(this);
    }

    /**
     * Call cloud processing after mounting
     * @return {void}
     */
    componentDidMount() {
        this.calculateWordCloud();
    }

    componentDidUpdate() {
        if (this.props.isTopicsReloadRequested) { this.calculateWordCloud(); }
    }

  /**
   * Generate word cloud
   * @return {void} Will dispatch actions to cloud reducer
   */
  calculateWordCloud() {
    if (this.props.topics.length === 0 || this.props.isProcessing) {
      return;
    }
    const {
      width,
      height,
      fontSizes,
      topics,
      onD3CloudProcessStart,
      onD3CloudProcessEnd,
    } = this.props;

    onD3CloudProcessStart();
    d3Cloud()
      .size([width, height])
      .words(getTopicsWithFontSize(topics, fontSizes))
      .padding(9)
      .text(w => w.label)
      .fontSize(w => w.fontSize)
      .random(() => 0.5)
      .rotate(() => 0)
      .on('end', (wordList) => {
        onD3CloudProcessEnd(wordList);
      })
      .start();
  }

    /**
     * Render
     * @return {ReactComponent}
     */
    render() {
        const {
            width,
            height,
            wordList,
            isProcessing,
            onSelectWord,
            selectedWordId,
        } = this.props;
        const sentimentInfo = getCloudSelectedWordSentimentInfo(wordList, selectedWordId);

        return (
          <div className={styles.container}>
            <WordCloud
              width={width}
              height={height}
              wordList={wordList}
              isProcessing={isProcessing}
              getWordCloudLabelPartialStyle={getWordCloudLabelPartialStyle}
              onSelectWord={onSelectWord}
              selectedWordId={selectedWordId}
            />
            <Sentiment sentimentInfo={sentimentInfo} />
          </div>
        );
    }
}

const mapStateToProps = state => ({
  wordList: getCloudWordList(state),
  isProcessing: getCloudIsProcessing(state),
  selectedWordId: getCloudSelectedWordId(state),
});

const mapDispatchToProps = dispatch => ({
  onD3CloudProcessStart: () => {
    dispatch(notifyProcessStart());
  },
  onD3CloudProcessEnd: (wordList) => {
    dispatch(updateWordList(wordList));
  },
  onSelectWord: (wordId) => {
    dispatch(updateSelectedWordId(wordId));
  },
});

/**
 * Export the connected App component
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cloud);

Cloud.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fontSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired,
  isTopicsReloadRequested: PropTypes.bool.isRequired,
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
    })),
  isProcessing: PropTypes.bool,
  selectedWordId: PropTypes.string,
  onD3CloudProcessStart: PropTypes.func,
  onD3CloudProcessEnd: PropTypes.func,
  onSelectWord: PropTypes.func,
};

Cloud.defaultProps = {
  wordList: [],
  isProcessing: false,
  selectedWordId: '',
  onD3CloudProcessStart: null,
  onD3CloudProcessEnd: null,
  onSelectWord: null,
};
