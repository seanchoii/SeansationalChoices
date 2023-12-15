import './App.css';
import {GoogleMap,useLoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import { useMemo, useState } from "react";
import { restaurants } from './components/restaurants';

function App() {
  
  const center = useMemo(() => ({ lat: 51.0447, lng: -114.0719}), []);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showSushi, setShowSushi] = useState(true); 
  const [showRamen, setShowRamen] = useState(true); 
  const [showVietnamese, setVietnamese] = useState(true);
  const [showKorean, setKorean] = useState(true);
  const [showChicken, setChicken] = useState(true);
  const [showPizza, setPizza] = useState(true);
  const [showHamburger, setHamburger] = useState(true);
  const [showSteak, setSteak] = useState(true);
  const [showChinese, setChinese] = useState(true);
  const [showDessert, setDessert] = useState(true);
  const [showItalian, setItalian] = useState(true);
  const [showOther, setOther] = useState(true);
  
  const handleMapClick = () => {
    setSelectedRestaurant(null);
  };
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDuhuOQcN5FDe7hj8cp2lLrshxsAK1oJRw',
  });


  const handleSushiCheckboxChange = () => {
    setShowSushi(!showSushi);
  };
  const handleRamenCheckboxChange = () => {
    setShowRamen(!showRamen);
  };
  const handleVietnameseCheckboxChange = () => {
    setVietnamese(!showVietnamese);
  }; 
  const handleKoreanCheckboxChange = () => {
    setKorean(!showKorean);
  };
  const handleChickenCheckboxChange = () => {
    setChicken(!showChicken);
  };
  const handlePizzaCheckboxChange = () => {
    setPizza(!showPizza);
  };
  const handleHamburgerCheckboxChange = () => {
    setHamburger(!showHamburger);
  };
  const handleSteakCheckboxChange = () => {
    setSteak(!showSteak);
  };
  const handleChineseCheckboxChange = () => {
    setChinese(!showChinese);
  };
  const handleDessertCheckboxChange = () => {
    setDessert(!showDessert);
  };
  const handleItalianCheckboxChange = () => {
    setItalian(!showItalian);
  };
  const handleOtherCheckboxChange = () => {
    setOther(!showOther);
  };
const pickRandomRestaurant = () => {
  const filteredRestaurants = restaurants.filter(restaurant => {
    return (
      (showSushi && restaurant.type === 'sushi') ||
      (showRamen && restaurant.type === 'ramen') || 
      (showRamen && restaurant.type === 'vietnamese') ||
      (showRamen && restaurant.type === 'korean') ||
      (showRamen && restaurant.type === 'chicken') ||
      (showRamen && restaurant.type === 'pizza') ||
      (showRamen && restaurant.type === 'hamburger') ||
      (showRamen && restaurant.type === 'steak') ||
      (showRamen && restaurant.type === 'chinese') ||
      (showRamen && restaurant.type === 'italian') ||
      (showRamen && restaurant.type === 'dessert') ||
      (showRamen && restaurant.type === 'other') 
    );
  });

  const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);

  const randomRestaurant = filteredRestaurants[randomIndex];

  setSelectedRestaurant(randomRestaurant);
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
        <input type = "checkbox" name = "sushi" checked={showSushi} onChange={handleSushiCheckboxChange}></input>
        <label htmlFor = "sushi">Sushi🍣  </label>
        <input type = "checkbox" name = "ramen" checked={showRamen} onChange={handleRamenCheckboxChange}></input>
        <label htmlFor = "ramen">Ramen🥡  </label>
        <input type = "checkbox" name = "vietnamese" checked = {showVietnamese} onChange={handleVietnameseCheckboxChange}></input>
        <label htmlFor = "vietnamese">Vietnamese🍜</label><br></br><br></br>
        <input type = "checkbox" name = "korean" checked = {showKorean} onChange={handleKoreanCheckboxChange}></input>
        <label htmlFor = "korean">Korean🍙  </label>
        <input type = "checkbox" name = "chicken" checked = {showChicken} onChange={handleChickenCheckboxChange}></input>
        <label htmlFor = "chicken">Chicken🍗  </label>
        <input type = "checkbox" name = "pizza" checked = {showPizza} onChange={handlePizzaCheckboxChange}></input>
        <label htmlFor = "pizza">Pizza🍕</label> <br></br><br></br>
        <input type = "checkbox" name = "hamburger" checked = {showHamburger} onChange={handleHamburgerCheckboxChange}></input>
        <label htmlFor = "hamburger">Hamburger🍔</label>
        <input type = "checkbox" name = "steak" checked = {showSteak} onChange={handleSteakCheckboxChange}></input>
        <label htmlFor = "steak">Steak🥩</label>
        <input type = "checkbox" name = "chinese" checked = {showChinese} onChange={handleChineseCheckboxChange}></input>
        <label htmlFor = "chinese">Chinese🍚</label><br></br><br></br>
        <input type = "checkbox" name = "italian" checked = {showItalian} onChange={handleItalianCheckboxChange}></input>
        <label htmlFor = "italian">Italian🍝</label>
        <input type = "checkbox" name = "dessert" checked = {showDessert} onChange={handleDessertCheckboxChange}></input>
        <label htmlFor = "dessert">Dessert🍦</label>
        <input type = "checkbox" name = "other" checked = {showOther} onChange={handleOtherCheckboxChange}></input>
        <label htmlFor = "other">Other🌮</label>
        
        <div className='randomButton'>
          <p>Not sure where to eat tonight?</p>
          <button onClick={pickRandomRestaurant}>Pick a random restaurant</button>

        </div>   
        <small className = "name">seannnchoi@gmail.com <br></br> Email me for a restraunt suggestion!</small>
      </div>
   
      <div className = "map">   
      <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10.6}
            onClick={handleMapClick}
          >
            {restaurants.map((restaurant, index) => {
              const isSushi = showSushi && restaurant.type === 'sushi';
              const isRamen = showRamen && restaurant.type === 'ramen';
              const isVietnamese = showVietnamese && restaurant.type === 'vietnamese';
              const isKorean = showKorean && restaurant.type === 'korean';
              const isChicken = showChicken && restaurant.type === 'chicken';
              const isPizza = showPizza && restaurant.type === 'pizza';
              const isHamburger = showHamburger && restaurant.type === 'hamburger';
              const isSteak = showSteak && restaurant.type === 'steak';
              const isChinese = showChinese && restaurant.type === 'chinese';
              const isItalian= showItalian && restaurant.type === 'italian';
              const isDessert= showDessert && restaurant.type === 'dessert';
              const isOther= showOther && restaurant.type === 'other';


              if (isSushi || isRamen || isVietnamese || isKorean || isChicken || isPizza || isHamburger
                || isSteak || isChinese || isItalian || isDessert || isOther) {
                let iconUrl = '';
                if (isSushi) {
                  iconUrl = require('./assets/sushi.svg').default;
                } else if (isRamen) {
                  iconUrl = require('./assets/ramen.svg').default;
                } else if (isVietnamese) {
                  iconUrl = require('./assets/noodle.svg').default;
                } else if (isKorean) {
                  iconUrl = require('./assets/korean.svg').default;
                } else if (isChicken) {
                  iconUrl = require('./assets/chicken.svg').default;
                } else if (isPizza) {
                  iconUrl = require('./assets/pizza.svg').default;
                } else if (isHamburger){
                  iconUrl = require('./assets/hamburger.svg').default;
                }else if (isSteak){
                  iconUrl = require('./assets/steak.svg').default;
                }else if (isChinese){
                  iconUrl = require('./assets/dimsum.svg').default;
                }else if (isItalian){
                  iconUrl = require('./assets/spaghetti.svg').default;
                }else if (isDessert){
                  iconUrl = require('./assets/icecream.svg').default;
                }else if (isOther){
                  iconUrl = require('./assets/food.svg').default;
                }

            return (
              <MarkerF
                key={index}
                position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                title={restaurant.name}
                icon={{
                  url: iconUrl,
                  scaledSize: new window.google.maps.Size(30, 30),
                  size: new window.google.maps.Size(30, 30),
                }}
                onClick={() => {
                  setSelectedRestaurant(restaurant);
                }}
              />
            );
            }
            return null;
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
