const tredux = require('tredux');
const SHOW_ALL = 'show_all',
    SHOW_COMPLETED = 'show_completed',
    SHOW_ACTIVE = 'show_active';

export const TYPE = {
    ADD_TODO: 'ADD_TODO',
    DELETE_TODO : 'DELETE_TODO',
    EDIT_TODO : 'EDIT_TODO',
    COMPLETE_TODO : 'COMPLETE_TODO',
    COMPLETE_ALL :'COMPLETE_ALL',
    CLEAR_COMPLETED : 'CLEAR_COMPLETED',
    SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER'
};

export function addTodo(text) {
    return { type: TYPE.ADD_TODO, text }
}

export function deleteTodo(id) {
    return { type: TYPE.DELETE_TODO, id }
}

export function editTodo(id, text) {
    return { type: TYPE.EDIT_TODO, id, text }
}

export function completeTodo(id) {
    return { type: TYPE.COMPLETE_TODO, id }
}

export function completeAll() {
    return { type: TYPE.COMPLETE_ALL }
}

export function clearCompleted() {
    return { type: TYPE.CLEAR_COMPLETED }
}
export function setVisibilityFilter(currentFilter){
    return { type: TYPE.SET_VISIBILITY_FILTER, currentFilter}
}


tredux.addActions('todos', module.exports);
