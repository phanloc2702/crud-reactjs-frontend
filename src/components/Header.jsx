import { Link, useNavigate } from "react-router-dom"
import style from "../styles/Header.module.scss"
import signIn from "../assets/img/ic-signin.png.png"
import { useEffect } from "react";
export default function Header(){
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    function onSignIn(){
        navigate("/login");
    }
    function onSignOut(){
        localStorage.removeItem("user");
        navigate("/login");
    }
    useEffect(()=>{
        if(!user?.email){
            navigate("/login");
        }
    })
    return (

    <section className={style.header}>
        <Link to ="/">
            <img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" alt="ECME"/>
        </Link>
        <div className={style.header_author}>
            <p className={style.header_username}>Morning, <strong>{user?.email}</strong></p>
            <p>|</p>
            {!user?.email ?(
                <button className={style.header_cta} onClick={onSignIn}>
                <span>Signin</span>
                <span>
                    <img src={signIn} alt=""/>
                </span>
                </button>
            ):(
                <button className={style.header_cta} onClick={onSignOut}>
                <span>Signout</span>
                <span>
                    <img src={signIn} alt=""/>
                </span>
                </button>
            )

            }
            
        </div>
    </section>)
}