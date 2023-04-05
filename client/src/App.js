// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName]= useState('');
  const [age, setAge]= useState('');
  const [country, setCountry]= useState('');
  const [position, setPosition]= useState('');
  const [wage, setWage]= useState('');

  const [employeesList, setEmployeesList] = useState([]);


  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age, 
      country: country, 
      position:position, 
      wage: wage,
    }).then(()=> {
      console.log("success");
      setName('');
      setAge('');
      setCountry('');
      setPosition('');
      setWage('');
      
      setEmployeesList([
        ...employeesList, {
        name: name,
        age: age, 
        country: country, 
        position:position, 
        wage: wage,
          },
        ]);
    });

  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response)=>{
      console.log(response.data);
      setEmployeesList(response.data);
    });
  };
  

  return (
    <>
    <div className="information">

      <label>Name: </label>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)}  />
      <label>Age: </label>
      <input type='number' value={age} onChange={(e) => setAge(e.target.value)} />
      <label>Country: </label>
      <input type='text' value={country} onChange={(e) => setCountry(e.target.value)}/>
      <label>Position: </label>
      <input type='text' value={position} onChange={(e) => setPosition(e.target.value)}/>
      <label>Wage: </label>
      <input type='number' value={wage} onChange={(e) => setWage(e.target.value)}/>
      <button type='submit' onClick={addEmployee}>Add Employee </button>
    
    </div>
    <hr/>

      <div className='employees'>
      <button onClick={getEmployees}>Show Employees</button>
      </div>

      <div>
        {employeesList && employeesList.map((employ, key)=> {
          return          (
          <div key={key}> {employ.name} </div>
          )
        })}
      </div>
  
    </>
  );
}

export default App;
