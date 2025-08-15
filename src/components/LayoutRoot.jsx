import { Outlet } from "react-router-dom";

export default function LayoutRoot(){
    return (
        <div>   
            <h1>header</h1>
            <Outlet/>
            <h1>footer</h1>
        </div>
    )
}