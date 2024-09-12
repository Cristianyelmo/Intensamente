import { useState } from "react";
import { MainHook } from "../context/MainContext";


function Glossary() {
  const { setChangePage } = MainHook() || {};

/*   const [changeanimation, setChangeAnimation] =
    useState<string>("bounce-in-img");

  const Change = () => {
    setChangeAnimation("bounce-out-img");
    setTimeout(() => {
      setChangePage("Camera");
    }, 1200);
  }; */

const ArrayFeelings = [
    {color:'#ee2225',name:'Furia',img:'angry',texto:'La emoción de la Furia puede surgir como respuesta a situaciones percibidas como injustas, y puede motivar a las personas a tomar medidas para corregir la situación'},
    {color:'#4E2C78',name:'fearful',img:'fearful',texto:'El miedo mantiene a las personas alerta y vigilantes ante posibles amenazas, lo que les permite anticipar y responder a situaciones de peligro.'},
    {color:'#49519e',name:'Ennui',img:'ennui',texto:'Esta emocion casi coincide con la expresion que captura la IA que es la neutral,el aburrimiento es una sensacion persistente de apatia,falta de interes y energia'},
    {color:'#f8df6d',name:'happy',img:'happy',texto:'La alegría motiva a las personas a buscar experiencias positivas y a disfrutar de la vida.'},
    {color:'#144b9a',name:'sad',img:'sad',texto:'La tristeza permite a las personas procesar y expresar emociones difíciles, como la pérdida, la decepción o la soledad.'},
    {color:'#006C3A',name:'disgusted',img:'disgusted',texto:'La emoción de Asco actúa como un mecanismo de «evitación», ayudando a las personas a no incurrir en situaciones o estímulos que podrían ser perjudiciales o que nos pongan en peligro.'},
    {color:'#f06eaa',name:'surprised',img:'surprised',texto:'Esta es una emocion que no esta la pelicula,pero es una expresion que detecta la IA'},
    {color:'#000000',name:'Undefined',img:'undefined',texto:'Esta carta aparece porque no pudo detectar la IA un rostro'},
]

interface ModalInfo {
  name: string;
  color: string;
  texto: string;
}

const [objectModal,setObjectModal]= useState<ModalInfo | null >({name:'',color:'',texto:''})
const [openModal,setOpenModal]=useState<boolean>(false)
const ModalView = (namei:string)=>{
 
  setOpenModal(true)
  const filterName = ArrayFeelings.find((item)=>item.name == namei)
  if (filterName) {
    setObjectModal(filterName); 
  } else {
    setObjectModal(null);
  }

  console.log(objectModal)
}



  return (
    <div className="bg-[#f7ce65] h-screen  relative  overflow-hidden ">
      <button onClick={() => setChangePage("Home")} className="absolute z-50">Volver</button>
      { openModal && <div className="fixed inset-0 flex items-center justify-center bg-black z-30 bg-opacity-70">
          <div className="bounce-in-img bg-white  shadow-lg p-6 max-w-md w-full" style={{backgroundColor:objectModal?.color}}>
            <h2 className="text-xl font-semibold mb-4"> {objectModal && objectModal.name}</h2>
            <p className="text-white mb-4">
             {objectModal && objectModal.texto}
            </p>
            <div className="flex justify-end">
               
              <button onClick={()=>setOpenModal(false)}  className="px-4 py-2 bg-red-600 text-white rounded-lg"
               
              >
                Close
              </button>
            </div>
          </div>
        </div> }
      
      <div className="w-full h-full grid md:grid-cols-4 grid-cols-2">
{
      ArrayFeelings.map((item,index)=>(




<div key={index} className={`bounce-in-img cursor-pointer`} onClick={()=>ModalView(item.name)}       style={{ backgroundColor:item.color,}}>
<img src={`/glossary/${item.img}.svg`} className="w-full h-full"/>

</div>
 

      ))
}
  
      </div>
    </div>
  );
}

export default Glossary;
