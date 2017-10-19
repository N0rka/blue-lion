import d3Cloud from 'd3-cloud';
import PropTypes  from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 * Import action functions
 */
import {
    notifyProcessStart,
    updateWordList,
    updateSelectedWordId
} from '../../actions/cloudActions';

/**
 * Import reducer functions
 */
import {
    getCloudWordList,
    getCloudIsProcessing,
    getCloudSelectedWordId
} from '../../reducers';

/**
 * Import calculation functions
 */
import {
    getTopicsWithFontSize,
    getWordCloudLabelPartialStyle,
    getCloudSelectedWordSentimentInfo
} from '../../utils';

/**
 * Import Components
 */
import Sentiment from './Cloud/Sentiment';
import WordCloud from './Cloud/WordCloud';

/**
 * Import styles
 */
import styles from '../../stylesheets/App/Cloud.scss';
export class Cloud extends React.Component{

    constructor(props) {
        super(props);
        this.calculateWordCloud = this.calculateWordCloud.bind(this);
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
            onD3CloudProcessEnd
        } = this.props;

        onD3CloudProcessStart();
        d3Cloud()
            .size([width, height])
            .words(getTopicsWithFontSize(topics, fontSizes))
            .padding(9)
            .text((w) => w.label)
            .fontSize((w) => w.fontSize)
            .random(() => 0.5)
            .rotate(() => 0)
            .on('end', (wordList) => {
                onD3CloudProcessEnd(wordList);
            })
            .start();
    }

    /**
     * Call cloud processing after mounting
     * @return {void}
     */
    componentDidMount() {
        this.calculateWordCloud();
    }

    componentDidUpdate() {
        if(this.props.isTopicsReloadRequested)
            this.calculateWordCloud();
    }

    /**
     * Render
     * @return {ReactElement} [description]
     */
    render () {
        const {
            width,
            height,
            wordList,
            isProcessing,
            onSelectWord,
            selectedWordId
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
                <Sentiment sentimentInfo={sentimentInfo}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        wordList: getCloudWordList(state),
        isProcessing: getCloudIsProcessing(state),
        selectedWordId: getCloudSelectedWordId(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onD3CloudProcessStart: () => {
            dispatch(notifyProcessStart());
        },
        onD3CloudProcessEnd: (wordList) => {
            dispatch(updateWordList(wordList));
        },
        onSelectWord: (wordId) => {
            dispatch(updateSelectedWordId(wordId));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cloud);

Cloud.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fontSizes: PropTypes.array.isRequired,
    topics: PropTypes.array.isRequired,
    isTopicsReloadRequested: PropTypes.bool.isRequired,
};
