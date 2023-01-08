import './App.css';
import React, {useEffect, useeffect, useState } from 'react';
import autoprefixer from 'autoprefixer';
import { ImageCard } from './ImageCard';
import { ImageSearch } from './ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res => 
      res.json())
    .then(data => {
      setImages(data.hits);
      setisLoading(false);
    })
    .catch(err => console.log(err));
  }, [term]);
  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
    
    {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto">No images</h1>}

      {isLoading ? <h1 className="text-6xl text-center mx-auto">Loading...</h1> : <div className="grid grid-cols-3 gap-4" >
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
}</div>
  );
}

export default App;
