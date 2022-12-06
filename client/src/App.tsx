import {Routes,Route} from "react-router-dom";
import Landing from "./components/Landing";
import Pokedex from "./components/Pokedex";
//import Details from "./components/Details";
import NotFound from "./components/NotFound";
//import Form from "./components/Form";

/*<Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/pokemons" element={<Pokemons/>}/>
      <Route path="/pokemons/:id" element={<Details/>}/>
      <Route path="/create" element={<Form/>}/>
      <Route path="*" element={<NotFound/>}/>
  </Routes>*/

function App() {
  return (
    <Pokedex/>
  );
}

export default App;
