import {Routes,Route} from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Details from "./components/Details";
import NotFound from "./components/NotFound";
import Form from "./components/Form";
import Loading from "./components/Loading";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/pokemons" element={<Home/>}/>
      <Route path="/pokemons/:id" element={<Details/>}/>
      <Route path="/new" element={<Form/>}/>
      <Route path="/loading" element={<Loading/>}/>
      <Route path="/update/:id" element={<Form/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
