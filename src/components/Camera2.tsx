import { useEffect, useState } from "react";
import { MainHook } from "../context/MainContext";

function Camera2() {
  const {
    setviewimageFinal,
    viewimageFinal,
    linkDownloadRef,
    imageRef2,
    setFinalShoot,
    finalShoot,
    setChangePage,
    videoRef,
    KeyframesCount,
    canvasRef2,
    plantillaRef,
    canvasRef4,
    canvasRef3,
    imageRef,
    CapturePhoto,
    finalImageRef,
    disableButton,
  } = MainHook() || {};

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

  useEffect(() => {
    const ValueInitial = () => {
      setFinalShoot(false);
      setviewimageFinal(false);
    };
    ValueInitial();
  }, []);

  const [instructionsSteptoStep, setInstructionsSteptoStep] =
    useState<boolean>(true);

  return (
    <div className="min-h-screen background-image">
      <button
        onClick={() => setChangePage("Home")}
        className="absolute z-50 bg-black text-white p-4 m-4"
      >
        Volver
      </button>

      <div className="relative ">
        <div
          className=" w-[300px] h-[300px] bg-black z-10 flex justify-center items-center flex-col absolute2"
          ref={plantillaRef}
        >
          <div className="relative bg-[#ed1699] w-[300px] h-[300px]  overflow-hidden">
            <div className=" w-[300px] h-[300px] absolute z-50">
              <div
                className="w-[300px] h-[300px] relative"
                ref={canvasRef4}
              ></div>
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
      <div
        id="image-container"
        ref={finalImageRef}
        className="space-y-2 bg-black absolute2"
      >
        <div className="bg-black w-[400px] h-[400px] flex justify-center items-center">
          <img
            src=""
            alt=""
            id="1"
            width="300"
            height="300"
            className="absolute z-30"
          />
          <div className="w-[400px] h-[400px]" id="color-1">
            {/* <div className="bg-[#f8df6d] w-full h-full"></div>
  <div className="bg-[#ed2225] w-full h-full"></div> */}
          </div>
        </div>

        <div className="bg-black w-[400px] h-[400px] flex justify-center items-center">
          <img
            src=""
            alt=""
            id="2"
            width="300"
            height="300"
            className="absolute z-30"
          />

          <div className="w-[400px] h-[400px]" id="color-2"></div>
        </div>

        <div className="bg-black w-[400px] h-[400px] flex justify-center items-center">
          <img
            src=""
            alt=""
            id="3"
            width="300"
            height="300"
            className="absolute z-30"
          />

          <div className="w-[400px] h-[400px]" id="color-3">
            {/* <div className="bg-[#f8df6d] w-full h-full"></div>
  <div className="bg-[#ed2225] w-full h-full"></div> */}
          </div>
        </div>
      </div>

      {finalShoot && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-20 bg-opacity-90">
          <p className={`${viewimageFinal ? "hidden" : "block"} text-white`}>
            espere....
          </p>
          <div
            className={`${
              viewimageFinal ? "block" : "hidden"
            } flex flex-col items-center space-y-4`}
          >
            <img
              src=""
              alt=""
              ref={imageRef2}
              width={150}
              height={150}
              className="imgFinal"
            />
            <div className="flex space-x-4">
              <a
                ref={linkDownloadRef}
                className=" p-2 bg-black text-[#f8df6d] border-[1px] border-[#f8df6d] "
              >
                descargar
              </a>
              <button
                onClick={() => {
                  setFinalShoot(false);
                  setviewimageFinal(false);
                }}
                className=" p-2 bg-black text-[#ac7fbd] border-[1px] border-[#ac7fbd]"
              >
                volver
              </button>
            </div>
          </div>
        </div>
      )}

      {instructionsSteptoStep && (
        <div className="fixed inset-0 w-full  flex flex-col items-center justify-center bg-black z-20 bg-opacity-90 overflow-y-auto">
          <div className="bounce-in-img  p-10   grid md:grid-cols-4 grid-cols-1 gap-10 mt-80 md:mt-10">
            <div
              className={` flex flex-col items-center text-[#ac7fbd]  md:w-[200px] `}
            >
              {/*  <div className="w-[100px] h-[100px] bg-black"></div> */}
              <img src="/xd.svg" width={100} height={100} />
              <h1>Paso 1</h1>

              <p>Activar la camara</p>
            </div>

            <div className="   flex flex-col items-center text-[#f8df6d]  md:w-[200px] ">
              <img src="/xd2.svg" width={100} height={100} />
              <h1>Paso 2</h1>
              <p>Apretar el boton de Empieza</p>
            </div>

            <div className="   flex flex-col items-center text-[#89c657] md:w-[200px] ">
              <img src="/xd3.svg" width={100} height={100} />
              <h1>Paso 3</h1>
              <p>
                La camara va sacar fotos cada 3 segundos 3 veces y va detectar
                tu expresion (trata de buscar un lugar donde se vea bien tu
                rostro)
              </p>
            </div>

            <div className="  flex flex-col items-center text-[#f06eaa]  md:w-[200px] ">
              <img src="/xd4.svg" width={100} height={100} />
              <h1>Paso 4</h1>
              <p>
                Una vez termina las 3 fotos,esperas un momento y te aparecera
                una visualizacion de la imagen y la opcion de descargarla o
                salir
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => setInstructionsSteptoStep(false)}
              className=" px-6 py-2 text-[#f8df6d] border-[#f8df6d] border-[4px]  mb-10"
            >
              Oki
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-white p-4 flex flex-col items-center bounce-in-img ">
          <div className="relative w-[300px] h-[300px] ">
            <div
              className={` w-[50px] z-30 h-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${KeyframesCount}`}
            ></div>
            <video
              ref={videoRef}
              width="300"
              height="300"
              className="absolute z-20 w-[300px] h-[300px] object-cover"
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
          <button
            onClick={CapturePhoto}
            className={` text-white p-4 mt-10 ${
              disableButton ? "bg-[#006C3A]" : "bg-black"
            }`}
            disabled={disableButton}
          >
            <p className={`${disableButton && "buttonCameraProcess"}`}>
              {disableButton ? "Expresa!" : "Empieza!"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Camera2;
