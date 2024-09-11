
import "./App.css";
import { MainHook } from "./context/MainContext";
import Loading from "./components/Loading";
import Menu from "./components/Menu";



function App() {
 const {loading} = MainHook()

 console.log(loading)
  return (
    <>
    {
   
    loading ?  <Loading/>  : <Menu/> 
  }
  </>
);

}

export default App;
