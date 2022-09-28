import {Route,Routes} from "react-router-dom";
import Landing from "./components/Landing";
import Pokemons from "./components/Pokemons";
import Details from "./components/Details";
import NotFound from "./components/NotFound";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/pokemons" element={<Pokemons/>}/>
        <Route path="/pokemons/:id" element={<Details/>}/>
        <Route path="/create" element={<Form/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
