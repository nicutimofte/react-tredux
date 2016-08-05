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
    id: 0
},{
    text: 'Use Tredux',
    completed: false,
    id: 1
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
    )
});
reducer.handle(TYPE.EDIT_TODO,(state,data)=>{
    state.allTodos.map(todo=>{
        return todo.id === data.id ?
            Object.assign(todo, {text: data.text}) :
            todo
    })
});
reducer.handle(TYPE.COMPLETE_TODO,(state,data)=>{
    state.allTodos.map(todo=>{
        return todo.id === data.id ?
            Object.assign(todo, {completed: !todo.completed}) :
            todo;
    })
});
reducer.handle(TYPE.COMPLETE_ALL,(state,data)=>{
    const areAllMarked = state.allTodos.every(todo=>todo.completed);

    state.allTodos.map((todo)=>
        Object.assign(todo,{completed: !areAllMarked})
    )
});
reducer.handle(TYPE.CLEAR_COMPLETED,(state)=>{
    state.allTodos= state.allTodos.filter((todo)=>
        todo.completed === false
        );
});
reducer.handle(TYPE.SET_VISIBILITY_FILTER,(state,data)=>{
   if(data.currentFilter){
       filter.currentFilter=data.currentFilter;
        filter.filterFunction=TODO_FILTERS[data.currentFilter];
   }
});