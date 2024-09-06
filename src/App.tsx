import { useEffect, useState, useRef } from "react";
import * as faceapi from "face-api.js";
import "./App.css";

import html2canvas from "html2canvas";

function App() {
  const imageRef = useRef<HTMLImageElement>(null);

  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLImageElement>(null);

  const [shoot, setShoot] = useState<number>(0);
  const canvasRef4 = useRef<HTMLDivElement>(null);

  const finalImageRef = useRef<HTMLDivElement>();
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
        let textureExpresionx;
        if (Array.isArray(result)) {
          result.map(async (result, index) => {
            textureExpresionx = result.expression;

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
            const image = document.getElementById(`${shootx}`);
            if (image) {
              image.src = capturedImage;
            } else {
              console.error("Element not found");
            }
            const color = document.getElementById(`color-${shootx}`);
            let changecolor = "#000000";
            if (resultlandmarks == "happy") {
              changecolor = "#f8df6d";
            } else if (resultlandmarks == "angry") {
              changecolor = "#ed2225";
            }

            if (color) {
              color.style.backgroundColor = changecolor;
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

/*   useEffect(() => {
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
  }, []); */

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
  

  return (
    <div className=" bg-[#ed1699]  ">
      <div className="relative w-[300px] h-[300px]">
        {/* <video
          ref={videoRef}
          width="300"
          height="300"
          className="absolute z-20"
        ></video> */}

        <img src="/New Projectxd.png" alt=""  width="300"
          height="300"
          className="absolute z-20" ref={videoRef}/>
        <canvas
          ref={canvasRef2}
          className="absolute z-10 w-[300px] h-[300px] hidden"
        ></canvas>
      </div>

      <div className="relative">
        <div
          className=" w-[300px] h-[300px] bg-black z-10 flex justify-center items-center flex-col "
          ref={plantillaRef}
        >
          <div
            className="relative bg-[#ed1699] w-[300px] h-[300px]  overflow-hidden"
            ref={canvasRef4}
          >
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
      <div id="image-container" ref={finalImageRef}>
        <div
          className="bg-black w-[400px] h-[400px] flex justify-center items-center"
          id="color-1"
        >
          <img src="" alt="" id="1" />
        </div>

        <div
          className="bg-black w-[400px] h-[400px] flex justify-center items-center"
          id="color-2"
        >
          <img src="" alt="" id="2" />
        </div>

        <div
          className="bg-black w-[400px] h-[400px] flex justify-center items-center"
          id="color-3"
        >
          <div>
            <img src="" alt="" id="3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
