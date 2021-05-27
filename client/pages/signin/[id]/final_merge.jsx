import {useEffect} from 'react'
import Panels from './panels'
import BothForms from './both_forms'
import {useRouter} from 'next/router'
export default function SignInSignUp(){
    let router = useRouter()
    useEffect(()=>{
         const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
        sign_up_btn.addEventListener("click", () => {container.classList.add("sign-up-mode");});
        sign_in_btn.addEventListener("click", () => {container.classList.remove("sign-up-mode");});
        if(router && router['query'] && router['query']['id'] && router['query']['id'].toLowerCase()=='register')
        {
            container.classList.add("sign-up-mode")
        }
        else{
            container.classList.remove("sign-up-mode");
        }
    },[router.query.id])
    return  <div class="container">
                <BothForms/>
                <Panels/>
            </div>
}
