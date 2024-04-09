import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './Doctor.css'

import docdata from "../../../../data/doctors_data.json";
const Doctors = () => {
  const [data, setData] = useState([]);
  const [indexes, setIndexes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/users/mydetails");
      console.log(response.data.medInfo.length);
      setData(() => {
        return response.data.medInfo;
      });

      setIndexes(() => {
        let temp = [];
        for (let i = 0; i < response.data.medInfo.length; i++) {
          temp.push(getRandomNumber(docdata));
        }
        return temp;
      });
    };
    getData();
  }, []);

  const getRandomNumber = (array) => {
    const randomNumber = Math.floor(Math.random() * array.length);
    return randomNumber;
  };

  return (
    <div>
      {data.length === 0
        ? null
        : data.map((item) => {
            return (
              <div key={item.length}>
                <div className="col-md-12">{item.medicalHistory[0]}</div>
                <table className="tabledoc">
                  <thead className="docheader">
                    <tr className="docTR">
                      <th className="docTH">Doctor Name</th>
                      <th className="docTH">Phone</th>
                      <th className="docTH">Address</th>
                      <th className="docTH">Years of Experience</th>
                    </tr>
                  </thead>
                  <tbody className="docBody">
                    {indexes.map((index) => (
                      <tr  className="docTR"  key={index}>
                        <td className="docTD">{docdata[index].Doctor}</td>
                        <td className="docTD">{docdata[index].Phno}</td>
                        <td className="docTD">{docdata[index].addr_l}</td>
                        <td className="docTD">{docdata[index].year_l}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <br></br>
              </div>
            );
          })}
    </div>
  );
};

export default Doctors;
