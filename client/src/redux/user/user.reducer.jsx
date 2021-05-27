import ACTION_TYPES from './user.actions.types'

let INITIAL_STATE={
    user:null
}
const UserReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case ACTION_TYPES.LOGIN_SYNC_TASK:
            return {...state,user:action.payload}
        case ACTION_TYPES.LOGOUT:
            return {}
        default:
            return state
    }
}
export default UserReducer