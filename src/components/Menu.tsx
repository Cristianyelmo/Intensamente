import { MainHook } from "../context/MainContext";
import Camera2 from "./Camera2";
import Glossary from "./Glossary";
import Home from "./Home";

function Menu() {
  const { changePage } = MainHook() || {};

  return (
    <div className=" bg-[#ed1699]">
      {changePage == "Home" ? (
        <Home />
      ) : changePage == "Glossary" ? (
        <Glossary />
      ) : (
        <Camera2 />
      )}
    </div>
  );
}

export default Menu;
