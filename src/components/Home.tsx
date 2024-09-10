import { MainHook } from "../context/MainContext";

function Home() {
const {setChangePage} = MainHook() || {}; 


  return (
    <div className=" bg-[#ed1699]">
      <p>Hola entra aqui</p>
      <button onClick={()=>setChangePage('Camera')}>Cambiar a camara</button>
    </div>
    
       
  
  );
}

export default Home;