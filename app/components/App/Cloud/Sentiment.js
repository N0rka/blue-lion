import PropTypes from 'prop-types';
import React from 'react';

/**
 * Import styles
 */
import styles from '../../../stylesheets/App/Cloud/Sentiment.scss';

export default class Sentiment extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Renders the volume information of the selected topic
     * @return {ReactComponent}
     */
    render() {
        const { sentimentInfo } = this.props;

        if(sentimentInfo !== null){
            return (
                <div className={styles.section}>
                    <h1>Information on topic "{sentimentInfo.label}".</h1>
                    <h3>Total mentions: {sentimentInfo.volume || '0'}</h3>
                    <p>Positive mentions: <span className={styles.colorGreen}>{sentimentInfo.sentiment.positive || '0'}</span></p>
                    <p>Neutral mentions: {sentimentInfo.sentiment.neutral || '0'}</p>
                    <p>Negative mentions: <span className={styles.colorRed}>{sentimentInfo.sentiment.negative || '0'}</span></p>
                </div>
            );
        }
        return (
            <div className={styles.section}>
                <p>Select a topic to view its information.</p>
            </div>
        );
    }
}

Sentiment.propTypes = {
    sentimentInfo: PropTypes.object
};

Sentiment.defaultProps = {
    sentimentInfo: null,
};
