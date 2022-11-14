import { useRef, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import axios from "axios";
import axios from "./axios";
const LOGIN_URL = '/api/auth';

const LoginApi = () => {
    const { setAuth, persist, setPersist } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        // console.log(user, pwd)

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({email:user, password:pwd}), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            const role = response?.data?.role;
            setAuth({ user, role, accessToken })
            setUser('')
            setPwd('')
            // setSuccess(true)
            navigate(from, {replace: true});
        } catch (err) {
            if(!err?.response){
                setErrMsg('No Server Response')
            }else if(err.response?.status === 400){
                setErrMsg('Missing Username or Password')
            }else if(err.response?.status === 401){
                setErrMsg('Unauthorized')
            }else{
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }        
    }

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    useEffect(() => {
        localStorage.setItem("persist", persist)
    }, [persist])

  return (
    // <>
    // {success ?  ( 
    //     <section>
    //         <h1>You are logged in!</h1>
    //         <p>
    //             <a href="#">Got to home</a>
    //         </p>
    //     </section> ) : ( 
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username :</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password :</label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                <div className="persistCheck">
                    <input 
                        type="checkbox" 
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account ?<br />
                <span className="line" >
                    {/* Put router link here */}
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
    //     )}
    // </>
  )
}

export default LoginApi