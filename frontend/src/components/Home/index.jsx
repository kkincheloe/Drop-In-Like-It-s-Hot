import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import poiImages from '../../../public/images/poi-images';

const HomePage = () => {
    const [pois, setPois] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
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
            <h1 style={{backgroundColor: 'rgb(159, 74, 179)', height: '60px', margin: '10px', padding: '10px', fontSize: '48px'}}>Fortnite: Drop In Like It's Hot</h1>
            {/* Search Bar */}
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Search for a drop..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    style={{ width: '300px', padding: '10px', fontSize: '16px' }}
                />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', border: '10px solid blue'}}>
            {filteredPois.map((poi, index) => (
              <div key={index} style={{ width: 'calc(25% - 20px)', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/details/${poi.id}`)}>
                <h2 style={{ fontSize: '24px', textAlign: 'center', justifyContent: 'center' }}>{poi.name}</h2>
                <img src={poiImages[poi.id] || 'public/images/poi-images/default.png'} alt={poi.name} style={{ width: '350px', height: '250px', border: '10px solid blue'}} />
              </div>
            ))}
          </div>
        </div>
      );
};

export default HomePage;
