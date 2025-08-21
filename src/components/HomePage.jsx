import eyeIcon from "../assets/img/ic-eye.png.png"
import s from "../styles/LayoutRoot.module.scss"
import removeIcon from "../assets/img/ic-remove.png"
import editIcon from "../assets/img/ic-edit.png"
import userIcon from "../assets/img/ic-user.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
export default function HomePage(){
    const navigate = useNavigate();
    const [list,setList] = useState([])
    useEffect(function(){
        fetch("http://localhost:3001/users")
        .then((res)=>res.json())
        .then((data)=>setList(data));
    })
    return(
        <section className={s.users}>
            <div className={s.users_title}>
                <h1>Users</h1>
                <button className={s.users_cta} onClick={()=> navigate("/user/create")}>
                    <span>
                        <img src={userIcon} alt=""/>
                    </span>
                    <span>Add New</span>
                </button>

            </div>
            <table>
                <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                
                {
                    list?.map(user=>{
                        return(
                            <tr>
                            <td>{user?.username}</td>
                            <td>{user?.role}</td>
                            <td>{user?.company}</td>
                            <td>{user?.address}</td>
                            <td>
                                <button>
                                    <img src={eyeIcon} alt=""/>
                                </button>
                                <button onClick={()=>navigate(`/user/${user?.id}/edit`)}>
                                    <img src={editIcon} alt=""/>
                                </button>
                                <button>
                                    <img src={removeIcon} alt=""/>
                                </button>
                            </td>
                            </tr>
                            
                        );
                    })
                }
                
            </table>
        </section>
    )
    
}