import React, { Component } from 'react';
import './App.css';
import { SERVER_URL } from './components/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword:'', orderId:'', obfuscatedInfo:'', clearInfo:''}
  }
  handleChange = (e) => {
    this.setState({keyword: e.target.value});
  }
  fetchData = () => {
    fetch(SERVER_URL + `${this.state.keyword}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        orderId : responseData.orderId,
      });
    })
    .catch(err => console.error(err));
  }
  searchData = () => {
    fetch(SERVER_URL + 'search/' + `${this.state.keyword}`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        obfuscatedInfo : responseData.orderIDInfo.ObfuscatedInfo,
        clearInfo: responseData.orderIDInfo.ClearInfo,
      });
      if(this.state.obfuscatedInfo === null) {
        toast.error("The ID that you entered is invalid" , {
          position: toast.POSITION.TOP_CENTER
          });
      }
    })
    .catch(err => {     
      console.error(err)
      })
  }
  
  render() {
    return(
      <div className="App">
        <h3>Min Order ID: 10248</h3>
        <h3>Max Order ID: 11077</h3>
        <input type="number" onChange={this.handleChange} placeholder="Enter Order ID" min="10248" max = "11077" style={{color:'blue', width:'150px'}} required/>
        <button onClick={this.searchData} value={this.state.keyword}>
          Get ID Information
        </button>
        <h3>Obfuscated Information: {this.state.obfuscatedInfo}</h3>
        <h3>Clear Information: {this.state.clearInfo}</h3>
        <ToastContainer autoClose={2500}/>
      </div>
    );
  }
}

export default App;
