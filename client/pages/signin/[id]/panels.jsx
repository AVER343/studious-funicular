import RegisterSVG from './assets/register.svg'
import { useRouter } from 'next/router'
import LoginFormSVG from './assets/log.svg'
export default function Panels(){
    let router = useRouter()
    return <div className="panels-container">
            <div className="panel left-panel">
            <div className="content">
                <h3>New here ?</h3>
                <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
                </p>
                <button className="btn transparent" id="sign-up-btn" onClick={()=>router.push('/signin/register')}>
                    <a >Sign up</a>
                </button>
            </div>
            <LoginFormSVG className='image'/>
            </div>
            <div className="panel right-panel">
            <div className="content">
                <h3>One of us ?</h3>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
                </p>
                <button className="btn transparent" id="sign-in-btn" onClick={()=>router.push('/signin/login')}>
                    <a>Sign In</a>
                </button>
            </div>
            <RegisterSVG className='image'/>
            </div>
        </div>
}