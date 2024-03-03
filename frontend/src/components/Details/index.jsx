import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentSection from '../CommentSection'; 
import poiImages from '../../../public/images/poi-images';
import Navbar from '../NavBar';
import './styles.css'

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
            <Navbar />
          <h1 style={{backgroundColor: 'rgb(159, 74, 179)', height: '70px', margin: '0', padding: '0', fontSize: '48px', width: '100%', textAlign: 'center'}}>🔥Drop Details🔥 </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', textAlign: 'center', justifyContent: 'center', background: "url('https://i.redd.it/ab94i3q4agk21.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div style={{ width: '100%' }}>
              <h2 style={{ fontSize: '32px', textAlign: 'center', justifyContent: 'center' }}>{poiDetails.name}</h2>
              <img src={poiImages[poiDetails.id] || '../public/images/poi-images'} alt={poiDetails.name} style={{  height: '300px', border: '10px solid rgb(112, 189, 230)', textAlign: 'center', justifyContent: 'center' }} />
              <CommentSection poisId={poiDetails.id} />
            </div>
          </div>
        </div>
    );
    
}

export default DetailsPage;
