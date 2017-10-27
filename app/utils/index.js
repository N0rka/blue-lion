/* eslint import/no-extraneous-dependencies: "off" */
import { orderBy } from 'lodash';

import styles from '../stylesheets/App/Cloud/WordCloud.scss';

/**
 * Return fontSize
 * @param  {int}      volume      Volume of current topic
 * @param  {int}      minVolume   Minimum volume
 * @param  {int}      maxVolume   Maximum volume
 * @param  {int[]}    fontSizes   Available font sizes
 * @return {int}                  FontSize
 */
const getFontSize = (volume, minVolume, maxVolume, fontSizes) => {
  const multiplier = (maxVolume - minVolume) / (fontSizes.length - 1);
  return fontSizes[Math.floor(volume / multiplier)];
};

/**
 * Return an array of topics enriched with their font size
 * @param  {Object[]}   topics      Topic
 * @param  {int[]}      fontSizes   Font sizes
 * @return {Object[]}               Enriched topics
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
 * Note : Very simple function which return browser side class name
 * => won't be tested with jest
 * @param  {Object}   word              Word
 * @param  {Object}   selectedWordId    Selected word id
 * @return {String}                     Class names
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
 * @param  {Object[]}   wordList          List of cloud word
 * @param  {Object}     selectedWordId    Selected word id
 * @return {Object}                       Sentiment information
 */
export const getCloudSelectedWordInfoById = (wordList, selectedWordId) => {
  if (wordList !== [] && selectedWordId !== '') {
    const selectedWord = wordList.find(w => w.id === selectedWordId);
    if (selectedWord !== undefined) {
      return {
        label: selectedWord.label,
        volume: selectedWord.volume,
        sentiment: selectedWord.sentiment,
        pageType: selectedWord.pageType,
      };
    }
  }
  return null;
};

/**
 * Return a random int between 2 [included] values
 * @param  {int}    minValue    Minimum value
 * @param  {int}    maxValue    Maximum value
 * @return {int}                Random value
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
 * Return a list of topics with random numerical values
 * @param  {string}     topicsType        Type of generated topics ( 'random' || 'default')
 * @param  {string[]}   topicLabelList    Topic label list
 * @return {Object[]}                     List of topics
 */
export const generateRandomTopics = (topicsType, topicLabelList) => {
  let volume = -1;
  let negativeSentiment = -1;
  let neutralSentiment = -1;
  let positiveSentiment = -1;
  let facebook = -1;
  let twitter = -1;
  let general = -1;
  let forum = -1;
  let blog = -1;
  let news = -1;
  let video = -1;
  let review = -1;
  let image = -1;
  const topicList = topicLabelList.map((t) => {
    volume = getRandomIntInclusive(50, 300);
    neutralSentiment = getRandomIntInclusive(0, volume);
    positiveSentiment = getRandomIntInclusive(0, volume - neutralSentiment);
    negativeSentiment = volume - neutralSentiment - positiveSentiment;
    facebook = getRandomIntInclusive(0, volume - 25);
    twitter = getRandomIntInclusive(0, volume - facebook - 10);
    general = getRandomIntInclusive(0, volume - facebook - twitter);
    forum = getRandomIntInclusive(0, volume - facebook - twitter - general);
    blog = getRandomIntInclusive(0, volume - facebook - general - forum);
    news = getRandomIntInclusive(0, volume - facebook - general - forum - blog);
    video = getRandomIntInclusive(0, volume - facebook - general - forum - blog - news);
    review = getRandomIntInclusive(0, volume - facebook - general - forum - blog - news - video);
    image = volume - facebook - general - forum - blog - news - video - review;
    return {
      id: `${getRandomIntInclusive(1000000, 9999999)}__${t}`,
      label: t,
      volume,
      type: 'topic',
      sentiment: {
        negative: negativeSentiment,
        neutral: neutralSentiment,
        positive: positiveSentiment,
      },
      sentimentScore: getSentimentScoreWithSeed(),
      burst: getRandomIntInclusive(0, 50),
      pageType: {
        blog,
        facebook,
        forum,
        general,
        image,
        news,
        review,
        twitter,
        video,
      },
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
