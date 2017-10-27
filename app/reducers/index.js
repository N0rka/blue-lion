import { combineReducers } from 'redux';

import cloud, * as fromCloud from './cloud';
import topics, * as fromTopics from './topics';
import infoPanel, * as fromInfoPanel from './infoPanel';


/**
 * Combine other reducers
 */
const rootReducer = combineReducers({
  cloud,
  topics,
  infoPanel,
});
export default rootReducer;

export const getTopicsTopicList = state =>
  fromTopics.getTopicList(state.topics);

export const getTopicsIsFetching = state =>
  fromTopics.getIsFetching(state.topics);

export const getTopicsErrorMessage = state =>
  fromTopics.getErrorMessage(state.topics);

export const getCloudWordList = state =>
  fromCloud.getWordList(state.cloud);

export const getCloudIsProcessing = state =>
  fromCloud.getIsProcessing(state.cloud);

export const getCloudSelectedWordId = state =>
  fromCloud.getSelectedWordId(state.cloud);

export const getCloudIsTopicsReloadRequested = state =>
  fromCloud.getIsTopicsReloadRequested(state.cloud);

export const getCloudPieChartPercentage = state =>
  fromCloud.getPieChartPercentage(state.cloud);

export const getInfoPanelIsDisplayed = state =>
  fromInfoPanel.getIsDisplayed(state.infoPanel);
