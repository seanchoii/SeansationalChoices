import './App.css';
import {GoogleMap,useLoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import { useMemo, useState } from "react";
import { restaurants } from './components/restaurants';

function App() {
  
  const center = useMemo(() => ({ lat: 51.0447, lng: -114.0719}), []);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showSushi, setShowSushi] = useState(false); // State to track sushi checkbox
  const [showRamen, setShowRamen] = useState(false); // State to track ramen checkbox

  const handleMapClick = () => {
    setSelectedRestaurant(null);
  };
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDuhuOQcN5FDe7hj8cp2lLrshxsAK1oJRw',
  });
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (!showSushi && restaurant.type === 'sushi') return true;
    if (!showRamen && restaurant.type === 'ramen') return true;
    return false;
  });

  const handleSushiCheckboxChange = (event) => {
    setShowSushi(!event.target.checked);
  };

  const handleRamenCheckboxChange = () => {
    setShowRamen(!showRamen);
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
        <input type = "checkbox" name = "ramen" checked={!showRamen} onChange={handleRamenCheckboxChange}></input>
        <label for = "ramen">Ramen🥡</label>
        <small className = "name">seannnchoi@gmail.com <br></br> Email me for a restraunt suggestion!</small>
      </div>
   
      <div className = "map">   
      <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10.6}
            onClick={handleMapClick}
          >
            {filteredRestaurants.map((restaurant, index) => {
            let iconUrl = ''; // Default icon URL
            if (restaurant.type === 'sushi') {
              iconUrl = require('./assets/sushi.svg').default; // Sushi icon URL
            } else if (restaurant.type === 'ramen') {
              iconUrl = require('./assets/ramen.svg').default; // Ramen icon URL
            }

            return (
              <MarkerF
                key={index}
                position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                title={restaurant.name}
                icon={{
                  url: iconUrl,
                  scaledSize: new window.google.maps.Size(35, 35),
                  size: new window.google.maps.Size(35, 35),
                }}
                onClick={() => {
                  setSelectedRestaurant(restaurant);
                }}
              />
            );
          })}
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
