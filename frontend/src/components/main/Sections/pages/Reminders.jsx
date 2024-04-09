import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Reminders = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [medicines, setmedicines] = useState([]);
  const [medicineDates, setMedicineDates] = useState({});
  const [userData,setUserData] = useState();


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:3000/users/mydetails');
      setUserData(() => {
          return response.data;
      });
  };
  getData();
  },[]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image");
      return;
    }

    toast.info("Uploading image please wait");

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
      toast.success("Image Uploaded Successfully");
      setIsLoading(false);
    } catch (error) {
      setError("Error uploading image");
      setIsLoading(false);
    }
  };


  // Reminder timing change
  const handleDateChange = (date, medicineName) => {
    setMedicineDates((prevDates) => ({
      ...prevDates,
      [medicineName]: date,
    }));
    console.log(medicineDates);
  };


  // Reminder submit
  const handleSetReminder = async () => {
    const newObject = {
      medicineDates : [{}],
      number : userData.phone
    };
    Object.entries(medicineDates).map(([medicineName,date]) => {
      console.log(medicineName,date.toLocaleDateString(),date.toLocaleTimeString());
      newObject.medicineDates.push({
        [medicineName] : `${date.toLocaleDateString()}T${date.toLocaleTimeString()}`
      });
    });
    
    const response = await axios.post('http://localhost:3000/users/reminders', newObject);
    console.log(response.data); 
  }
  
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
          return (
            <div key={item.medicine}>
              <div key={item.medicine}>
                {item.medicine} - {item.dosage}
              </div>
              <DatePicker
                selected={medicineDates[item.medicine] || new Date()}
                onChange={(date) => handleDateChange(date, item.medicine)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
          );
        })}
      </div>

        <div className="col-md-6">
          <div>Contact Number</div>
          <input type="number" value={userData ? userData.phone : null} readOnly></input>
        </div>
        <div className="col-md-6">
          <button onClick={handleSetReminder}>Set Reminders</button>
        </div>
    </>
  );
};

export default Reminders;
