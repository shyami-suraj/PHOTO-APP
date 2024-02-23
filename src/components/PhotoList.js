import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../features/photos/photosSlice';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const PhotoList = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [albumId, setAlbumId] = useState(1);

  useEffect(() => {
    console.log(page);
    const debounceSearch = setTimeout(() => {
      dispatch(fetchPhotos({ albumId, searchTerm, currentPage: page }));
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [dispatch, albumId, searchTerm, page]);

  const albumOptions = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: `Album ${i + 1}`
  }));

  const handleAlbumChange = (e) => {
    setAlbumId(parseInt(e.target.value));
    setPage(1);
  };

  return (
    <div className="photo-list d-flex flex-row" style={{margin:10}}>
      {/* adding searchbar */}
      <input
        type="text"
        placeholder="Search photos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{width:'50%',height:50,margin:10,padding:10, borderRadius:10}}
      />
      <select value={albumId} onChange={handleAlbumChange} style={{width:'20%',height:50,margin:10,padding:10, borderRadius:10}}>
        {albumOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* displaying photos in card */}
      <Row xs={1} md={4} lg={5} className="g-4" style={{marginBottom:30,display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        {photos.map((photo) => (
          <Col key={photo.albumId} style={{width:300}}>
            <Link to={`/photos/${photo.id}`}>
              <Card className="photo-card" style={{ width: '12rem' }}>
                <Card.Img variant="top" src={photo.thumbnailUrl} alt={photo.title} />
                <Card.Body>
                  <Card.Title style={{paddingTop:20}}>{photo.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {/* adding pagination */}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn btn-primary" style={{ borderRadius:10, padding: '10px 20px' , marginRight:'10px' }} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button className="btn btn-primary" style={{ borderRadius:10 ,padding: '10px 20px'  }} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

const totalPages = 10; 

export default PhotoList;