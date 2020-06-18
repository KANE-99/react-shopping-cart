import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import './index.css'
import Modal from "./../Modal/AlertModal";
import { connect } from 'react-redux';
import axios from 'axios'


const Checkout = ({ products, total }) => {

  const [ FD, setFD ] = useState({
    name: '',
    email: '',
    selectedPincode: '',
    address: '',
    error: '',
    isAlert: false
  })

  const {
    name,
    email,
    selectedPincode,
    address,
    // error,
    isAlert
  } = FD;

  const onChangeHandler = (e) => {
    setFD({
      ...FD,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    
    const formData = { 
      text: "From: "+name+" ["+email+"]"+"<br />"+"PINCODE: "+selectedPincode+"<br />"+"Address: "+address+"<br /><hr>"+products.map(
        prod => "ID: "+prod._id+"<br />"+"Title: "+prod.title+"<br />"+"Quantity: "+prod.quantity+"x "+prod.currencyFormat+" "+prod.price+"<br />"+"Type: "+prod.style
      ).join("<br /><hr />")
    }

    axios.post(
      'http://192.168.43.129:8001/sendmail',
      JSON.stringify(formData),
      config
    ).then(res => {
      console.log("Successfully order placed")
      setFD({
        ...FD,
        isAlert: true
      })
    }).catch(err => {
      console.log("Error");
      alert("Problem Sending Order Detail. Please try again Later");
    })
  }

  return (<>  
  <a href="#popup1">Let me Pop up</a>
    <Modal content="Hello, man how are you" />
    <div class="cart-summary">
    <span style={{ fontWeight: 700, fontSize: '20px' }}>Order Summary</span> 
      {products.map(
        prod => (
          <Product key={prod._id} value={prod} />
        )
      )}
    <span class="total">Total: <span className="total-align-right">{ total.currencyFormat } { total.totalPrice }</span></span>
    </div>
    <div class="form-style-5" style={{ marginTop: '6%' }}>
      <form onSubmit={e => onSubmitHandler(e)}>
        <fieldset>
          <legend><span class="number">1</span> Personal Detail</legend>
          <label for="name">Full Name</label>
          <input onChange={e => onChangeHandler(e)} type="text" name="name" value={name} placeholder="Enter Full Name" />
          <label for="email">Email Address</label>
          <input onChange={e => onChangeHandler(e)} type="email" name="email" value={email} placeholder="Enter Email Address" />
          <legend><span class="number">2</span> Address</legend>
          <label for="selectedPincode">Area Pincode</label>
          <select onChange={e => onChangeHandler(e)} name="selectedPincode" id="" value={selectedPincode}>
            <option value="">Select PINCODE</option>
            <option value="401105">401105</option>
            <option value="401102">401102</option>
          </select>
          <label for="address">Full Address</label>
          <textarea onChange={e => onChangeHandler(e)} name="address" id="" cols="30" rows="7" value={address}></textarea>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </div>
    </>
  )
}

Checkout.propTypes = {

}

const mapStateToProps = state => ({
  products: state.cart.products,
  total: state.total.data
})

export default connect(
    mapStateToProps,
    null
  )(Checkout)