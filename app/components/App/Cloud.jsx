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
  updateInfoBarPieChartPercentage,
} from '../../actions/cloudActions';

/**
 * Import reducer functions
 */
import {
  getCloudWordList,
  getCloudIsProcessing,
  getCloudSelectedWordId,
  getCloudPieChartPercentage,
} from '../../reducers';

/**
 * Import calculation functions
 */
import {
  getTopicsWithFontSize,
  getWordCloudLabelPartialStyle,
  getCloudSelectedWordInfoById,
} from '../../utils';

/**
 * Import Components
 */
import InfoBar from './Cloud/InfoBar.jsx';
import WordCloud from './Cloud/WordCloud.jsx';

/**
 * Import styles
 */
import styles from '../../stylesheets/App/Cloud.scss';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fontSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  topicList: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  isTopicsReloadRequested: PropTypes.bool.isRequired,
  cloudWordList: PropTypes.arrayOf(PropTypes.shape({
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
  pieChartPercentage: PropTypes.number,
  onPathOver: PropTypes.func,
  onPathOut: PropTypes.func,
};

const defaultProps = {
  cloudWordList: [],
  isProcessing: false,
  selectedWordId: '',
  onD3CloudProcessStart: null,
  onD3CloudProcessEnd: null,
  onSelectWord: null,
  pieChartPercentage: -1,
  onPathOver: null,
  onPathOut: null,
};

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
    if (this.props.topicList.length === 0 || this.props.isProcessing) {
      return;
    }
    const {
      width,
      height,
      fontSizes,
      topicList,
      onD3CloudProcessStart,
      onD3CloudProcessEnd,
    } = this.props;

    onD3CloudProcessStart();
    d3Cloud()
      .size([width, height])
      .words(getTopicsWithFontSize(topicList, fontSizes))
      .padding(9)
      .text(w => w.label)
      .fontSize(w => w.fontSize)
      .random(() => 0.5)
      .rotate(() => 0)
      .on('end', (cloudWordList) => {
        onD3CloudProcessEnd(cloudWordList);
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
      topicList,
      cloudWordList,
      isProcessing,
      onSelectWord,
      selectedWordId,
      pieChartPercentage,
      onPathOver,
      onPathOut,
    } = this.props;
    const selectedWordInfo = getCloudSelectedWordInfoById(topicList, selectedWordId);

    return (
      <div className={styles.container}>
        <WordCloud
          width={width}
          height={height}
          wordList={cloudWordList}
          isProcessing={isProcessing}
          getWordCloudLabelPartialStyle={getWordCloudLabelPartialStyle}
          onSelectWord={onSelectWord}
          selectedWordId={selectedWordId}
        />
        <InfoBar
          selectedWordInfo={selectedWordInfo}
          pieChartPercentage={pieChartPercentage}
          onPathOver={onPathOver}
          onPathOut={onPathOut}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cloudWordList: getCloudWordList(state),
  isProcessing: getCloudIsProcessing(state),
  selectedWordId: getCloudSelectedWordId(state),
  pieChartPercentage: getCloudPieChartPercentage(state),
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
  onPathOver: (percentage) => {
    dispatch(updateInfoBarPieChartPercentage(percentage));
  },
  onPathOut: () => {
    dispatch(updateInfoBarPieChartPercentage(-1));
  },
});

/**
 * Export the connected App component
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cloud);

Cloud.propTypes = propTypes;

Cloud.defaultProps = defaultProps;
