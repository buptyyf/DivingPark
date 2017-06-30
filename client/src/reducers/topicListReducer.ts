import {TopicListActionTypes as Types, Action} from '../actions/topicListAction'
let pageInfo: Models.Base.PageInfo = {
    curPage: 1,
    totalPage: 1
}
const initialState: Models.Home.TopicBoardStore[] = [
    {
        isFetching: true,
        topicList: [],
        boardId: 0,
        page: pageInfo
    },
    {
        isFetching: true,
        topicList: [],
        boardId: 1,
        page: pageInfo        
    },
    {
        isFetching: true,
        topicList: [],
        boardId: 2,
        page: pageInfo  
    },
    {
        isFetching: true,
        topicList: [],
        boardId: 3,
        page: pageInfo
    },
];

export default function topicList(state = initialState, action: Action) {
    let newState = [] as Models.Home.TopicBoardStore[];
    switch(action.type) {
        case Types.FetchingData:
            console.log("reducer fetching")
            state.forEach((item) => {
                if(item.boardId !== action.id) {
                    newState.push(item);
                } else {
                    newState.push(
                        Object.assign(item, {isFetching: true})
                    );
                }
            })
            return newState;
        case Types.SuccessGetData:
            state.forEach((item) => {
                if(item.boardId !== action.id) {
                    newState.push(item);
                } else {
                    let newTopicList = [];
                    if(!action.page || (action.page && action.page.curPage == 1)) {
                        newTopicList = action.topicList
                    } else { // 合并时去重
                        newTopicList = item.topicList.concat(action.topicList);
                        // newTopicList = [...new Set(item.topicList.concat(action.topicList))];
                    }
                    newState.push(
                        {
                            isFetching: false,
                            topicList: newTopicList, // 合并新拉到的数据和之前的数据
                            boardId: action.id,
                            page: action.page || pageInfo
                        }
                    );
                }
            })
            return newState;
        default:
            return state;
    }
}