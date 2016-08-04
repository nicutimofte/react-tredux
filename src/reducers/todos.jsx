const {TYPE} = require('actions/index.jsx');
const tredux=require('tredux');

mockData=[{
    text: 'Don`t use Redux',
    completed: true,
    id: 0
},{
    text: 'Use Tredux',
    completed: false,
    id: 1
}];
const reducer=tredux.reducer('todos',{
    filter:"SHOW_ALL",
    todos:mockData
});

reducer.handle(TYPE.ADD_TODO,(state,data)=>{
      state.todos.concat({
           text: data.text,
           completed:false,
           id:state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
       });
    return state;
});
reducer.handle(TYPE.DELETE_TODO,(state,data)=>{
    return state.todos.filter(todo=>
        todo.id !== data.id
    )
});
reducer.handle(TYPE.EDIT_TODO,(state,data)=>{
    return state.todos.map(todo=>{
        return todo.id === data.id ?
            Object.assign({},todo, {text:data.text}):
            todo
    })
});
reducer.handle(TYPE.COMPLETE_TODO,(state,data)=>{
    return state.todos.map(todo=>{
        return todo.id === data.id ?
            Object.assign({},todo,{completed: !todo.completed}):
            todo;
    })
});
reducer.handle(TYPE.COMPLETE_ALL,(state,data)=>{
    const areAllMarked = state.every(todo=>todo.completed);
    return state.todos.map(todo=>Object.assign({},todo,{completed:!areAllMarked}))
});
reducer.handle(TYPE.CLEAR_COMPLETE,(state)=>{
    return state.filter(todo.completed === false);
});
reducer.handle(TYPE.SET_VISIBILITY_FILTER,(state,data)=>{
    return Object.assign({},state,{filter:data.filter});
});