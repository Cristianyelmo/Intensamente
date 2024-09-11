





function Loading() {
  
  return (

    <div className="bg-black h-screen  text-white flex justify-center items-center">
 <div  className="bg-black text-center flex flex-col items-center">

    <div className="relative w-[200px] h-[200px] overflow-hidden">
    <img src="/Loading.webp" width={400} height={400} className="absolute z-30 w-[200px] h-[200px]"  />
    <div className="bg-[#fc4040] w-[150px] h-[150px] z-20 absolute rounded-full opacity-0 bottom-0 left-[-60px] loadingCreative1"></div>
    <div className="bg-[#ffa13c] w-[100px] h-[100px] z-20 absolute rounded-full opacity-0 loadingCreative2"></div>
    <div className="bg-[#b553fa] w-[100px] h-[100px] z-20 absolute rounded-full opacity-0 ml-[31%] top-[-5px] loadingCreative3"></div>
    <div className="bg-[#0dfefb] w-[100px] h-[100px] z-20 absolute rounded-full opacity-0 ml-[31%] bottom-[40px] loadingCreative4"></div>
    <div className="bg-[#037aff] w-[100px] h-[100px] z-20 absolute rounded-full opacity-0 ml-[31%] bottom-[-20px] loadingCreative5"></div>
    <div className="bg-[#4af84a] w-[100px] h-[100px] z-20 absolute rounded-full opacity-0 ml-[60%] loadingCreative6"></div>
    <div className="bg-[#f7e416] w-[100px] h-[100px] z-20 absolute rounded-full opacity-0 ml-[60%] bottom-[30px] loadingCreative7"></div>
       
 
    </div>
<h1 >Cargando modelos...</h1>
<p>puede tardar algunos segundos :(</p>
</div>

</div>

  );
}

export default Loading;
