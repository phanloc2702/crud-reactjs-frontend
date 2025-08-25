import { useParams } from "react-router-dom"
import signIn from "../assets/img/ic-signin.png.png"
import s from "../styles/UserDetail.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY, ROLE } from "./HomePage";
export default function UserDetail(){
    const params = useParams();
    const navigate= useNavigate();
    const [user, setUser]= useState(null);
    function fetchUser(){
        fetch(`http://localhost:3001/users/${params?.id}`)
        .then((res)=>res.json())
        .then((data)=>setUser(data))
    }
    useEffect(function(){
        fetchUser();
    })
    return(
        <section className={s.detail}>
            <button onClick={()=>navigate("/")}>
                <span>
                    <img src={signIn} alt=""/>
                </span>
                <span>Back to home</span>
            </button>
            <ul>
                <li>
                    <span>
                        User : <b>{user?.username}</b>
                    </span>
                </li>
                <li>
                    <span>
                        Role: <b>{ROLE.find(item=>item.value===user?.role)?.label}</b>
                    </span>
                </li>
                <li>
                    <span>
                        Company: <b>{COMPANY.find(item=>item.value===user?.company)?.label}</b>
                    </span>
                </li>
                <li>
                    <span>
                        Address: <b>{user?.address}</b>
                    </span>
                </li>
            </ul>

        </section>
    )

}