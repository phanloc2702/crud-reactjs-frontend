import { useNavigate, useParams } from "react-router-dom"
import s from "../styles/UserForm.module.scss"
import { useEffect, useState } from "react";

export default function UserForm(){
    const navigate = useNavigate();
    const params = useParams();
    function cancelBtn(event){
        event.preventDefault();
        navigate("/")
    }

    const [user, setUser] = useState({
        username: "",
        role:"dev",
        company:"cmc",
        address: "",
    });
    function fetchUserDetail(){
        fetch (`http://localhost:3001/users/${params?.id}`)
        .then((res)=>res.json())
        .then((userDetail)=>setUser({...userDetail}))
    }

    useEffect(function(){
        if (params?.id){
            fetchUserDetail();
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params?.id])
    const[msg, setMsg]=useState(""); 
    let timeoutID;
    function onSubmit(event){
        event.preventDefault();
        clearTimeout(timeoutID);
        if(!user?.username?.trim()?.length || !user?.address?.trim()?.length) {
            setMsg("All fields are required!");
            return;
        }

        if(params?.id){
            fetch(`http://localhost:3001/users/${params?.id}`, {
                method:"PUT",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({...user}),
            })
            .then(()=>{
            setMsg("Updated user successfully!");
            timeoutID = setTimeout(() =>{
                navigate("/");
            },500);
            });
        }else{

        fetch("http://localhost:3001/users",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...user}),
        }).then(()=>{
            setMsg("Created user successfully!");
            timeoutID = setTimeout(() =>{
                navigate("/");
            },500)
        
        });
        }

    }
    return (
        <section className={s.form}>
            <div>
                <p className={s.form_msg}>{msg}</p>
                <div  className={s.form_wrap}>
                    <div className={s.form_item}>
                        <label htmlFor="username">Username</label>
                        <input
                        type ="text" name ="username" id="username"
                        placeholder="Enter your username"
                        value={user?.username}
                        onChange={(event)=>{
                            setUser({
                                ...user,
                                username:event.target.value,
                            })
                            setMsg("")
                        }}/>

                    </div>
                    <div className={s.form_item}>
                        <lable htmlFor="role">Role</lable>
                        <select name="role" id="role"
                        value={user?.role}
                        onChange={(event)=>{
                            setUser({
                                ...user,
                                role:event.target.value,
                            })
                            setMsg("")
                        }}>
                            <option value="dev">Developer</option>
                            <option value="ba">Business Analyst</option>
                            <option value="tester">Tester</option>
                        </select>
                    </div>
                    <div className={s.form_item}>
                        <lable htmlFor="company">Company</lable>
                        <select name="company" id="company"
                        value={user?.company}
                        onChange={(event)=>{
                            setUser({
                                ...user,
                                company:event.target.value,
                            })
                            setMsg("")
                        }}>
                            <option value="cmc">CMC global</option>
                            <option value="fpt">FPT Software</option>
                            <option value="vti">VTI group</option>
                        </select>
                    </div>
                    <div className={s.form_item}>
                        <label htmlFor="address">Address</label>
                        <input
                        type ="text" name ="address" id="address"
                        placeholder="Enter your address"
                        value={user?.address}
                        onChange={(event)=>{
                            setUser({
                                ...user,
                                address:event.target.value,
                            })
                            setMsg("")
                        }}/>

                    </div>
                    <div className={s.form_btn_group}>
                        <button onClick={onSubmit}>Submit</button>
                        <button onClick={cancelBtn}>Cancel</button>
                    </div>    
                </div>
            </div>
        </section>
    )
}