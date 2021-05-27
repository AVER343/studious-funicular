import API from "../../api";
import Cookies from 'js-cookie';
import { ADD_RESPONSE, DELETE_ALL_RESPONSE } from "../response-handler/actions/response.actions";
import ACTION_TYPES from "./user.actions.types";
export const LOGIN_SYNC_TASK=(payload)=>({
    type:ACTION_TYPES.LOGIN_SYNC_TASK,
    payload
})
export const SIGNUP_SYNC_TASK=(payload)=>({
    type:ACTION_TYPES.LOGIN_SYNC_TASK,
    payload
})
export const LOGIN_ASYNC_TASK = (user) => {
    return async (dispatch) => {
        const{email,password}=user
    try{
        const res=await API.post('/login', {email,password})
        if(res.status===200)
        {        
           await dispatch(DELETE_ALL_RESPONSE())
           await dispatch(LOGIN_SYNC_TASK(res.data))
           console.log({JWT:Cookies.get('JWT')})
           dispatch(ADD_RESPONSE([{message:'Successfully logged in !',status:'success'}]));
        }
        else{
            dispatch(ADD_RESPONSE([{message:'Something went wrong !',status:'error'}]));
        }
    }
    catch(e)
    {
        if(e['response'] && e['response']['data'] && e['response']['data']['errors'])
                    dispatch(ADD_RESPONSE(e['response']['data']['errors']));
    }
    };
  };
  export const SIGNUP_ASYNC_TASK = (user) => {
    return async (dispatch) => {
    try{
        const {user_name,email,confirm_password,password} = user
        const res=await API.post('/register', {user_name,email,confirm_password,password})
        if(res.status===201)
        {        
           await dispatch(DELETE_ALL_RESPONSE())
        //    await dispatch(LOGIN_SYNC_TASK(res.data.success))
           dispatch(ADD_RESPONSE(res.data.success));
           console.log({user})
           user.resetInput()
        }
        else{
            dispatch(ADD_RESPONSE([{message:'Something went wrong !',status:'error'}]));
        }
    }
    catch(e)
    {
        if(e['response'] && e['response']['data'] && e['response']['data']['errors'])
                    dispatch(ADD_RESPONSE(e['response']['data']['errors']));
    }
    };
  };

export const LOGOUT=()=>({
    type:ACTION_TYPES.LOGOUT
})
export const handle_Logout= ()=>{
    return async (dispatch) => 
    {
        try{
            const res=await API.get('/logout');
            if(res.status===200)
            {         
                await dispatch(DELETE_ALL_RESPONSE())
                await dispatch(ADD_RESPONSE([{message:'Successfully logged out !',status:'success'}]))
                await dispatch(LOGOUT())
            }
            else{  
                await dispatch(ADD_RESPONSE([{  message:`Something went wrong !`,status:'error'}]))
            }
        }
        catch(e)
        {
            if(e.response && e.response.data &&e.response.data.errors)
            {
                dispatch(ADD_RESPONSE(e.response.data.errors))
            }
            else if(e.message)
            {
                dispatch(ADD_RESPONSE([{message:e.message,status:'error'}]))
            }
        }
    };
}

export const asyncSignUp= (user) => {
    return async (dispatch) => 
    {
        console.log({user})
        try{
            const res=await API.post('/signup', {...user});
            if(res.status===201)
            {         
                await dispatch(DELETE_ALL_RESPONSE())
                await dispatch(ADD_RESPONSE())
            }
            else{  
                await dispatch(ADD_RESPONSE([{  message:`Something went wrong !`}]))
                dispatch(Logout());
            }
        }
        catch(e)
        {
            if(e.response && e.response.data &&e.response.data.errors)
            {
                dispatch(ADD_RESPONSE(e.response.data.errors))
            }
            else if(e.message)
            {
                dispatch(ADD_RESPONSE([{message:e.message}]))
            }
        }
    };
  };