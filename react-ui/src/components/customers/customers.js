import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
    constructor() {
        super();
        this.state = {
            customers: [],
            db_data: [],
            message: "",
        };
    }

    componentDidMount() {
        fetch('/api/customers')
            .then(res => res.json())
            .then(customers => this.setState({customers}, () => console.log('Customers fetched..',
            customers)));
        
        fetch('/api')
            .then(res => res.json()) 
            .then((res) => {
                this.setState({
                    message: res.message
                });    
            });

        fetch('/api/getcustomers')
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    db_data: res
                })
            }).then(() => {
                console.log("Updated state value. this.state.db_data: " + JSON.stringify(this.state.db_data));
            });

    }

  render() {
      return(
        <div>
            <h2>Customers (Hard coded in server)</h2>
            <ul>
                {this.state.customers.map(customer => 
                    <li key={customer.id}>{customer.firstName} {customer.lastName}</li>  
                )}
            </ul>
            <p>{this.state.message}</p>

            <h2>Data retrieved from DB via the Server</h2>
            <ul>
                {this.state.db_data.map(data =>
                    <li key={data.user_id}>{data.firstname} {data.lastname} -- {data.email}</li>    
                )}
            </ul>
        </div>
      )
  };
}

export default Customers;