import { Outlet } from "react-router-dom";
import style from "../styles/LayoutRoot.module.scss";
import Header from "./Header";
import Footer from "./Footer";
export default function LayoutRoot(){
    return (
        <div>   
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}