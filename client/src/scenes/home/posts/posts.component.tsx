import * as React from 'react';
import { Loading } from '../../../base-components/loading';
import {Button} from 'antd'

import './posts.style.scss';

interface PropsDefine {
    isFetching: boolean;
    topicList: Models.Base.TopicCard[];
    page?: Models.Base.PageInfo;
    onChange?: ()=>{};
}
export default class Posts extends React.Component<PropsDefine, any> {
    constructor(props: PropsDefine) {
        super(props);
        this.state = {
            loadMore: false
        }
    }

    handleOnScroll(event: any) {
        // console.log(event.view);
    }
    componentWillReceiveProps(nextProps: PropsDefine) {
        this.setState({ loadMore: false });        
    }
    loadMore = () => {
        this.setState({ loadMore: true });
        this.props.onChange();
    }
    render() {
        const { isFetching, topicList, page } = this.props;
        console.log(page)
        let canLoadMore = page.curPage != page.totalPage;
        return (
        <div className="desk-items" onScroll = {this.handleOnScroll.bind(this)}>
            {
            isFetching ? <Loading isFetching={isFetching} /> :
                <ul>
                {
                    topicList.map((post: Models.Base.TopicCard, i: number) => {
                        return (
                            <div className="item" key={i}>
                                <div className="item-name">
                                    <a href={post.url} target="_blank">{post.title}</a>
                                </div>
                                {
                                post.desc ?
                                    <div className="item-container">
                                        <div className="item-content">
                                            <p>{post.desc}</p>
                                        </div>
                                    </div>
                                    : null
                                }
                                <div className="item-annotation">
                                    <p>{post.subdesc}</p>
                                </div>
                            </div>
                        );
                    }, this)
                }
                    <div className="item">
                        <Button className="wide-button" type="primary" loading={this.state.loadMore} onClick={this.loadMore} disabled={!canLoadMore}>
                            {canLoadMore ? '点击加载更多' : '暂无更多内容，可点击刷新'}
                        </Button>
                    </div>
                </ul>
            }
        </div>
        );
    }
}