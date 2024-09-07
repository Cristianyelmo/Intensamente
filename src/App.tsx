import { useEffect, useState, useRef } from "react";
import * as faceapi from "face-api.js";
import "./App.css";

import html2canvas from "html2canvas";

function App() {
  const imageRef = useRef<HTMLImageElement>(null);

  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [shoot, setShoot] = useState<number>(0);
  const canvasRef4 = useRef<HTMLDivElement>(null);

  const finalImageRef = useRef<HTMLDivElement | null>(null);
  const [KeyframesCount, setKeyframesCount] = useState<string>("");
  const testapi = async (imageSrc: string, shootx: number) => {
   
    const processInfoFaceApi = async (imageSrc: string) => {
      try {
        if (imageRef.current) {
          if (imageRef.current) {
            console.log(imageRef.current);

            if (imageSrc !== "no") {
              imageRef.current.src = imageSrc;
              console.log(imageRef.current);
            }

            const fullFaceDescriptions = await faceapi
              .detectAllFaces(imageRef.current)
              .withFaceLandmarks()
              .withFaceExpressions();
            console.log(fullFaceDescriptions);

            if (fullFaceDescriptions.length > 0) {
              const newArray = fullFaceDescriptions.map(
                ({ expressions, landmarks }) => {
                  let highestExpression = "";
                  let highestValue = -Infinity;

                  for (const [expression, value] of Object.entries(
                    expressions
                  )) {
                    if (typeof value === "number" && value > highestValue) {
                      highestExpression = expression;
                      highestValue = value;
                    }
                  }

                  return {
                    expression: highestExpression,
                    landmarks: landmarks.positions,
                  };
                }
              );

              return newArray;
            } else {
              console.error("No hay descripciones de rostro disponibles");
            }
          }
        }
      } catch (error) {
        console.error("Error durante la detección facial:", error);
      }
    };

    console.log("hola prueba a ver que tal");

    try {
      const result = await processInfoFaceApi(imageSrc);

      console.log(result);
      const landMarksProcess = () => {
      
        if (Array.isArray(result)) {
          result.map(async (result, index) => {
            let textureExpresionx = result.expression;

            const landmarks = result.landmarks;

            console.log(landmarks[0].x);

            if (landmarks) {
              const point0 = landmarks[0];
              const point16 = landmarks[16];
              const point18 = landmarks[18];

              const faceWidth = Math.sqrt(
                Math.pow(point16.x - point0.x, 2) +
                  Math.pow(point16.y - point0.y, 2)
              );

              const originalImageSize = 60;
              const minImageSize = 30;

              const scaleFactor = Math.max(
                minImageSize / originalImageSize,
                faceWidth / originalImageSize
              );
              const newSize = Math.min(
                originalImageSize * scaleFactor,
                originalImageSize
              );

              const deltaX = point16.x - point0.x;
              const deltaY = point16.y - point0.y;
              const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

              const imageReview = document.querySelector(`#test${index}`);

              if (imageReview) {
                imageReview.remove();
                const image = document.createElement(
                  "img"
                ) as HTMLImageElement | null;
                if (image) {
                  image.style.width = `${newSize}px`;
                  image.style.height = `${newSize}px`;

                  image.src = `/texture/${textureExpresionx}.png`;

                  const imageHeight = newSize;
                  const offsetX = 0;
                  const offsetY = -imageHeight;

                  image.id = `test${index}`;
                  image.style.position = "absolute";
                  image.style.zIndex = "50";
                  image.style.transform = `translate(${
                    point18.x + offsetX
                  }px, ${point18.y + offsetY}px) rotate(${angle}deg)`;
                  image.style.boxShadow = "10px 10px 20px rgba(0, 0, 0, 0.5)";
                  if (canvasRef4.current) {
                    canvasRef4.current.appendChild(image);
                  }
                }
              } else {
                const image = document.createElement(
                  "img"
                ) as HTMLImageElement | null;
                if (image) {
                  image.style.width = `${newSize}px`;
                  image.style.height = `${newSize}px`;

                  image.src = `/texture/${textureExpresionx}.png`;

                  const imageHeight = newSize;
                  const offsetX = 0;
                  const offsetY = -imageHeight;

                  image.id = `test${index}`;
                  image.style.position = "absolute";
                  image.style.zIndex = "50";
                  image.style.transform = `translate(${
                    point18.x + offsetX
                  }px, ${point18.y + offsetY}px) rotate(${angle}deg)`;
                  image.style.boxShadow = "10px 10px 20px rgba(0, 0, 0, 0.5)";
                  if (canvasRef4.current) {
                    canvasRef4.current.appendChild(image); // Añade la nueva imagen al contenedor
                  }
                }
              }
            }
          });

          const textureExpresionx = result.map(item => item.expression);

          return textureExpresionx;
        }
      };

      const resultlandmarks = await landMarksProcess();
      console.log(resultlandmarks);
       const screenShotImage = () => {
        if (plantillaRef.current) {
          html2canvas(plantillaRef.current).then((capturedCanvas) => {
            const capturedImage = capturedCanvas.toDataURL("image/png");
            console.log(capturedImage);
            console.log(shootx, "aca esta el shoot");
            const image = document.getElementById(`${shootx}`)  as HTMLImageElement;;
            if (image) {
              image.src = capturedImage;
            } else {
              console.error("Element not found");
            }
            const color = document.getElementById(`color-${shootx}`);
            console.log(resultlandmarks?.length)
            console.log(color)
            if(color){
              const resultlandmarksLength = resultlandmarks?.length || 1; 
              color.style.display = 'grid'; 
              color.style.gridTemplateColumns = `repeat(${resultlandmarksLength}, 1fr)`;
          }


          
          resultlandmarks?.map((item)=>{
           

            const newDiv = document.createElement('div');

            newDiv.style.backgroundImage = `url('/texture/${item}.png')`;
            newDiv.style.backgroundRepeat = 'repeat';
  newDiv.style.width = '100%'; 
  newDiv.style.height = '100%'; 
  

  
  if(color){
  color.appendChild(newDiv);
}

          })

            

            
          }).then(()=>{
            if (canvasRef4.current) {
              canvasRef4.current.innerHTML = ''; 
            }
          });
        }

       
      };

      await screenShotImage();

      if (shootx == 3) {
        setTimeout(() => {
          if (finalImageRef.current) {
            html2canvas(finalImageRef.current).then((capturedCanvas) => {
              const capturedImage = capturedCanvas.toDataURL("image/png");
              const link = document.createElement("a");

              // Asignar el dataURL como href
              link.href = capturedImage;

              // Establecer el nombre del archivo a descargar
              link.download = "descarga.png";

              // Simular un clic en el enlace
              link.click();
            });
          }
        }, 3000);

         setTimeout(() => {
          console.log('holaaa aqui entro')
           const color = document.getElementById('color-1');
          const color2 = document.getElementById('color-2');
          const color3 = document.getElementById('color-3');
    if (color) {
      color.innerHTML = ''; 
    }
    
    if (color2) {
      color2.innerHTML = ''; 
    }
    
    if (color3) {
      color3.innerHTML = ''; 
    } 
        }, 4000); 
      } 
    } catch (error) {
      console.log(console.error);
    }
  };

  useEffect(() => {
    const MODEL_URL = "/models";

    const loadModels = async () => {
      const loadPromises = [
        faceapi.loadSsdMobilenetv1Model(MODEL_URL),
        faceapi.loadFaceLandmarkModel(MODEL_URL),
        faceapi.loadFaceExpressionModel(MODEL_URL),
      ];

      await Promise.all(loadPromises);
      console.log("All models loaded");
    };

    loadModels()
      .then(() => {
        testapi("no", 0);
      })
      .catch((error) => {
        console.error("Error en fetchData:", error);
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
   
    const Capturenew = async (shootx: number) => {

     

      if (canvasRef2.current && imageRef.current) {
        canvasRef2.current.width = 300;
        canvasRef2.current.height = 300;
      }

      if (videoRef.current && canvasRef2.current) {
        const get2d2 = canvasRef2.current.getContext("2d");
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
        console.log("Data URL:", dataURL);
        console.log(shootx, "valor de shootx antes de testapi");
        await testapi(dataURL, shootx);
      }
    };
    const shootPhotos = (currentShoot: number) => {
      console.log("foto " + currentShoot);
      setKeyframesCount(`box${currentShoot}`)
      if (currentShoot < 3) {
        setTimeout(async () => {
          await Capturenew(currentShoot + 1);
         
          setShoot(currentShoot + 1);
          shootPhotos(currentShoot + 1);
        }, 3000);
      } else {
        console.log("lito");
        setShoot(0);
      }
    };

    shootPhotos(shoot);
  };

  const plantillaRef = useRef<HTMLDivElement | null>(null);
console.log(KeyframesCount)
  return (
    <div className=" bg-[#ed1699]">
      <div className="relative w-[300px] h-[300px]">
         <video
          ref={videoRef}
          width="300"
          height="300"
          className="absolute z-20"
        ></video> 

         {/* <img
          src="/New Project(5).png"
          alt=""
          width="300"
          height="300"
          className="absolute z-30"
          ref={videoRef}
        />  */}
        <canvas
          ref={canvasRef2}
          className="absolute z-20 w-[300px] h-[300px] hidden"
        ></canvas>
      </div>
      <div className={`bg-black w-[50px] h-[50px] ${KeyframesCount}`}>

</div>
      <div className="relative ">
        <div
          className=" w-[300px] h-[300px] bg-black z-10 flex justify-center items-center flex-col absolute2"
          ref={plantillaRef}
        >
          
          <div
            className="relative bg-[#ed1699] w-[300px] h-[300px]  overflow-hidden"
            
          >
<div className=" w-[300px] h-[300px] absolute z-50" >
          <div className="w-[300px] h-[300px] relative" ref={canvasRef4}>

          </div>
          </div>




            <div
              ref={canvasRef3}
              className="absolute top-0 z-30 w-[300px] h-[300px]"
            ></div>

            <img
              src="/New Project(3).jpg"
              width="300"
              height="300"
              ref={imageRef}
              className="absolute  z-10 w-full h-full"
            />
          </div>
        </div>
      </div>

      <button onClick={CapturePhoto} className="absolute  z-40 ">
        hola
      </button>

     
      <div id="image-container" className="space-y-2 bg-black absolute2" ref={finalImageRef}>
      
        <div
          className="bg-black w-[400px] h-[400px] flex justify-center items-center"
         
        >


          <img src="" alt="" id="1"  width="300"
          height="300"
          className="absolute z-30"/>
<div className="w-[400px] h-[400px]"  id="color-1">
  {/* <div className="bg-[#f8df6d] w-full h-full"></div>
  <div className="bg-[#ed2225] w-full h-full"></div> */}
</div>
        </div>

        <div
          className="bg-black w-[400px] h-[400px] flex justify-center items-center"
         
        >
          <img src="" alt="" id="2"  width="300"
          height="300"
          className="absolute z-30" />

<div className="w-[400px] h-[400px]"  id="color-2">
   
</div>


        </div>

        <div
          className="bg-black w-[400px] h-[400px] flex justify-center items-center"
         
        >
          <img src="" alt="" id="3"  width="300"
          height="300"
          className="absolute z-30" />

<div className="w-[400px] h-[400px]"  id="color-3">
  {/* <div className="bg-[#f8df6d] w-full h-full"></div>
  <div className="bg-[#ed2225] w-full h-full"></div> */}
</div>


        </div>
      


      </div>
    </div>
  );
}

export default App;
