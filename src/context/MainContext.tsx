import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import * as faceapi from "face-api.js";
import html2canvas from "html2canvas";
// Crear el contexto

interface MainContextType {
  loading: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  KeyframesCount: string;
  canvasRef2: React.RefObject<HTMLCanvasElement>;
  plantillaRef: React.RefObject<HTMLDivElement>;
  canvasRef4: React.RefObject<HTMLDivElement>;
  canvasRef3: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  imageRef2: React.RefObject<HTMLImageElement>;
  CapturePhoto: () => void;
  finalImageRef: React.RefObject<HTMLDivElement>;
  changePage: string;
  setChangePage: (value: string) => void;
  shoot: number;
  finalShoot: boolean;
  setFinalShoot: (value: boolean) => void;
  linkDownloadRef: React.RefObject<HTMLAnchorElement>;
  viewimageFinal: boolean;
  setviewimageFinal: (value: boolean) => void;
}
export const MainContext = createContext<MainContextType | null>(null);
export const MainHook = () => {
  const context = useContext(MainContext);

  if (context === null) {
    throw new Error("useMainContext must be used within a MainProvider");
  }

  return context;
};

interface MyProviderProps {
  children: ReactNode;
}

export const MainProvider: React.FC<MyProviderProps> = ({ children }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const imageRef2 = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLDivElement>(null);
  const plantillaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [shoot, setShoot] = useState<number>(0);
  const canvasRef4 = useRef<HTMLDivElement>(null);
  const finalImageRef = useRef<HTMLDivElement>(null);

  const [KeyframesCount, setKeyframesCount] = useState<string>("");
  const testapi = async (imageSrc: string, shootx: number) => {
    const processInfoFaceApi = async (imageSrc: string) => {
      try {
        console.log(imageRef.current);

        console.log("aca esta la imagen");
        if (imageSrc !== "no" && imageRef.current) {
          imageRef.current.src = imageSrc;
        }

        const image = new Image();
        image.src = "/New Project(3).jpg";
        image.width = 300;
        image.height = 300;

        console.log(imageRef.current);

        const fullFaceDescriptions = await faceapi
          .detectAllFaces(imageRef.current ? imageRef.current : image)
          .withFaceLandmarks()
          .withFaceExpressions();
        console.log(fullFaceDescriptions);

        if (fullFaceDescriptions.length > 0) {
          const newArray = fullFaceDescriptions.map(
            ({ expressions, landmarks }) => {
              let highestExpression = "";
              let highestValue = -Infinity;

              for (const [expression, value] of Object.entries(expressions)) {
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
        }
      } catch (error) {
        console.error("Error durante la detección facial:", error);
      } finally {
        console.log("hasta aca llego");
        setLoading(false);
      }
    };

    try {
      const result = await processInfoFaceApi(imageSrc);

      const landMarksProcess = () => {
        if (Array.isArray(result)) {
          result.map(async (result, index) => {
            console.log(result.expression);
            console.log("acaaaaa esta la imagen");
            let textureExpresionx2 = result.expression;

            const landmarks = result.landmarks;

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
                  console.log(textureExpresionx2);
                  image.src = `/texture/${textureExpresionx2}.png`;

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

          const textureExpresionx = result.map((item) => item.expression);

          return textureExpresionx;
        }
      };

      const resultlandmarks = await landMarksProcess();

      const screenShotImage = () => {
        if (plantillaRef.current) {
          html2canvas(plantillaRef.current)
            .then((capturedCanvas) => {
              const capturedImage = capturedCanvas.toDataURL("image/png");

              const image = document.getElementById(
                `${shootx}`
              ) as HTMLImageElement;
              if (image) {
                image.src = capturedImage;
              } else {
                console.error("Element not found");
              }
              const color = document.getElementById(`color-${shootx}`);

              if (color) {
                const resultlandmarksLength = resultlandmarks?.length || 1;
                color.style.display = "grid";
                color.style.gridTemplateColumns = `repeat(${resultlandmarksLength}, 1fr)`;
              }
              if (resultlandmarks) {
                resultlandmarks?.map((item) => {
                  const newDiv = document.createElement("div");

                  newDiv.style.backgroundImage = `url('/texture/${item}.png')`;
                  newDiv.style.backgroundRepeat = "repeat";
                  newDiv.style.width = "100%";
                  newDiv.style.height = "100%";

                  if (color) {
                    color.appendChild(newDiv);
                  }
                });
              } else {
                const newDiv = document.createElement("div");

                newDiv.style.backgroundImage = `url('/texture/undefined.png')`;
                newDiv.style.backgroundRepeat = "repeat";
                newDiv.style.width = "100%";
                newDiv.style.height = "100%";

                if (color) {
                  color.appendChild(newDiv);
                }
              }
            })
            .then(() => {
              if (canvasRef4.current) {
                canvasRef4.current.innerHTML = "";
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

              if (imageRef2.current) {
                imageRef2.current.src = capturedImage;
              }
              if (linkDownloadRef.current) {
                linkDownloadRef.current.href = capturedImage;
                linkDownloadRef.current.download = "descarga.png";
              }
              /* const link = document.createElement("a");

              link.href = capturedImage;

              link.download = "descarga.png";

              link.click(); */
            });
          }
        }, 3000);

        setTimeout(() => {
          setviewimageFinal(true);
          const color = document.getElementById("color-1");
          const color2 = document.getElementById("color-2");
          const color3 = document.getElementById("color-3");
          if (color) {
            color.innerHTML = "";
          }

          if (color2) {
            color2.innerHTML = "";
          }

          if (color3) {
            color3.innerHTML = "";
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

        await testapi(dataURL, shootx);
      }
    };
    const shootPhotos = (currentShoot: number) => {
      const audio = new Audio("/sound/sound-camera.mp3");

      setKeyframesCount(`box${currentShoot}`);
      if (currentShoot < 3) {
        setTimeout(async () => {
          audio.play();
          await Capturenew(currentShoot + 1);

          setShoot(currentShoot + 1);
          shootPhotos(currentShoot + 1);
        }, 3000);
      } else {
        console.log("lito");
        setShoot(0);
        setFinalShoot(true);
      }
    };

    shootPhotos(shoot);
  };

  const [finalShoot, setFinalShoot] = useState<boolean>(false);
  const [viewimageFinal, setviewimageFinal] = useState<boolean>(false);

  const [changePage, setChangePage] = useState<string>("Home");

  const linkDownloadRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <MainContext.Provider
      value={{
        setviewimageFinal,
        viewimageFinal,
        linkDownloadRef,
        imageRef2,
        setFinalShoot,
        finalShoot,
        shoot,
        changePage,
        setChangePage,
        loading,
        videoRef,
        KeyframesCount,
        canvasRef2,
        plantillaRef,
        canvasRef4,
        canvasRef3,
        imageRef,
        CapturePhoto,
        finalImageRef,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
