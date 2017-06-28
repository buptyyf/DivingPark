declare namespace Models {
    namespace Base {

        /** 通用接口返回 */
        export interface WebBaseStruct<T> {
            data: T
            message: string
        }

        /** 通用翻页返回 */
        export interface PagedList<T> {
            list?: T[]
            page?: PageInfo
        }
        
        /** 通用page */
        export interface PageInfo {
            curPage?: number
            totalPage?: number
        }

        /** 通用topic card */
        export interface TopicCard {
            title?: string
            url?: string 
            desc?: string
            subdesc?: string
        }
    }
}