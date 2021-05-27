import RegisterSVG from './assets/register.svg'
import LoginFormSVG from './assets/log.svg'
export default function LeftRightPanel(){
    return(<div className="panels-container">
            <div className="panel left-panel">
            <div className="content">
                <h3>New here ?</h3>
                <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
                </p>
                <button className="btn transparent" id="sign-up-btn">
                Register
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
                <button className="btn transparent" id="sign-in-btn">
                Sign in
                </button>
            </div>
            <RegisterSVG className='image'/>
            </div>
        </div>)
}