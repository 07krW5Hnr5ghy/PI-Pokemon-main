import {Route,Routes} from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Pokemons from "./components/Pokemons/Pokemons";
import Details from "./components/Details/Details";
import NotFound from "./components/NotFound/NotFound";
import Create from "./components/Create/Create";
import './App.css';

function App() {
  return (
    /*<div className="App">
      <h1>Henry Pokemon</h1>
    </div>*/
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/pokemons" element={<Pokemons/>}/>
        <Route path="/pokemons/:id" element={<Details/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
