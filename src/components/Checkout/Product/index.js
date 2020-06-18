import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ value }) => {
  return (
    <div class="item">
      Title: {value.title} <br />
  Price: {value.currencyFormat} {value.price} <br />
      Type: {value.style} <br />
      Quantity: {value.quantity} 
    </div>
  )
}

Product.propTypes = {

}

export default Product
