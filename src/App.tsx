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
  const modelRef = useRef<THREE.Object3D | null>(null);
const [position, setPosition] = useState<{ _x: number, _y: number }[]>([]); 
const videoRef = useRef<HTMLVideoElement>(null);
const [textureExpresion, setTextureExpresion] = useState<{ expresion: string; positionsx: any[] } | null>(null);
const [booleanThrejs,setBoleanThrejs]=useState(false)








const testapi = async (imageSrc: string ) => {
  
  const processInfoFaceApi = async(imageSrc:string)=>{
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

  
  
            if (landmarks && landmarks.positions) {
              setPosition(landmarks.positions);
              const newobject= {
                expresion:highestExpression,
                positionsx:landmarks.positions
              }
              return newobject 
            } else {
              console.error('Landmarks o posiciones no están disponibles');
            }
          } else {
            console.error('No hay descripciones de rostro disponibles');
          }
  
           faceapi.draw.drawFaceLandmarks(canvasRef.current, fullFaceDescriptions);
          faceapi.draw.drawFaceExpressions(canvasRef.current, fullFaceDescriptions, 0.05); 
        }
      }
    } catch (error) {
      console.error('Error durante la detección facial:', error);
    }
  }



  console.log('hola prueba a ver que tal')
  try {
    const result = await processInfoFaceApi(imageSrc);
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
    camera.position.set(0, 100, 300); 
    camera.lookAt(0, 0, 0);
    
      const loader = new GLTFLoader();
      loader.load(
        "/3D/untitledxd2.glb",
        function (gltf:any) {
          const model = gltf.scene;
          model.scale.set(10, 10, 10);
          model.position.set(0, 0, 0);
          modelRef.current = model;
       console.log(model)
  
         
     
      
         
    
         
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
 


  }else{
    if(modelRef.current){
     
     

  
      if (result && typeof result === 'object') {
        setTextureExpresion(result);

        const textureExpresion = result.expresion;
        
      
        const tex = new THREE.TextureLoader().load(
          `/texture/${textureExpresion}.png`
        );

        modelRef.current?.traverse((node: any) => {
          if (node.isMesh && node.name === 'Cube') {
           
            node.material.map = tex;
          }
        });
        const landmarks = result.positionsx;

       console.log(landmarks[0].x)
      
      
       if (landmarks) {
        const point0 = landmarks[0];   
        const point16 = landmarks[16];
        const point18 = landmarks[18]; 
        
       
        const faceWidth = Math.sqrt(Math.pow(point16.x - point0.x, 2) + Math.pow(point16.y - point0.y, 2));
        
       
        const originalImageSize = 60;
        const minImageSize = 30; 
        
        const scaleFactor = Math.max(minImageSize / originalImageSize, faceWidth / originalImageSize);
        const newSize = Math.min(originalImageSize * scaleFactor, originalImageSize);
        
      
        const deltaX = point16.x - point0.x;
        const deltaY = point16.y - point0.y;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);


const image = document.querySelector('#imagexd');



        
      
        if(image){
          image.style.width = `${newSize}px`;
          image.style.height = `${newSize}px`;
          
        
          const imageWidth = newSize;
          const imageHeight = newSize;
          const offsetX = -6; 
          const offsetY = -imageHeight ; 
          
        
          image.style.position = 'absolute'; 
          image.style.transform = `translate(${point18.x + offsetX}px, ${point18.y + offsetY}px) rotate(${angle}deg)`;
      }
      }
      



      } else {
      
        console.error('Datos de textura no válidos:', result);
        setTextureExpresion({ expresion: 'default', positionsx: [] });
      }
  }
  }

} catch (error) {
    console.error('Error en fetchData:', error);
  }





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
  



  
console.log(textureExpresion)
   let keyframes;
   if(textureExpresion && textureExpresion.positionsx){
  if (textureExpresion.positionsx.length > 0) {
   
    keyframes = `
      .translate-example {
        transform: translate(${position[8]._x}px, ${position[8]._y}px);
      }
    `;
  } else {
    console.error('Position array is empty');
  } 
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




 <div className="relative bg-[#ed1699] w-[300px] h-[300px] ">
      <div className='bg-black w-[10px] h-[10px] absolute z-50 translate-example'></div> 
<img src="/texture/xdxd.png" alt="" className='z-50 absolute' id='imagexd' width={60} height={60}/>
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

    <button onClick={CapturePhoto}  className="absolute  z-40 ">hola</button>
  
    </div>
  );
}

export default App;