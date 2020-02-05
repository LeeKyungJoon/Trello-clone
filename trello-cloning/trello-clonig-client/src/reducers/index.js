
import {CONSTANTS} from '../actions';

const initialState = {
    boards: [
    ],
    users: [
    ]
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case CONSTANTS.GET_ALL_USERS:
            return {
                ...state,
                users: action.payload.data
            }
        
        case CONSTANTS.GET_USERS:
            return {
                ...state,
                boards: action.payload.data.boards
            }
        case CONSTANTS.GET_LISTS:
            return {
                ...state,
                lists: action.payload
            }
        case CONSTANTS.CREATE_BOARD:
            return {
                ...state,
                oldboards: action.payload.data
            }    

        case CONSTANTS.EDIT_NAME:
            let newstateUserName = {
                ...state, users: action.payload.data
            }
            return newstateUserName


        case CONSTANTS.ADD_CARD:
            const updatedItems = state.boards.map(board => {
                const updatedCardList = board.lists.map(list => {
                    if (list._id === action.payload.list) {
                        return {
                            ...list,
                            cards: [...list.cards, { cardtitle: action.payload.cardtitle, _id: action.payload._id }]
                        };
                    }
                    return list;

                });
                return {
                    ...board,
                    lists: [...updatedCardList]
                };
            });
            const updatedStateAfterAddingList = { ...state, boards: [...updatedItems] };

            return updatedStateAfterAddingList;

        case CONSTANTS.DELETE_CARD:
            let deleteCard = state.boards.map(board => {
                let listWithUpdatedCards = board.lists.map(list => {
                    let cardsToStay = list.cards.filter(card => card._id !== action.payload.deletedResource._id);
                    let newListWithCardDelete = {
                        ...list, cards: cardsToStay
                    };
                    return newListWithCardDelete;
                });
                return { ...board, lists: listWithUpdatedCards };
            });

            let newState = {
                ...state, boards: deleteCard
            };

            return newState;

        case CONSTANTS.EDIT_CARD:
            const cardsTitlePayload = { ...action.payload }
            let newTest = state.boards.map(board => {
                let editCardList = board.lists.map(list => {
                    let newCardTitle = list.cards.map(card => {
                        if(card._id === cardsTitlePayload._id){
                            card.cardtitle = cardsTitlePayload.cardtitle
                        }
                        return {...card}
                    })
                    return {...list, cards: newCardTitle}
                })
                return {...board, lists: editCardList}
            })
            let newnewnew = {
                ...state, boards: newTest
            }
            return newnewnew

        case CONSTANTS.ADD_LIST:
            const updatedLists = state.boards.map(board => {
                if (board._id === action.payload.board) {
                    return {
                        ...board,
                        lists: [...board.lists, { listtitle: action.payload.listtitle, _id: action.payload._id, cards: [] }]
                    };
                }
                return board;
            });
            const newBoardState = { ...state, boards: [...updatedLists] };

            return newBoardState;

        case CONSTANTS.DELETE_LIST:
            let boardWithDeleteList = state.boards.map(board => {
                let deleteList = board.lists.filter(list => list._id !== action.payload.deletedResource._id);
                let updatedBoard = {
                    ...board, lists: deleteList
                };
                return updatedBoard;
            });

            let updatedBoardState = {
                ...state,
                boards: boardWithDeleteList
            };

            return updatedBoardState;

        case CONSTANTS.EDIT_LIST:
            const listsTitlePayload = { ...action.payload }
            let newlistTest = state.boards.map(board => {
                let editListTitle = board.lists.map(list => {
                    if(list._id === listsTitlePayload._id){
                        list.listtitle = listsTitlePayload.listtitle
                    }  
                    return {...list}
                })
                return {...board, lists: editListTitle}
            })
            let newstateList = {
                ...state, boards: newlistTest
            }
            return newstateList

        case CONSTANTS.ADD_BOARD:
            const boardsPayload = { ...action.payload, lists: [] };
            const updatedBoardLists = {
                ...state, boards: [...state.boards, boardsPayload]
            };
            return updatedBoardLists;

        case CONSTANTS.DELETE_BOARD:
            let deleteBoard = state.boards.filter(board => board._id !== action.payload.deletedResource._id);

            let updatedSetBoardState = {
                ...state,
                boards: deleteBoard
            }

            return updatedSetBoardState

        case CONSTANTS.EDIT_BOARD:
            const boardsTitlePayload = { ...action.payload }
            let newboardTest = state.boards.map(board => {
                if(board._id === boardsTitlePayload._id){
                    board.boardtitle = boardsTitlePayload.boardtitle
                }
                return {...board}
            })
            let newstateBoard = {
                ...state, boards: newboardTest
            }
            return newstateBoard
        
        default:
            return state;

    }
};
export default rootReducer;

