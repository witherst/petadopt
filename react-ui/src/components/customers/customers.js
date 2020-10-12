import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
    constructor() {
        super();
        this.state = {
            customers: [],
            message: "",
        };
    }

    componentDidMount() {
        fetch('/api/customers/')
            .then(res => res.json())
            .then(customers => this.setState({customers}, () => console.log('Customers fetched..',
            customers)));
        
        fetch('/api/')
            .then((data) => data.text())
            .then((res) => {
                this.setState({
                    message: res 
                });    
                console.log(res); 
            })
    }

  render() {
      return(
        <div>
            <h2>Customers</h2>
            <ul>
                {this.state.customers.map(customer => 
                    <li key={customer.id}>{customer.firstName} {customer.lastName}</li>  
                )}
            </ul>
            <p>{this.state.message}</p>
        </div>
      )
  };
}

export default Customers;