import styles from "../styles/Login.module.scss"
import loginImage from  "../assets/img/login.png"
import eyeOpen from "../assets/img/ic-eye.png.png"
import eyeClosed from "../assets/img/ic-eyeClose.png"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function(){
    const userStorage = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState({
        email:"",
        password:"",

    });
    function changeEmail(event){
        setUser({
            ...user,
            email: event.target.value,
        })
        setMsg("");
    }
     function changePassword(event){
        setUser({
            ...user,
            password: event.target.value,
        })
        setMsg("")

    }
    const[msg, setMsg] = useState("");
    let timeoutID;
    const navigate = useNavigate();
    function onSubmit(event){
        event.preventDefault();
        clearTimeout(timeoutID);
        if(!user?.email?.trim()?.length|| !user?.password?.trim()?.length){
            setMsg("All fields are required!");
            return;
        }
        if(user?.email?.trim()!=="larry" || user?.password?.trim()!=="larry"){
            setMsg("Account incorrect!");
            return;
        }
        if(user?.email?.trim() === "larry" && user?.password?.trim() ==="larry"){
            localStorage.setItem("user", JSON.stringify(user));
            
            timeoutID = setTimeout(()=>{
                navigate("/");
            }, 1000);
            
        }
    }
    useEffect(() =>{
        if (userStorage?.email){
            navigate("/")
        }
    },[])

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
    setShowPassword(!showPassword);
    };
    return (
    <div className={styles.container}>
      
      <div className={styles.formSection}>
        <div className={styles.logo}>
          <img src="/logo192.png" alt="logo" /> 
        </div>
        <h2>Welcome back!</h2>
        <p>Please enter your credentials to sign in!</p>

        <p className={styles.msg}>{msg}</p>

        <form className={styles.form} onSubmit={onSubmit}>
          <label>Email</label>
          <input type="text" name="email" placeholder="admin-01@ecme.com"
          value={user.email} onChange={changeEmail} />

          <label>Password</label>
          <div className={styles.passwordWrapper}>
            <input type={showPassword ? "text" : "password"}  placeholder="•••••••" 
            value={user.password} onChange={changePassword}/>
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt="toggle visibility"
              className={styles.eyeIcon}
              onClick={togglePassword}
            />
          </div>

          <a href="/" className={styles.forgotPassword}>
            Forgot password
          </a>

          <button type="submit" className={styles.signInBtn}>
            Sign In
          </button>
        </form>

        <div className={styles.divider}>
          <span></span> or continue with <span></span>
        </div>

        <div className={styles.social}>
          <button className={styles.google}>Google</button>
          <button className={styles.github}>Github</button>
        </div>

        <p className={styles.signup}>
          Don’t have an account yet? <a href="/">Sign up</a>
        </p>
      </div>

      {/* Right side image */}
      <div className={styles.imageSection}>
        <img src={loginImage} alt="Login" />
      </div>
    </div>
  );
}