import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 * Import action functions
 */
import {
  notifyReloadTopicsRequest,
  updateSelectedWordId,
} from '../actions/cloudActions';
import modifyInfoPanelDisplay from '../actions/infoPanelActions';
import fetchTopics from '../actions/topicsActions';

/**
 * Import reducer functions
 */
import {
  getTopicsTopicList,
  getTopicsIsFetching,
  getTopicsErrorMessage,
  getCloudIsTopicsReloadRequested,
  getInfoPanelIsDisplayed,
} from '../reducers';

/**
 * Import Components
 */
import CloudContainer from './App/Cloud.jsx';
import Header from './App/Header.jsx';
import InfoPanel from './App/InfoPanel.jsx';

const propTypes = {
  fetchTopics: PropTypes.func.isRequired,
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
  })),
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  onReloadTopicsRequest: PropTypes.func,
  isTopicsReloadRequested: PropTypes.bool,
  isInfoPanelDisplayed: PropTypes.bool,
  onModifyInfoPanelDisplayRequest: PropTypes.func,
};

const defaultProps = {
  topicList: [],
  isFetching: false,
  errorMessage: '',
  onReloadTopicsRequest: null,
  isTopicsReloadRequested: false,
  isInfoPanelDisplayed: false,
  onModifyInfoPanelDisplayRequest: null,
};

export class App extends React.Component {
    /**
     * Fetch topics after mounting
     * @return {void} Will dispatch actions to topics reducer
     */
    componentDidMount() {
        this.props.fetchTopics();
    }

  /**
   * Render
   * @return {ReactComponent}
   */
  render() {
    const {
      topicList,
      isFetching,
      errorMessage,
      onReloadTopicsRequest,
      isTopicsReloadRequested,
      isInfoPanelDisplayed,
      onModifyInfoPanelDisplayRequest,
    } = this.props;

    if (errorMessage !== '') {
        return (
          <div>
            <h1>Error</h1>
            <p>{errorMessage}</p>
          </div>
        );
    }
    if (isFetching) {
        return (
          <span>Fetching topics..</span>
        );
    }
    if (topicList.length > 0) {
        return (
          <div>
            <Header
              onReloadTopicsRequest={onReloadTopicsRequest}
              onModifyInfoPanelDisplayRequest={onModifyInfoPanelDisplayRequest}
            />
            <InfoPanel
              isDisplayed={isInfoPanelDisplayed}
              onModifyInfoPanelDisplayRequest={onModifyInfoPanelDisplayRequest}
            />
            <CloudContainer
              width={450}
              height={450}
              topicList={topicList}
              fontSizes={[12, 16, 22, 30, 40, 52]}
              isTopicsReloadRequested={isTopicsReloadRequested}
            />
          </div>
        );
    }

    return (
      <span>Empty topic list..</span>
    );
  }
}

const mapStateToProps = state => ({
        topicList: getTopicsTopicList(state),
        isFetching: getTopicsIsFetching(state),
        errorMessage: getTopicsErrorMessage(state),
        isTopicsReloadRequested: getCloudIsTopicsReloadRequested(state),
        isInfoPanelDisplayed: getInfoPanelIsDisplayed(state),
    });

const mapDispatchToProps = dispatch => ({
        fetchTopics: (topicsType) => {
            dispatch(fetchTopics(topicsType));
        },
        onReloadTopicsRequest: (topicsType) => {
            dispatch(notifyReloadTopicsRequest());
            dispatch(updateSelectedWordId(''));
            dispatch(fetchTopics(topicsType));
        },
        onModifyInfoPanelDisplayRequest: () => {
          dispatch(modifyInfoPanelDisplay());
        },
    });

/**
 * Export the connected App component
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

App.propTypes = propTypes;

App.defaultProps = defaultProps;
