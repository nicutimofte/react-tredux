const {TYPE} = require('actions/ui.jsx');
const tredux=require('tredux');


const reducer=tredux.reducer('ui',{
    editingTodo: null,
    editText:null
});
reducer.handle(TYPE.SET_EDITING,(state,data)=>{
   if(data.id>=0){
       state.editingTodo=data.id;
   }
    return state;
});
reducer.handle(TYPE.UNSET_EDITING,(state)=>{
    state.editingTodo=null;
    return state;
});