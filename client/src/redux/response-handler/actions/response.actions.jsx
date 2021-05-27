import ACTION_TYPES from "../action-types/action.types";

export const ADD_RESPONSE = (payload)=>({
    type:ACTION_TYPES.ADD_RESPONSE,
    payload
})
export const DELETE_ONE_RESPONSE = (payload)=>({
    type:ACTION_TYPES.DELETE_ONE_RESPONSE,
    payload
})
export const DELETE_ALL_RESPONSE = ()=>({
    type:ACTION_TYPES.DELETE_ALL_RESPONSE
})