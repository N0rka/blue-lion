import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 * Import action functions
 */
import fetchTopics from '../actions/topicsActions';
import {
    notifyReloadTopicsRequest,
    updateSelectedWordId,
} from '../actions/cloudActions';

/**
 * Import reducer functions
 */
import {
    getTopicsGeneralInfo,
    getTopicsIsFetching,
    getTopicsErrorMessage,
    getCloudIsTopicsReloadRequested,
} from '../reducers';

/**
 * Import Components
 */
import CloudContainer from './App/Cloud.jsx';
import Header from './App/Header.jsx';

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
            topicsGeneralInfo,
            isFetching,
            errorMessage,
            onReloadTopicsRequest,
            isTopicsReloadRequested,
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
        if (topicsGeneralInfo.length > 0) {
            return (
              <div>
                <Header
                  onReloadTopicsRequest={onReloadTopicsRequest}
                />
                <CloudContainer
                  width={450}
                  height={450}
                  topics={topicsGeneralInfo}
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
        topicsGeneralInfo: getTopicsGeneralInfo(state),
        isFetching: getTopicsIsFetching(state),
        errorMessage: getTopicsErrorMessage(state),
        isTopicsReloadRequested: getCloudIsTopicsReloadRequested(state),
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
    });

/**
 * Export the connected App component
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

App.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  topicsGeneralInfo: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  onReloadTopicsRequest: PropTypes.func,
  isTopicsReloadRequested: PropTypes.bool,
};

App.defaultProps = {
  topicsGeneralInfo: [],
  isFetching: false,
  errorMessage: '',
  onReloadTopicsRequest: null,
  isTopicsReloadRequested: false,
};
