import { useState } from "react";
import axios from 'axios'

const Reminders = () =>{
    const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.imageUrl);
      setIsLoading(false);
    } catch (error) {
      setError('Error uploading image');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Picture</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Upload</button>

      {isLoading && <p>Uploading image...</p>}
      {error && <p>Error: {error}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />}
    </div>
  );
  };

export default Reminders;