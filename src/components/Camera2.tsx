



import { useEffect } from "react";
import { MainHook } from "../context/MainContext";

function Camera2() {

  
const {loading,videoRef,KeyframesCount,canvasRef2,plantillaRef,canvasRef4,canvasRef3,imageRef,CapturePhoto,finalImageRef} = MainHook() || {}; 

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
  return (
    <div className=" bg-[#ed1699]">
      {loading && <div className="loadingx">cargando</div>}
      <div className="">
        <div className="relative w-[300px] h-[300px]">
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
      </div>

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

      <button
        onClick={CapturePhoto}
        className="absolute  z-40 bg-black text-white"
      >
        hola
      </button>

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
    </div>
  );
}

export default Camera2;