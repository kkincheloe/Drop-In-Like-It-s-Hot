import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import poiImages from '../../../public/images/poi-images';

const HomePage = () => {
    const [pois, setPois] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('https://fortnite-api.com/v1/map')
        .then(response => {
          setPois(response.data.data.pois);
        })
        .catch(error => console.error('Error fetching data: ', error));
    }, []);
  
    return (
        <div>
          <h1>Fortnite Drops</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {pois.map((poi, index) => (
              <div key={index} style={{ width: '200px', cursor: 'pointer' }} onClick={() => navigate(`/details/${poi.id}`)}>
                <h2 style={{ fontSize: '16px', textAlign: 'center' }}>{poi.name}</h2>
                <img src={poiImages[poi.id] || 'backend/poi-images'} alt={poi.name} style={{ width: '50px', height: '50px' }} />
                <Link to={`/pois/${poi.id}`} className="text-blue-600 hover:underline">View Details</Link>
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default HomePage;