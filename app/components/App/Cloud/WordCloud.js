import PropTypes from "prop-types";
import React from 'react';

/**
 * Import styles
 */
import styles from '../../../stylesheets/App/Cloud/WordCloud.scss';

export default class WordCloud extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Render the word cloud as svg using d3
     * @return {ReactComponent}
     */
    render() {
        const {
            width,
            height,
            isProcessing,
            wordList,
            getWordCloudLabelPartialStyle,
            onSelectWord,
            selectedWordId
        } = this.props;

        if(isProcessing){
            return (
                <div className={styles.section}>
                    <span>Cloud is processing..</span>
                </div>
            );
        }
        if(wordList.length > 0){
            return (
                <div  className={styles.section}>
                    <svg width={width} height={height}>
                        <g transform={'translate(' + [width/2, height/2] + ')'}>
                            {wordList.map(word =>
                                <text
                                    className={getWordCloudLabelPartialStyle(word, selectedWordId)}
                                    key={word.id}
                                    style={{
                                        fontSize: word.size,
                                    }}
                                    onClick={() => onSelectWord(word.id)}
                                    textAnchor='middle'
                                    transform={'translate(' + word.x + ', ' + word.y + ')'}
                                >{word.text}</text>
                            )}
                        </g>
                    </svg>
                </div>
            );
        }
        return(
            <div  className={styles.section}>
                <span>Cloud - Empty word list..</span>
            </div>
        );
    }
}

WordCloud.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    wordList: PropTypes.array.isRequired,
    getWordCloudLabelPartialStyle: PropTypes.func.isRequired,
    onSelectWord: PropTypes.func.isRequired,
    selectedWordId: PropTypes.string.isRequired,
};
