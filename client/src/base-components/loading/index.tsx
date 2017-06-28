import * as React from 'react';
import { Spin } from 'antd';

import './loading.scss';
interface PropsDefine {
    isFetching: boolean
}
export class Loading extends React.Component<PropsDefine, any> {
    constructor(props: PropsDefine) {
        super(props);
    }

    render() {
        return (
        <div className="spin">
            <Spin spinning={this.props.isFetching} size="default" />
            Loading
        </div>
        );
    }
}
