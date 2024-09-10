
import "./App.css";
import { MainHook } from "./context/MainContext";
import Loading from "./components/Loading";
import Camera2 from "./components/Camera2";



function App() {
 const {loading} = MainHook()

 console.log(loading)
  return (
    <>
    {
   
    loading ? <Loading/> : <Camera2/>
  }
  </>
);

}

export default App;
