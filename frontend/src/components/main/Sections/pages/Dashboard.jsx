import { useState } from "react";
import './dashboard.css'

import axios from 'axios';

// Importing Raw Data
import data from '../../../../data/tests.json'

const Dashboard = () => {

    const filteredDataForMedical = data.map((item) => {
        return item.medicalcondition;
    });

    const filteredDataForSymptoms = data.map((item) => {
        const items = item.symptoms.split(',');
        return items
    });

    const uniqueArray2 = [...new Set(filteredDataForSymptoms.flat())];

    const suggestions1 = filteredDataForMedical;
    const suggestions2 = uniqueArray2;

  
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [matchedSuggestions1, setMatchedSuggestions1] = useState([]);
    const [matchedSuggestions2, setMatchedSuggestions2] = useState([]);
    const [selectedItems1, setSelectedItems1] = useState([]);
    const [selectedItems2, setSelectedItems2] = useState([]);
    const [testsRecommended,settestsRecommended] = useState([]);
  
    const handleInputChange1 = (e) => {
      const value = e.target.value;
      setInputValue1(value);
      const matched = suggestions1.filter(suggestion => 
        suggestion.toLowerCase().includes(value.toLowerCase())
      );

      
      setMatchedSuggestions1(matched);
    };
  
    const handleInputChange2 = (e) => {
      const value = e.target.value;
      setInputValue2(value);
      const matched = suggestions2.filter(suggestion => 
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setMatchedSuggestions2(matched);
    };
  
    const handleSuggestionClick1 = (value) => {
      setInputValue1('');
      setSelectedItems1([...selectedItems1, value]);
      setMatchedSuggestions1([]);
    };
  
    const handleSuggestionClick2 = (value) => {
      setInputValue2('');
      setSelectedItems2([...selectedItems2, value]);
      setMatchedSuggestions2([]);
    };
  
    const handleRemoveItem1 = (index) => {
      const newItems = [...selectedItems1];
      newItems.splice(index, 1);
      setSelectedItems1(newItems);
    };
  
    const handleRemoveItem2 = (index) => {
      const newItems = [...selectedItems2];
      newItems.splice(index, 1);
      setSelectedItems2(newItems);
    };


    // Submit Final Info
    const handleSubmit = async () => {
        console.log("Submit clicked");
        if(selectedItems1.length > 0){
            const conditions = data.filter((item) => {
                if(selectedItems1.includes(item.medicalcondition)){
                    return item.tests;
                }
            });

            let tests = conditions.map((item) => {
                return [item.tests.split(','),item.severity];
            });

            console.log(tests);
            settestsRecommended((prev) => {

              const newObject = [...prev];
              tests.forEach((test) => {
                  newObject.push({
                    tests: test[0],
                    severity : test[1]
                  })
              });
              console.log(newObject);
              return newObject;
            });
        }
        if(selectedItems2.length > 0){
            const json = {
                symptoms:""
            };
            
            selectedItems2.forEach((item) => {
                {json.symptoms.length === 0 ? json.symptoms += item.trim() : json.symptoms = json.symptoms + ',' + item.trim()}
            });

            const response = await axios.post('http://localhost:3000/users/getPred', json);
            console.log(response.data.prediction);
            const conditions = data.filter((item) => {
                if(response.data.prediction === item.medicalcondition){
                    return item.tests;
                }
            });
            let tests = conditions.map((item) => {
                return [item.tests.split(','),item.severity];
            });
            
            settestsRecommended((prev) => {
              const newObject = [...prev,{tests : tests[0][0], severity : tests[0][1]}];
              console.log(newObject);
              return newObject;
            });
            
            console.log(response.data.prediction);
        }
    }
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="dropdown">
            <h2>Medical History</h2>
              <input 
                type="text" 
                value={inputValue1} 
                onChange={handleInputChange1} 
                placeholder="Medical History"
                className="form-control mb-2"
                onFocus={() => setMatchedSuggestions1([])}
              />
              {matchedSuggestions1.length > 0 && (
                <div className="dropdown-menu show">
                  {matchedSuggestions1.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className="dropdown-item" 
                      onClick={() => handleSuggestionClick1(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              <div>
                {selectedItems1.map((item, index) => (
                  <span style={{color:"black"}} key={index} className="badge badge-primary mr-2">
                    {item}
                    <button 
                      type="button" 
                      className="btn-close ml-2" 
                      onClick={() => handleRemoveItem1(index)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="dropdown">
                <h2>Symptoms</h2>
              <input 
                type="text" 
                value={inputValue2} 
                onChange={handleInputChange2} 
                placeholder="Symptoms"
                className="form-control mb-2"
                onFocus={() => setMatchedSuggestions2([])}
              />
              {matchedSuggestions2.length > 0 && (
                <div className="dropdown-menu show">
                  {matchedSuggestions2.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className="dropdown-item" 
                      onClick={() => handleSuggestionClick2(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              <div>
                {selectedItems2.map((item, index) => (
                  <span style={{color:"black"}} key={index} className="badge badge-primary mr-2">
                    {item}
                    <button 
                      type="button" 
                      className="btn-close ml-2" 
                      onClick={() => handleRemoveItem2(index)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
          </div>

            <div className="col-md-12">
                <button onClick={handleSubmit} style={{width:"100%"}}>Submit</button>
            </div>


            {/* Displaying data */}
            <div className="col-md-12">
            {testsRecommended.length === 0 ? null : 
                testsRecommended.map((data) => {
                  return data.tests.map((item) => {
                    return (
                      <div key={item}>
                        <div>{item}</div>
                        <div>{data.severity}</div>
                      </div>
                    );
                  })
                })
            }
            </div>
           
        </div>
      </div>
    );
}

export default Dashboard;