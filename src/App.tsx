import { useEffect, useState, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
function App() {
  const imageRef = useRef<HTMLImageElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLDivElement>(null);
const [position, setPosition] = useState<{ _x: number, _y: number }[]>([]); 
const videoRef = useRef<HTMLVideoElement>(null);
const [textureExpresion,setTextureExpresion] = useState('')
const [booleanThrejs,setBoleanThrejs]=useState(false)


const testapi = async (imageSrc: string ) => {
  const processInfoFaceApi = async()=>{
  try {
    
    if (canvasRef.current && imageRef.current) {
      const number = 300;
      canvasRef.current.width = number;
      canvasRef.current.height = number;

     
      if (imageRef.current) {
        console.log(imageRef.current)

        if(imageSrc !== "no"){
        imageRef.current.src = imageSrc;
        console.log(imageRef.current) 
      } 

        const fullFaceDescriptions = await faceapi.detectAllFaces(imageRef.current)
          .withFaceLandmarks()
          .withFaceExpressions();
        console.log(fullFaceDescriptions);

        if (fullFaceDescriptions.length > 0) {
          const firstFaceDescription = fullFaceDescriptions[0];
          const landmarks = (firstFaceDescription as any).landmarks;
const expresions = (firstFaceDescription as any).expressions
console.log(expresions)
let highestExpression = '';
let highestValue = 0;
for (const [expression, value] of Object.entries(expresions)) {
  if (typeof value === 'number' && value > highestValue) {
    highestExpression = expression;
    highestValue = value;
  }
}
setTextureExpresion(highestExpression)



          if (landmarks && landmarks.positions) {
            setPosition(landmarks.positions);
          } else {
            console.error('Landmarks o posiciones no están disponibles');
          }
        } else {
          console.error('No hay descripciones de rostro disponibles');
        }

        /* faceapi.draw.drawFaceLandmarks(canvasRef.current, fullFaceDescriptions);
        faceapi.draw.drawFaceExpressions(canvasRef.current, fullFaceDescriptions, 0.05); */
      }
    }
  } catch (error) {
    console.error('Error durante la detección facial:', error);
  }
}


processInfoFaceApi().then(() => {
  console.log('hola prueba a ver que tal')
  if(booleanThrejs == false ){
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        800
      );
      const renderer = new THREE.WebGLRenderer({ alpha: true });
    
      const container = canvasRef3.current;
      const width = 300
      const height = 300
      renderer.setSize(width, height);
    if(container){
      container.appendChild(renderer.domElement);
    }
      camera.position.set(0, 20,100);
         
      camera.lookAt(0, 0, 0);
    
      const loader = new GLTFLoader();
      loader.load(
        "/3D/capS.glb",
        function (gltf:any) {
          const model = gltf.scene;
          model.scale.set(10, 10, 10);
          model.position.set(0, 0, 0);
       console.log(model)
    console.log(textureExpresion)
          const tex = new THREE.TextureLoader().load(
            `/texture/${textureExpresion}.png`
          );
    
          tex.flipY = false;
    
          model.traverse((node:any) => {
            if (node.isMesh && node.name == "Cube") {
              console.log('hola')
                node.material.map = tex;
            
            }
          });
     
      
         
    
         
       scene.add(model);
         
         
          const ambientLight = new THREE.AmbientLight(0xffffff, 2);
          scene.add(ambientLight);
         
    
          
        },
        undefined,
        function (error:any) {
          console.error(error);
        }
      );
    
      function animate() {
        renderer.render(scene, camera);
      }
    
      renderer.setAnimationLoop(animate);
    
      return () => {
        renderer.setAnimationLoop(null);
        if(container){
        container.removeChild(renderer.domElement);
      }
        renderer.dispose();
      };
    } catch (error) {
      
    }finally{
      setBoleanThrejs(true)
    }
 


  }





}).catch((error) => {
  console.error('Error en fetchData:', error);
});

};

  useEffect(() => {
    const MODEL_URL = '/models';
    
    const loadModels = async () => {
      const loadPromises = [
        faceapi.loadSsdMobilenetv1Model(MODEL_URL),
        faceapi.loadFaceLandmarkModel(MODEL_URL),
        faceapi.loadFaceExpressionModel(MODEL_URL)
      ];

      await Promise.all(loadPromises);
      console.log('All models loaded');
    };

    loadModels().then(() => {
    

      testapi("no");
    }).catch((error) => {
      console.error('Error en fetchData:', error);
    });

  }, []);



  useEffect(() => {
    const cargarCamera = async () => {
     
      try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          (videoRef.current as HTMLVideoElement).srcObject = stream;
          (videoRef.current as HTMLVideoElement).play();
        }
      } catch (err) {
        console.error("Error al acceder a la webcam: ", err);
      }
    };

    cargarCamera();
  }, []);



  const CapturePhoto = async () => {
    
    
       if (canvasRef2.current && imageRef.current) {
        canvasRef2.current.width = 300
        canvasRef2.current.height = 300
      } 
  
      if (videoRef.current && canvasRef2.current) {
        const get2d2 = canvasRef2.current.getContext('2d');
        if (get2d2) {
          get2d2.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef2.current.width,
            canvasRef2.current.height
          );
        }
      } 
  
      if (canvasRef2.current) {
        const dataURL = canvasRef2.current.toDataURL("image/png");
        console.log('Data URL:', dataURL);
        
      
        await testapi(dataURL)
      }  
   
  };
  



  

   let keyframes;
  if (position.length > 0) {
    keyframes = `
      .translate-example {
        transform: translate(${position[18]._x}px, ${position[18]._y}px);
      }
    `;
  } else {
    console.error('Position array is empty');
  } 

  return (
    <div className=" bg-[#ed1699]  ">
<style>{keyframes}</style>
<div className='relative w-[300px] h-[300px]'>
<video ref={videoRef} width="300" height="300" className='absolute z-20'></video>
<canvas 
    
    ref={canvasRef2} 
    className="absolute z-10 w-[300px] h-[300px] hidden" 
  ></canvas>

</div>



<button onClick={CapturePhoto}>hola</button>
 <div className="relative bg-[#ed1699] w-[300px] h-[300px] ">
      <div className='bg-black w-[10px] h-[10px] absolute z-50 translate-example'></div> 

      <div 
    
        ref={canvasRef3} 
        className="absolute top-0 z-30 w-[300px] h-[300px]" 
      ></div>
      
      <canvas 
    
        ref={canvasRef} 
        className="absolute top-0 z-20 w-[300px] h-[300px]" 
      ></canvas>


      <img 
       src="/New Project(3).jpg"
        width="300" 
        height="300" 
        ref={imageRef} 
 
        className="absolute  z-10 w-full h-full" 
      /> 
    </div> 


  
    </div>
  );
}

export default App;
