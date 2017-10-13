import React from 'react';
import { connect } from 'react-redux';

/**
 * Import action functions
 */
import { fetchTopics } from '../actions/topicsActions';

/**
 * Import reducer functions
 */
import {
    getTopicsGeneralInfo,
    getTopicsIsFetching,
    getTopicsErrorMessage
} from '../reducers';

/**
 * Import Components
 */
import Cloud from './App/Cloud';

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
            errorMessage
        } = this.props;
// browsers: ['last 2 versions', 'ie > 8']
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
                <Cloud
                    width={400}
                    height={400}
                    topics={topicsGeneralInfo}
                    fontSizes={[12, 16, 22, 30, 40, 52]}
                />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopics: () => {
            dispatch(fetchTopics());
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
