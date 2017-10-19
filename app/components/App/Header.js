import PropTypes from 'prop-types';
import React from 'react';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleDefaultTopicsLoading = this.handleDefaultTopicsLoading.bind(this);
        this.handleRandomTopicsLoading = this.handleRandomTopicsLoading.bind(this);
    }

    handleDefaultTopicsLoading() {
        console.log('default button clicked');
        this.props.onReloadTopicsRequest();
    }

    handleRandomTopicsLoading() {
        console.log('random button cliked');
        this.props.onReloadTopicsRequest('random');
    }

    render() {
        return (
            <div>
                <h1>Word Cloud</h1>
                <button onClick={this.handleDefaultTopicsLoading}>
                    default
                </button>
                <button onClick={this.handleRandomTopicsLoading}>
                    random
                </button>
            </div>
        );
    }
}

Header.propTypes = {
    onReloadTopicsRequest: PropTypes.func.isRequired,
};
