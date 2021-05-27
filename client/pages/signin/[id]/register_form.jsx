import { useState } from "react"
import { connect } from "react-redux"
import { SIGNUP_ASYNC_TASK } from "../../../src/redux/user/user.actions"

 function RegisterForm(props){
    let [user_name,setUsername]= useState('')
    let [password,setPassword]= useState('')
    let [confirm_password,setConfirm_password]= useState('')
    let [email,setEmail]= useState('')

    let handleSubmit=(e)=>{
        e.preventDefault()
        props.SIGNUP_ASYNC_TASK({user_name,email,confirm_password,password,resetInput:()=>{
            setUsername('')
            setPassword('')
            setConfirm_password('')
            setEmail('')
        }})
    }
    return(<form action="#" className="sign-up-form" onSubmit={handleSubmit}>
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                    <i className="fas fa-user"></i>
                        <input value ={user_name} onChange={e=>setUsername(e.target.value)} type="text" placeholder="Username" />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-envelope"></i>
                        <input value ={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-lock"></i>
                        <input value ={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-lock"></i>
                        <input value ={confirm_password} onChange={e=>setConfirm_password(e.target.value)} type="password" placeholder="Confirm Password" />
                    </div>
                        <input type='submit' value='submit' className="btn"/>
                </form>)
}
const mapStateToProps=(state)=>({

})
const mapDispatchToProps=(dispatch)=>({
    SIGNUP_ASYNC_TASK:(user)=>dispatch((SIGNUP_ASYNC_TASK((user))))
})
export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm)