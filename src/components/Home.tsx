import { useState } from "react";
import { MainHook } from "../context/MainContext";

function Home() {
const {setChangePage} = MainHook() || {}; 

const [changeanimation,setChangeAnimation] = useState<string>('bounce-in-img')



const Change = (item:string)=>{

setChangeAnimation('bounce-out-img')
    setTimeout(() => {
        setChangePage(item)
    }, 1200);




}
  return (
    <div className="bg-[#f7ce65] h-screen  text-white flex justify-center space-x-20  overflow-hidden ">
     <div className={`relative w-[400px] h-[400px] ${changeanimation}`}>
   
     <img
    src="/tarjeta.png"
    width={350}
    height={350}
    className="absolute z-20  rotate-img2 "
  />
  <img
    src="/tarjeta.png"
    width={350}
    height={350}
    className="absolute z-20  rotate-img "
  />


  

  <img
    src="/tarjeta.png"
    width={350}
    height={350}
    className="absolute z-20 "
  />

  
</div>



 {/*  <img
    src="/tarjeta.png"
    width={350}
    height={350}
    className=" z-20 imgFinal"
  />
 */}

      <div className={`flex flex-col items-center self-center space-y-10 ${changeanimation}`}>
      <img src="/Inside-out.png" width={400} height={400}/>
      <div className="flex space-x-2 justify-center">
      <button onClick={()=>Change('Glossary')} className="bg-black text-white p-2">Glosario</button>
      <button onClick={()=>Change('Camera')} className="bg-black text-white p-2">Entrar</button>
      </div>
      </div>
    </div>
    
       
  
  );
}

export default Home;