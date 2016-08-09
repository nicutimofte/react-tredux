const tredux = require('tredux');
export const TYPE={
    SET_EDITING: 'SET_EDITING',
    UNSET_EDITING: 'UNSET_EDITING',
    SET_EDIT_TEXT: 'SET_EDIT_TEXT',
    UNSET_EDIT_TEXT:'UNSET_EDIT_TEXT'
};
export function setEditing(id){
    return{ type: TYPE.SET_EDITING,id};
}
export function unsetEditing(){
    return{ type:TYPE.UNSET_EDITING }
}

tredux.addActions('ui',module.exports);