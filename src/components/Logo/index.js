import React from 'react'

const logo = {
  height: 90,
  position: "absolute",
  left: "5px",
  top: "5px"
}

const Logo = () => (
  <img src={require('../../assets/img/Logo.jpg')} alt="Logo" style={logo} />
)

export default Logo