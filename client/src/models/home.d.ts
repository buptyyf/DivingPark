declare namespace Models {
    namespace Home {

        /** 话题列表状态 */
        export interface TopicBoardStore {
            isFetching?: boolean
            topicList?: Models.Base.TopicCard[]
            boardId?: number
            page?: Models.Base.PageInfo
        }

        /** 选择站点信息 */
        export interface Board {
            boardId?: number //取0、1、2、3分别表示四个版面
            name?: string
        }
    }
}