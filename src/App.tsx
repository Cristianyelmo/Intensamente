import { useEffect, useState, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

function App() {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
const [position, setPosition] = useState<{ _x: number, _y: number }[]>([]); 
const videoRef = useRef<HTMLVideoElement>(null);
const get2d2 = canvasRef.current?.getContext("2d");
const [srcphoto,setsrcPhoto]=useState("/New Project(3).jpg")
const testapi = async (imageSrc: string) => {
  console.log(imageSrc);
  console.log(imageRef.current)
  try {
    if (canvasRef.current && imageRef.current) {
      const number = 300;
      canvasRef.current.width = number;
      canvasRef.current.height = number;

     
      if (imageRef.current) {
        console.log(imageRef.current)
        imageRef.current.src = imageSrc;
        console.log(imageRef.current)
  

        const fullFaceDescriptions = await faceapi.detectAllFaces(imageRef.current)
          .withFaceLandmarks()
          .withFaceExpressions();
        console.log(fullFaceDescriptions);

        if (fullFaceDescriptions.length > 0) {
          const firstFaceDescription = fullFaceDescriptions[0];
          const landmarks = (firstFaceDescription as any).landmarks;

          if (landmarks && landmarks.positions) {
            setPosition(landmarks.positions);
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
    

      testapi("/New Project(3).jpg");
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
      
      <canvas 
    
        ref={canvasRef} 
        className="absolute top-0 z-20 w-[300px] h-[300px]" 
      ></canvas>


      <img 
       
        width="300" 
        height="300" 
        ref={imageRef} 
     /* onChange={handleImageLoad}  */
        className="absolute  z-10 w-full h-full" 
      /> 
    </div> 


  
    </div>
  );
}

export default App;
