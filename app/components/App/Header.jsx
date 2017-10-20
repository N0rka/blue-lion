import PropTypes from 'prop-types';
import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleDefaultTopicsLoading = this.handleDefaultTopicsLoading.bind(this);
        this.handleRandomTopicsLoading = this.handleRandomTopicsLoading.bind(this);
    }

    handleDefaultTopicsLoading() {
        this.props.onReloadTopicsRequest();
    }

    handleRandomTopicsLoading() {
        this.props.onReloadTopicsRequest('random');
    }

  /**
   * Render
   * @return {ReactComponent}
   */
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
