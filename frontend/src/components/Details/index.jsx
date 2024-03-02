import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentSection from '../CommentSection';
// import poiImages from '../../../public/images/poi-images'; 
import poiImages from '../../../public/images/poi-images';

function DetailsPage() {
    const [poiDetails, setPoiDetails] = useState([]);
    const { poisId } = useParams();

    useEffect(() => {
        axios.get('https://fortnite-api.com/v1/map')
          .then(response => {
            const poi = response.data.data.pois.find(poi => poi.id === poisId);
            setPoiDetails(poi);
          })
          .catch(error => console.error('Could not fetch POI details:', error));
    }, [poisId]);

    if (!poiDetails) return <div>Loading Details...</div>;
    console.log(poiImages[poiDetails.id])
    return (
        <div>
          <h1>🔥Drop Details🔥</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ width: '200px' }}>
              <h2 style={{ fontSize: '16px', textAlign: 'center' }}>{poiDetails.name}</h2>
              {/* <img src={"../public/images/pois/TheOtherOtherWindmill.webp"} alt={poiDetails.name} style={{ width: '200px', height: '150px' }} /> */}
              {/* <img src={poiImages[poiDetails.id]} alt={poiDetails.name} style={{ width: '200px', height: '150px' }} /> */}
              <img src={poiImages[poiDetails.id] || '../public/images/poi-images'} alt={poiDetails.name} style={{ width: '200px', height: '150px' }} />
              <CommentSection poisId={poiDetails.id} />
            </div>
          </div>
        </div>
    );
}

export default DetailsPage;
