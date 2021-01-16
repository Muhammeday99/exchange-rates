import React,{Component, useState} from 'react';
import './css/main.css'

class Rates extends Component{
  constructor(props){
    super(props);
    this.state = {rates:null,base:"USD"};
    
  }

  render(){
    return(
      <div className="limiter">
		    <div className="container-table100">
			    <div className="wrap-table100">
            <select id="CurrencySelect" onChange={this.handleSelectChange.bind(this)}>
              <option value="" defaultValue="">select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="TRY">TRY</option>
              <option value="JPY">JPY</option>  
            </select>
            <button className="btn">convert currency</button>
            <div className="table100">
              <table id="CurrencyTable">
                <thead>
                  <tr className="table100-head">
                    <td colSpan="2">{this.state.base} Rates</td>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSelectChange(e){
    //const list = document.getElementById("CurrencySelect");  
    this.setState((prevState)=>{return {...prevState,base:e.target.value};},()=>{this.desplayRates();});
    
    
}

  async desplayRates(){
    const t = await (await fetch("https://api.exchangeratesapi.io/latest?base="+this.state.base,{method:'GET'})).json();
    this.setState({rates:t.rates});
    console.log(this.state.base);
    console.log(this.state.rates);
    
    const tbody = document.getElementById("CurrencyTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for(let e in this.state.rates){
      const row = tbody.insertRow();
      let cell = row.insertCell();
      let data = document.createTextNode(e);
      cell.appendChild(data);
      cell = row.insertCell();
      data = document.createTextNode(this.state.rates[e]);
      cell.appendChild(data);
    }

  }

  componentDidMount() {
    this.desplayRates();
  }
}

export default Rates;
