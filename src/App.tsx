import { useEffect, useState, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

function App() {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState<{ _x: number, _y: number }[]>([]);

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
      const testapi = async () => {
        try {
          if (canvasRef.current && imageRef.current) {
           

            const fullFaceDescriptions = await faceapi.detectAllFaces(imageRef.current)
              .withFaceLandmarks()
              .withFaceExpressions();
console.log(fullFaceDescriptions)
          /*   if (fullFaceDescriptions.length > 0) {
              const firstFaceDescription = fullFaceDescriptions[0];
              const landmarks = (firstFaceDescription as any).landmarks;

              if (landmarks && landmarks.positions) {
                setPosition(landmarks.positions);
              } else {
                console.error('Landmarks or positions are not available');
              }
            } else {
              console.error('No face descriptions available');
            }
 */
          
            faceapi.draw.drawFaceLandmarks(canvasRef.current, fullFaceDescriptions);
            faceapi.draw.drawFaceExpressions(canvasRef.current, fullFaceDescriptions, 0.05); 
          }
        } catch (error) {
          console.error('Error during face detection:', error);
        }
      };

      testapi();
    }).catch((error) => {
      console.error('Error en fetchData:', error);
    });

  }, []);

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
    <div className="relative bg-[#ed1699] w-[300px] h-[300px] ">
      {keyframes && <style>{keyframes}</style>}
      <div className='bg-black w-[10px] h-[10px] absolute z-50 translate-example'></div>
      <canvas 
    
        ref={canvasRef} 
        className="absolute  z-20 w-[300px] h-[300px]" 
      ></canvas>
      <img 
        src="/New Project.jpg" 
        width="300" 
        height="300" 
        ref={imageRef} 
        className="absolute  z-10 w-full h-full" 
      /> 
    </div>
  );
}

export default App;
