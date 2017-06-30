import {Action} from '../actions/boardAction'

const initialState: Models.Home.Board[] = [
    {
        name: 'GitHub',
        boardId: 0
    },
    {
        name: '步行街',
        boardId: 1
    },
    {
        name: '湿乎乎',
        boardId: 2
    },
    {
        name: '北邮人十大',
        boardId: 3
    },
];

export default function selectWebsite(state = initialState, action: Action) {
    let newState = [] as Models.Home.Board[];
    switch(action.type) {
        case `Board`:
            console.log("reducer!!!!!!");
            state.forEach((item: Models.Home.Board) => {
                if(item.boardId !== action.id) {
                    newState.push(item);
                } else {
                    newState.push(
                        {
                            name: action.name,
                            boardId: action.id
                        }
                    )
                }
            })
            return newState;
        default:
            return state;
    }
}