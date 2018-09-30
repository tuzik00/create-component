import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'

import './test.styl';


class test extends Component {
    static blockClassName = test;

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {};


    constructor(props) {
        super(props);

        this.state = {};
    }


    componentDidMount() {

    }


    render() {
        const { children, className } = this.props;

        const classNames = cn(
            test.blockClassName,
            className
        );

        return (
            <div className={classNames}>
                {children}
            </div>
        );
    }
}


export default test;