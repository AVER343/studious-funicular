import ACTION_TYPES from '../action-types/action.types'
const INITAL_STATE={
    response:[]
}
const ResponseReducer =(state=INITAL_STATE,action)=>{
    switch(action.type){
        case ACTION_TYPES.ADD_RESPONSE:
            return {...state,response:[...action.payload]}
        case ACTION_TYPES.DELETE_ALL_RESPONSE:
            return {...state,response:[]}
        case ACTION_TYPES.DELETE_ONE_RESPONSE:
            let filtered_responses = state.response.filter((e,i)=>action.payload!=i)
            return {...state,response:filtered_responses}
        default:
            return state
    }
}
export default ResponseReducer