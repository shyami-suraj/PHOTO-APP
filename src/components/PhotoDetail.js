import React from 'react';
import { useSelector } from 'react-redux';
import { useParams} from 'react-router-dom'
import { Card } from 'react-bootstrap';

const PhotoDetails = () => {
  const { id } = useParams();
  const photoId = parseInt(id);
  const photo = useSelector((state) => state.photos.photos.find((p) => p.id === photoId));

  if (!photo) {
    return <div>Photo not found</div>;
  }

  return (
    // displaying photo details
    <Card className="photo-card" style={{margin:10 }}>
        <button className="btn btn-secondary" onClick={() => window.history.back()} style={{ borderRadius:10, padding: '10px 20px' , marginRight:'10px' }}>Back</button>
      <Card.Body>
        <h2 style={ {display:'flex',flexDirection:'row',}}>Title:<Card.Title>{photo.title}</Card.Title></h2>
        <h3 style={ {display:'flex',flexDirection:'row',}}>Album Id:<Card.Subtitle className="mb-2 text-muted">{photo.albumId}</Card.Subtitle></h3>
        <Card.Text >
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <h3>URL:</h3><p>{photo.url}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PhotoDetails;