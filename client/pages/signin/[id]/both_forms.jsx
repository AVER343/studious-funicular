import LoginForm from './login_form_'
import RegisterForm from './register_form'
export default function BothForms(){
    return  <div className="forms-container">
                <div className="signin-signup">
                <LoginForm/>
                <RegisterForm/>
                </div>
            </div>
}