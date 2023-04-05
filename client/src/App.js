// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName]= useState('');
  const [age, setAge]= useState(0);
  const [country, setCountry]= useState('');
  const [position, setPosition]= useState('');
  const [wage, setWage]= useState(0);
  

  const[newwage, setNewWage]  = useState(0)

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
  
  const updateWage =(id) => {
    Axios.put("http://localhost:3001/update", {wage:newwage, id:id})
    .then ((response)=> {
      setEmployeesList(employeesList.map((employ)=> {
        return employ.id == id ? {id: employ.id, name: employ.name, age: employ.age, country: employ.country, position: employ.position, wage: newwage}: employ
      }))
      alert("updated");
    });
  };

  const deleteEmployee =(id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`)
  .then ((response) => {
    getEmployees();
  })
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
    

      <div className='employees'>
      <button onClick={getEmployees}>Show Employees</button>
      </div>

      <div className='employess'>
        {employeesList && employeesList.map((employ, key)=> {
          return(
          <div className="employee" key={key}> 
          <ul>
          <li><span>Emri: </span> {employ.name}</li>
          <li><span>Age: </span>{employ.age}</li>
          <li><span>Country: </span>{employ.country}</li>
          <li><span>Position: </span>{employ.position}</li> 
          <li><span>Wage: </span>{employ.wage}</li>
          </ul>
          <div className='update'>
          
          <input type='text' placeholder='2000..' onChange={(e) => setNewWage(e.target.value)}/>
          <button type='submit'onClick={()=>updateWage(employ.id)}>Update</button>
          <button type='submit' onClick={()=>deleteEmployee(employ.id)}>Delete</button>
          </div>
        
          </div>
          )
        })}
      </div>
  
    </>
  );
}

export default App;
