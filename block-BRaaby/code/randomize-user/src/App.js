import logo from './logo.svg';
import './App.css';
import React from 'react'

class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      name: '',
      image: '',
      email: '',
      pass: '',
      street: '',
      phone: null,
      age: null,
      isLoading: false,
    }


  }

  fetchData = () => {
    this.setState({isLoading: true})
    fetch('https://randomuser.me/api/').then((res) => res.json()).then(data => { 
    const name = data.results[0].name.first
    this.setState({ 
    
      name: name,
      email:  data.results[0].email,
      street:  data.results[0].location.street.name,
      age:  data.results[0].dob.age,
      phone:  data.results[0].phone,
      image:  data.results[0].picture.large,
      pass:  data.results[0].login.password,
      displayText: `My name is ${name}`,
      isLoading: false,
     })})

  }
  componentDidMount(){
    
    this.fetchData()
    
  }

  handleClick = (e) => {
    let value = e.target.getAttribute('data-value')
    // Make sure this.data is defined before using it
      let displayText = `My ${value} is ${this.state[value]}`;
      this.setState({ displayText });
  }

  render(){ 
    // const displayText = `My name is ${this.state.name}`
    return (
      <div className="text-center  h-full">
          <h1 className="text-blue-800 text-5xl py-20">RANDOM USER</h1>
        <div className="flex bg-purple-200 flex-col border rounded w-2/4 m-auto">
          <img src={this.state.image} className="p-2 my-4 w-1/4 m-auto border rounded-full"></img>
          <h3 className='p-4'>{this.state.displayText}</h3>
          <h2 className="p-10"></h2>
          <div className="flex p-2 justify-center">
          <i onClick={this.handleClick} data-value="name" className="fa-solid fa-user text-3xl text-blue-600 p-8"></i>
          <i onClick={this.handleClick} data-value="email" className="fa-solid fa-envelope text-3xl text-blue-600 p-8"></i>
          <i onClick={this.handleClick} data-value="age" className="fa-solid fa-calendar text-3xl text-blue-600 p-8"></i>
          <i onClick={this.handleClick} data-value="street" className="fa-solid fa-location-crosshairs text-3xl text-blue-600 p-8"></i>
          <i onClick={this.handleClick} data-value="phone" className="fa-solid fa-phone text-3xl text-blue-600 p-8"></i>
          <i onClick={this.handleClick} data-value="pass" className="fa-solid fa-lock text-3xl text-blue-600 p-8"></i>
          </div>
          <a onClick={this.fetchData} className="bg-blue-800 rounded py-2 my-2 btn text-white w-1/4 m-auto">{ this.state.isLoading === true ? 'LOADING...' :'GENERATE RANDOM USER' }</a>
        </div>
      </div>
      );

  }
  
}

export default App;
