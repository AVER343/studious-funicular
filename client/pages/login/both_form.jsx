import {useEffect} from 'react'
import RegisterForm from './register_form'
import LoginForm from './login_form'
export default function SignInSignUp(){
    useEffect(()=>{
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
        sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
        });
        sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
        });
    },[])
    return  <div class="container">
                <LoginForm/>
                <RegisterForm/>
            </div>
}
