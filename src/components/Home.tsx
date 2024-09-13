import { useState } from "react";
import { MainHook } from "../context/MainContext";

function Home() {
  const { setChangePage } = MainHook() || {};

  const [changeanimation, setChangeAnimation] =
    useState<string>("bounce-in-img");

  const Change = (item: string) => {
    setChangeAnimation("bounce-out-img");
    setTimeout(() => {
      setChangePage(item);
    }, 1200);
  };


  
  return (
    <div className="bg-[#f7ce65] min-h-screen relative text-white flex justify-center md:space-x-20  overflow-hidden p-10 ">
      <div className={`hidden md:block relative z-20 w-[400px] h-[400px] ${changeanimation}`} >
        <img
          src="/tarjeta2.png"
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
          src="/tarjeta2.png"
          width={350}
          height={350}
          className="absolute z-20 "
        />
      </div>  

      <div
        className={`flex flex-col items-center self-center space-y-0 md:space-y-10 z-20 ${changeanimation}`}
      >
       
        <img src="/Inside-out.png" width={400} height={400}  className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]" />

        <div className={`relative w-[200px] h-[300px] mt-0 ${changeanimation} md:hidden`}>
        <img
          src="/tarjeta.png"
          width={200}
          height={200}
          className="absolute z-20  rotate-img2 "
        />
        <img
          src="/tarjeta2.png"
          width={200}
          height={200}
          className="absolute z-20  rotate-img "
        />

        <img
          src="/tarjeta.png"
          width={200}
          height={200}
          className="absolute z-20 "
        />
      </div> 

      
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => Change("Glossary")}
            className="bg-black text-white p-4"
          >
            Glosario
          </button>
          <button
            onClick={() => Change("Camera")}
            className="bg-black text-white p-4"
          >
            Entrar
          </button>
        </div>
      </div>

<div className={`w-[300px] h-[300px] rounded-full bg-[#4aa80b] absolute z-10  glowing-circle2 ${changeanimation}`}>

</div>




<div className={`w-[200px] h-[200px] rounded-full bg-[#144b9a] right-[50%] top-[30%] absolute z-10 glowing-circle  ${changeanimation}`}>
</div>




<div className={`w-[200px] h-[200px] rounded-full bg-[#f06eaa] right-[27%] top-[40%] absolute z-10  glowing-circle3 ${changeanimation}`}>
</div>


<div className={`w-[150px] h-[150px] rounded-full bg-[#f06eaa] right-[10%] md:right-[20%] top-[26%] absolute z-10  glowing-circle4 ${changeanimation}`}>
</div>

    
    </div>
  );
}

export default Home;
