import Map from "./components/Map";
import {
  useJsApiLoader,
} from "@react-google-maps/api";


const libraries= ["places"]


function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position);
  //   });
  // }, []);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <Map/>
  
 
}

export default App;
