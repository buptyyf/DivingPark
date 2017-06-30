export interface Action {
    type?: string
    name?: string
    id?: number
}

class BoardAction {
    public selectBoardList = (name: string, id: number) => {
        return (
            {
                type: `Board`,
                name,
                id
            }
        )
    }
}

const BoardActions = new BoardAction();
export {
    BoardActions,
};