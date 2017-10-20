/* eslint import/no-extraneous-dependencies: "off" */
import { orderBy } from 'lodash';

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
  return topics.map(topic => Object.assign(
    {},
    topic,
    { fontSize: getFontSize(topic.volume, minVolume, maxVolume, fontSizes) },
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
  if (word.sentimentScore > 60) {
    className = ` ${styles.colorGreen}`;
  } else if (word.sentimentScore < 40) {
    className = ` ${styles.colorRed}`;
  } else {
    className = ` ${styles.colorGrey}`;
  }
  if (word.id === selectedWordId) {
    className += ` ${styles.isSelected}`;
  }

  return className;
};

/**
 * Return sentiment information of the selected word
 * @param  {Object[]} wordList      List of cloud word
 * @param  {Object} selectedWordId  Selected word id
 * @return {Object}                 Sentiment information
 */
export const getCloudSelectedWordSentimentInfo = (wordList, selectedWordId) => {
  if (wordList !== [] && selectedWordId !== '') {
    const selectedWord = wordList.find(w => w.id === selectedWordId);
    return {
      id: selectedWord.id,
      label: selectedWord.label,
      volume: selectedWord.volume,
      sentiment: selectedWord.sentiment,
    };
  }
  return null;
};

/**
 * Return a random int between 2 [included] values
 * @param  {int} minValue    Minimum value
 * @param  {int} maxValue    Maximum value
 * @return {int}        Random value
 */
const getRandomIntInclusive = (minValue, maxValue) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  const maxMinDifference = max - min;
  return Math.floor(Math.random() * (maxMinDifference + 1)) + min;
};

/**
 * Return a random int based on a specific pattern
 * @return {int}        Random value
 */
const getSentimentScoreWithSeed = () => {
  const seed = getRandomIntInclusive(1, 4);
  if (seed < 3) {
    return getRandomIntInclusive(41, 59);
  } else if (seed > 3) {
    return getRandomIntInclusive(60, 99);
  }

  return getRandomIntInclusive(0, 40);
};

/**
 * Return a random int based on a specific pattern
 * @return {int}        Random value
 */
const getSentimentWithSeed = () => {
  const seed = getRandomIntInclusive(1, 8);
  if (seed < 6) {
    return getRandomIntInclusive(0, 39);
  } else if (seed === 6) {
    return getRandomIntInclusive(40, 79);
  } else if (seed === 7) {
    return getRandomIntInclusive(80, 119);
  }

  return getRandomIntInclusive(120, 179);
};

/**
 * Return a list of topics with random numerical values
 * @param  {string}     topicsType          type of generated topics ( 'random' || 'default')
 * @param  {string[]}   topicLabelList      Topic label list
 * @return {Object[]}                       List of topics
 */
export const generateRandomTopics = (topicsType, topicLabelList) => {
  let negativeSentiment = -1;
  let neutralSentiment = -1;
  let positiveSentiment = -1;
  const topicList = topicLabelList.map((t) => {
    negativeSentiment = getSentimentWithSeed();
    neutralSentiment = getSentimentWithSeed();
    positiveSentiment = getSentimentWithSeed();
    return {
      id: `${getRandomIntInclusive(1000000, 9999999)}__${t}`,
      label: t,
      volume: negativeSentiment + neutralSentiment + positiveSentiment,
      type: 'topic',
      sentiment: {
        negative: negativeSentiment,
        neutral: neutralSentiment,
        positive: positiveSentiment,
      },
      sentimentScore: getSentimentScoreWithSeed(),
      burst: getRandomIntInclusive(0, 50),
    };
  });
  if (topicsType === 'random') {
    return topicList.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }

      return 0;
    }).slice(0, getRandomIntInclusive(15, 22));
  }
  return topicList;
};
