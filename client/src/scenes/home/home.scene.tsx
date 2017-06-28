import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {TopicListActions} from '../../actions/topicListAction';
import {BoardActions} from '../../actions/boardAction';
import {Icon} from 'antd';
import Posts from './posts/posts.component';
import Pickers from './pickers/pickers.component'


import './home.style.scss';
export interface PropsDefine extends RouteComponentProps<any> { 
    // dispatch?: (obj: any) => {}  // 写法一，不用mapDispatchToProps时。
    selectWebsiteList?: Models.Home.Board[]
    topicBoardList: Models.Home.TopicBoardStore[]
}
interface DispatchProps {
    getTopicListAction: (name: string, id: number, page?: number) => any,
    selectBoardListAction: (name: string, id: number) => any
}
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Home extends React.Component<PropsDefine & DispatchProps, any> {
    constructor(props: PropsDefine & DispatchProps) {
        super(props);
        console.log(this.props);
    }

    componentDidMount() {
        this.props.selectWebsiteList.forEach((element: Models.Home.Board) => {
            // this.props.dispatch(TopicListActions.getTopicList(element.name, element.boardId));
            this.props.getTopicListAction(element.name, element.boardId);
        });

    }

    componentWillReceiveProps(nextProps: PropsDefine) {
        for (const value of nextProps.selectWebsiteList) {
            if (value.name !== this.props.selectWebsiteList[value.boardId].name) {
                this.props.getTopicListAction(value.name, value.boardId);
                // nextProps.dispatch(TopicListActions.getTopicList(value.name, value.boardId));
            }
        }
    }
    getTopics(name: string, id: number, page: number) {
        this.props.getTopicListAction(name, id, page);
        // this.props.dispatch(TopicListActions.getTopicList(name, id, page));        
    }
    selectWebsite(name: string, id: number) {
        this.props.selectBoardListAction(name, id);
        // this.props.dispatch(BoardActions.selectBoardList(name, id));
    }
    render() {
        let {selectWebsiteList, topicBoardList} = this.props
        console.log("#render# topicList: ", topicBoardList)
        const options = ['GitHub', '步行街', '湿乎乎', '北邮人十大', 'segmentfault', '伯乐头条', 'hacker'];
        const boards = [];
        for (const value of selectWebsiteList) {
            boards.push(value.boardId);
        }
        return (
        <div className="mega">
            <div className="header">
            <a href="https://github.com/buptyyf" className="button" target="_blank">
                <Icon type="github" />
                <span> Star</span>
            </a>
            </div>
            <main>
            <div className="desk-container">
                {boards.map((board: number, index: number) => {
                    let name = selectWebsiteList[board].name;
                    return (
                        <div className="desk" style={{ opacity: 1 }} key = {index}>
                            <Pickers value={name}
                                onChange={this.selectWebsite.bind(this)}
                                options={options}
                                id={board}
                                fresh={this.getTopics.bind(this, name, board, 1)}
                            />
                            <Posts
                                isFetching={topicBoardList[board].isFetching}
                                topicList={topicBoardList[board].topicList}
                                page={topicBoardList[board].page}
                                onChange={this.getTopics.bind(this, name, board, Number(topicBoardList[board].page.curPage) + 1)}
                            />
                        </div>
                    )
                })}
                
            </div>
            </main>
        </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    console.log("#mapStateToProps# state: ", state);
    return {
        topicBoardList: state.topicListStore,
        selectWebsiteList: state.selectWebsiteStore,
    };
}
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    getTopicListAction: bindActionCreators(TopicListActions.getTopicList, dispatch),
    selectBoardListAction: bindActionCreators(BoardActions.selectBoardList, dispatch)
});

export default connect<any,any,any>(mapStateToProps, mapDispatchToProps)(Home)