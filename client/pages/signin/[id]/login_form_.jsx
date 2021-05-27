import {useState} from 'react'
import {useDispatch,connect} from 'react-redux'
import {LOGIN_ASYNC_TASK} from '../../../src/redux/user/user.actions';
function LoginForm(props){
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let handleLogin=(e)=>{
      e.preventDefault();
      props.LOGIN_ASYNC_TASK({email,password})
    }
    return(<form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input value={email} 
                    name='email'
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email" 
                    placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}  
                    type="password" 
                    placeholder="Password" />
            </div>
            <input type="submit" onClick={handleLogin} value="Login" className="btn solid" />
          </form>)
}
const mapStateToProps=(state)=>({
  state
})
const mapDispatchToProps=(dispatch)=>({
  LOGIN_ASYNC_TASK:(credentials)=>dispatch(LOGIN_ASYNC_TASK(credentials))
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)