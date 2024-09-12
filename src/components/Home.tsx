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
    <div className="bg-[#f7ce65] min-h-screen  text-white flex justify-center md:space-x-20  overflow-hidden p-10 ">
      <div className={`hidden md:block relative w-[400px] h-[400px] ${changeanimation}`} >
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
        className={`flex flex-col items-center self-center space-y-0 md:space-y-10 ${changeanimation}`}
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
    </div>
  );
}

export default Home;
