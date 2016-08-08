const {TYPE} = require('actions/index.jsx');
const tredux=require('tredux');

const SHOW_ALL = 'show_all',
             SHOW_COMPLETED = 'show_completed',
             SHOW_ACTIVE = 'show_active';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

const mockData=[{
    text: 'Don`t use Redux',
    completed: true,
    id: 1
},{
    text: 'Use Tredux',
    completed: false,
    id: 2
}];
const reducer=tredux.reducer('todos',{
    filter:{
        currentFilter: SHOW_ALL,
        filterFunction:TODO_FILTERS[SHOW_ALL]
    },
    allTodos: mockData
});

reducer.handle(TYPE.ADD_TODO,(state,data)=>{
     state.allTodos=state.allTodos.concat({
           text: data.text,
           completed:false,
           id: state.allTodos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
       });
    return state;
});
reducer.handle(TYPE.DELETE_TODO,(state,data)=>{
   state.allTodos = state.allTodos.filter(todo=>
        todo.id !== data.id
    );
    return state;
});
reducer.handle(TYPE.EDIT_TODO,(state,data)=>{
    state.allTodos.map(todo=>{
        return todo.id === data.id ?
            Object.assign(todo, {text: data.text}) :
            todo
    });
    return state;
});
reducer.handle(TYPE.COMPLETE_TODO,(state,data)=>{
    state.allTodos.map(todo=>{
        return todo.id === data.id ?
            Object.assign(todo, {completed: !todo.completed}) :
            todo;
    },this);
    return state;
});
reducer.handle(TYPE.COMPLETE_ALL,(state)=>{
    const areAllMarked = state.allTodos.every(todo=>todo.completed);

    state.allTodos.map((todo)=>{
        return Object.assign(todo, {completed: !areAllMarked});
    },this);
    return state;
});
reducer.handle(TYPE.CLEAR_COMPLETED,(state)=>{
    state.allTodos= state.allTodos.filter((todo)=>
        todo.completed === false
        );
    return state;
});
reducer.handle(TYPE.SET_VISIBILITY_FILTER,(state,data)=>{
   if(data.currentFilter){
       state.filter.currentFilter=data.currentFilter;
       state.filter.filterFunction=TODO_FILTERS[data.currentFilter];
   }
    return state;
});