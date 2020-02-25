const initialState = {
    text: '',
    todos: []
};

const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_TODO':
            return {...state, todos : action.payload.todos}
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, {todoName : action.payload.text, id: action.payload.id}]
            }
        case 'UPDATE_TODO':
            let todosTmp = state.todos;
            const { key, text } = action.payload;
            todosTmp = todosTmp.find(o => o.id === key);
            todosTmp['todoName'] = text;
            //todosTmp[key] = {todoName : text};
            return {
                ...state,
                todos: [...state.todos]
            }
        case 'DELETE_TODO':
            let delIndex = state.todos.findIndex(o => o.id === action.payload);
            state.todos.splice(delIndex, 1)
            return {
                ...state,
                todos: [...state.todos]
            }
        default:
            return state;
    }
};

export default todoReducer;