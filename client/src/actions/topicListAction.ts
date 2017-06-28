'use strict';

import { NetworkAction } from './networkAction';

const TopicListUrl = {
    gitHub: `api/github/repo_list`,
    hupuBxj: `api/hupu/bxj`,
    hupuShh: `api/hupu/shh`,
    byrTopTen: `api/byrbbs/topten`,
    segmentfault: `api/segmentfault/blogs/`,
    jobbole: `api/jobbole/news/`,
    hacker: `api/hacker/news/`
};
const preTypeStr = `topicList`;
export const TopicListActionTypes = {
    FetchingData: preTypeStr + `Fetching`,
    SuccessGetData: preTypeStr + 'Success',
    FetchDataError: preTypeStr + 'Fail',
}

class TopicListAction extends NetworkAction<{}, Models.Base.PagedList<Models.Base.TopicCard>> {
    /**
     * 写法一：中间加dispatch
     */
    
    public getTopicList = (type: string, id: number, page = 1) => (dispatch: (obj: any)=>{}) => {
        if(page === 1) {
            console.log("refresh!!!!!")
            dispatch({type: TopicListActionTypes.FetchingData, id: id});
        }
        let url = this.mapUrl(type, page);
        // console.log("getTopicList!!!!!")
        let result = this.promiseNetwork({url});
        result.then((res: Models.Base.WebBaseStruct<Models.Base.PagedList<Models.Base.TopicCard>>) => {
            console.log(res.data);
            let message = res.message, data = res.data;
            if(data && data.page) {
                dispatch({type: TopicListActionTypes.SuccessGetData, topicList: data.list, id, page: data.page});
            } else if(data) {
                dispatch({type: TopicListActionTypes.SuccessGetData, topicList: data.list, id});                
            } else {
                console.log(message);
                dispatch({'type': TopicListActionTypes.FetchDataError, error: message});
            }
        }).catch((e) => {
            console.log(e);
            dispatch({'type': TopicListActionTypes.FetchDataError, error: e});
        })
    }

    private mapUrl = (name: string, page: number): string => {
        let url;
        switch(name) {
            case '步行街':
                url = TopicListUrl.hupuBxj + `/${page}`;
                break;
            case '湿乎乎':
                url = TopicListUrl.hupuShh + `/${page}`;
                break;
            case 'GitHub':
                url = TopicListUrl.gitHub;
                break;
            case '北邮人十大':
                url = TopicListUrl.byrTopTen;
                break;
            case '伯乐头条':
                url = TopicListUrl.jobbole + `/${page}`;
                break;
            case 'hacker':
                url = TopicListUrl.hacker + `/${page}`;
                break;
            case 'segmentfault':
                url = TopicListUrl.segmentfault + `/${page}`;
                break;
            default:
                url = TopicListUrl.gitHub;
        }
        return url;
    }
}

const TopicListActions = new TopicListAction();
export {
    TopicListActions,
};