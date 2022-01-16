import Slider from "./components/Slider";
import images from './images'

function App() {
  return (
    <div className="App" style={{"height":"100vh"}}>
     <Slider slides={images} transitionTime={1} transitionInterval={5}></Slider>
    </div>
  );
}

export default App;
