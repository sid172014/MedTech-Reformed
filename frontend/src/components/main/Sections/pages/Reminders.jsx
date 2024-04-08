import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

const Reminders = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [medicines,setmedicines] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setmedicines(response.data.message);
      toast.success("Image Uploaded Successfully")
      setIsLoading(false);
    } catch (error) {
      setError("Error uploading image");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="col-md-12">
        <h1>Upload Picture</h1>
        <div>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <button onClick={handleSubmit}>Upload</button>
        </div>

        {isLoading && <p>Uploading image...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="col-md-12">
        {medicines.length === 0 ? null : medicines.map((item) => {
            return <div key={item.medicine}>{item.medicine} - {item.dosage}</div>
        })}
        
      </div>
    </>
  );
};

export default Reminders;
