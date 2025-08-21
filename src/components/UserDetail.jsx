import signIn from "../assets/img/ic-signin.png.png"
import s from "../styles/UserDetail.module.scss"
export default function UserDetail(){
    return(
        <section className={s.detail}>
            <button>
                <span>
                    <img src={signIn} alt=""/>
                </span>
                <span>Back to home</span>
            </button>
            <ul>
                <li>
                    <span>
                        User : <b>Larry</b>
                    </span>
                </li>
                <li>
                    <span>
                        Role: <b>Developer</b>
                    </span>
                </li>
                <li>
                    <span>
                        Department: <b>VTI group</b>
                    </span>
                </li>
                <li>
                    <span>
                        Address: <b>Ha Noi</b>
                    </span>
                </li>
            </ul>

        </section>
    )

}