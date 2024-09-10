



import { MainHook } from "../context/MainContext";
import Camera2 from "./Camera2";
import Home from "./Home";

function Menu() {
const {changePage} = MainHook() || {}; 


  return (
    <div className=" bg-[#ed1699]">
          {changePage == 'Home' ? <Home/> : <Camera2/>}
    </div>
       
  
  );
}

export default Menu;