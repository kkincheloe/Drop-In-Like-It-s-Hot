import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentSection from '../CommentSection';
import poiImages from '../../../public/images/poi-images'; 

function DetailsPage() {
    const [poiDetails, setPoiDetails] = useState(null);
    const { poiId } = useParams();

    useEffect(() => {
        axios.get('https://fortnite-api.com/v1/map')
          .then(response => {
            const poi = response.data.data.pois.find(poi => poi.id === poiId);
            setPoiDetails(poi);
          })
          .catch(error => console.error('Error fetching POI details:', error));
    }, [poiId]);

    if (!poiDetails) return <div>Loading Details...</div>;

    return (
        <div>
          <h1>🔥Drop Details🔥</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ width: '200px' }}>
              <h2 style={{ fontSize: '16px', textAlign: 'center' }}>{poiDetails.name}</h2>
              <img src={poiImages[poiDetails.id] || 'public/images/poi-images'} alt={poiDetails.name} style={{ width: '40%', height: '40%' }} />
              <CommentSection poisId={poiDetails.id} />
            </div>
          </div>
        </div>
    );
}

export default DetailsPage;
