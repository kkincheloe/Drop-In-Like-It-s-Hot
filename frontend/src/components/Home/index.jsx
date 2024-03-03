import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import poiImages from '../../../public/images/poi-images';
import Navbar from '../NavBar';
import './styles.css'

const HomePage = () => {
    const [pois, setPois] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('https://fortnite-api.com/v1/map')
        .then(response => {
          setPois(response.data.data.pois);
        })
        .catch(error => console.error('Error fetching data: ', error));
    }, []);
  
    const filteredPois = pois.filter(poi =>
        !searchQuery || poi.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    

    return (
        <div>
            <Navbar />
            <h1 className="pageTitle">Fortnite: Drop In Like It's Hot</h1>
            <div className="searchContainer">
                <input 
                    type="text" 
                    placeholder="Search for a drop..."
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="searchInput"
                />
            </div>
            <div className="cardsContainer">
                {filteredPois.map((poi, index) => (
                    <div key={index} className="card" onClick={() => navigate(`/details/${poi.id}`)}>
                        <h2 className="cardTitle">{poi.name}</h2>
                        <img src={poiImages[poi.id] || 'public/images/poi-images/default.png'} alt={poi.name} className="cardImage" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
