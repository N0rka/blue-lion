import React from 'react';
import { connect } from 'react-redux';

/**
 * Import action functions
 */
import { fetchTopics } from '../actions/topicsActions';
import {
    notifyReloadTopicsRequest,
    updateSelectedWordId
} from '../actions/cloudActions';

/**
 * Import reducer functions
 */
import {
    getTopicsGeneralInfo,
    getTopicsIsFetching,
    getTopicsErrorMessage,
    getCloudIsTopicsReloadRequested
} from '../reducers';

/**
 * Import Components
 */
import Cloud from './App/Cloud';
import Header from './App/Header';

export class App extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Fetch topics after mounting
     * @return {void} Will dispatch actions to topics reducer
     */
    componentDidMount() {
        this.props.fetchTopics();
    }

    /**
     * Render App component
     * @return {ReactElement} App component
     */
    render() {
        const {
            topicsGeneralInfo,
            isFetching,
            errorMessage,
            onReloadTopicsRequest,
            isTopicsReloadRequested
        } = this.props;
        if(errorMessage !== ''){
            return (
                <div>
                    <h1>Error</h1>
                    <p>{errorMessage}</p>
                </div>
            );
        }
        if(isFetching){
            return (
                <span>Fetching topics..</span>
            );
        }
        if(topicsGeneralInfo.length > 0){
            return (
                <div>
                    <Header
                        onReloadTopicsRequest={onReloadTopicsRequest}
                    />
                    <Cloud
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

const mapStateToProps = state => {
    return {
        topicsGeneralInfo: getTopicsGeneralInfo(state),
        isFetching: getTopicsIsFetching(state),
        errorMessage: getTopicsErrorMessage(state),
        isTopicsReloadRequested: getCloudIsTopicsReloadRequested(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopics: (topicsType) => {
            dispatch(fetchTopics(topicsType));
        },
        onReloadTopicsRequest: (topicsType) => {
            dispatch(notifyReloadTopicsRequest());
            dispatch(updateSelectedWordId(''));
            dispatch(fetchTopics(topicsType));
        },
    };
};

/**
 * Export the connected App component
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
