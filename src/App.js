import './App.css';
import {GoogleMap,useLoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import { useMemo, useState } from "react";
import { restaurants } from './components/restaurants';

function App() {
  
  const center = useMemo(() => ({ lat: 51.0447, lng: -114.0719}), []);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showSushi, setShowSushi] = useState(false); // State to track sushi checkbox

  const handleMapClick = () => {
    setSelectedRestaurant(null);
  };
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDuhuOQcN5FDe7hj8cp2lLrshxsAK1oJRw',
  });
  const filteredRestaurants = showSushi ? restaurants.filter(restaurant => restaurant.type === 'sushi') : restaurants;

  const handleSushiCheckboxChange = (event) => {
    setShowSushi(!event.target.checked);
  };
  if(!isLoaded){
    return <></>
  }
  return (
    <div className="App">
      <div className = "menu">
        <h1 style={{fontSize: '40px'}}>Calgary's</h1>
        <h1 style = {{fontSize: '40px'}}>(Sean)sational</h1>
        <h1 style = {{fontSize: '40px'}}>(Choi)ces 🍴</h1>
        <p>- Restraunts in Calgary that I visited ✅</p>
        <p>- Brutally Honest Reviews ✅</p><br></br>
        <input type = "checkbox" name = "sushi" checked={!showSushi} onChange={handleSushiCheckboxChange}></input>
        <label for = "sushi">Sushi🍣  </label>
        <input type = "checkbox" name = "korean"></input>
        <label for = "korean">Korean🍙</label>
        <small className = "name">seannnchoi@gmail.com <br></br> Email me for a restraunt suggestion!</small>
      </div>
   
      <div className = "map">   
      <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10.6}
            onClick={handleMapClick}
          >
            {filteredRestaurants.map((restaurant, index) => (
              <MarkerF
              key={index}
              position={{lat:restaurant.latitude, lng: restaurant.longitude}}
              title={restaurant.name}
              icon={{
                url:(require('./assets/sushi-24.svg')).default,
                scaledSize: new window.google.maps.Size(45,45),
                size: new window.google.maps.Size(45,45),
              }}
              onClick={() => {
                setSelectedRestaurant(restaurant);
              }}
            />
            ))}
            {selectedRestaurant && (
          <InfoWindowF
            position={{ lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude }}
            onCloseClick={() => {
              setSelectedRestaurant(null);
            }}
          >
            <div style = {{maxWidth: '400px'}}>
              <h2>{selectedRestaurant.name}</h2>
              <p>Address: {selectedRestaurant.address}</p>
              {/* Add more details for each restaurant */}
              <p>{selectedRestaurant.rating}</p>
            </div>
          </InfoWindowF>
        )}

          </GoogleMap>      
      </div>
    </div>
  );
}

export default App;
