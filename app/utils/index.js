import { orderBy }  from 'lodash';

import styles from '../stylesheets/App/Cloud/WordCloud.scss';

/**
 * Return fontSize
 * @param  {int} volume       Volume of current topic
 * @param  {int} minVolume    minimum volume
 * @param  {int} maxVolume    maximum volume
 * @param  {int[]} fontSizes  available font sizes
 * @return {int}              FontSize
 */
function getFontSize(volume, minVolume, maxVolume, fontSizes) {
    const multiplier = (maxVolume - minVolume) / (fontSizes.length - 1);
    return fontSizes[Math.floor(volume / multiplier)];
}

/**
 * Return an array of topics enriched with their font size
 * @param  {Object[]} topics    Topic
 * @param  {int[]} fontSizes    font sizes
 * @return {Object[]}           Enriched topics
 */
export const getTopicsWithFontSize = (topics, fontSizes) => {
    const sortedTopics = orderBy(topics, 'volume');
    const minVolume = sortedTopics[0].volume;
    const maxVolume = sortedTopics[sortedTopics.length - 1].volume;
    return topics.map( topic => Object.assign(
        {},
        topic,
        { fontSize: getFontSize(topic.volume, minVolume, maxVolume, fontSizes) }
    ));
};

/**
 * Generate class names according to its characteristics
 * @param  {Object} word            Word
 * @param  {Object} selectedWordId  Selected word id
 * @return {String}                 Class names
 */
export const getWordCloudLabelPartialStyle = (word, selectedWordId) => {
    let className = '';
    if(word.sentimentScore > 60){
        className = (' ' + styles.colorGreen);
    } else if(word.sentimentScore < 40){
        className = (' ' + styles.colorRed);
    } else {
        className = (' ' + styles.colorGrey);
    }
    if(word.id === selectedWordId)
        className += (' ' + styles.isSelected);
    return className;
};

/**
 * Return sentiment information of the selected word
 * @param  {Object[]} wordList      List of cloud word
 * @param  {Object} selectedWordId  Selected word id
 * @return {Object}                 Sentiment information
 */
export const getCloudSelectedWordSentimentInfo = (wordList, selectedWordId) => {
    if(wordList !==[] && selectedWordId !== ''){
        const selectedWord = wordList.find(w => w.id === selectedWordId);
        return {
            id: selectedWord.id,
            label: selectedWord.label,
            volume: selectedWord.volume,
            sentiment: selectedWord.sentiment,
        }
    }
    return null;
};
