import React, { useState, useEffect } from 'react'
import axios from 'axios';

import './style.css'

const baseURL = "http://192.168.43.129:8001/api/"


const Admin = () => {

  const [FD, setFD] = useState({
    brand: '',
    model: '',
    title: '',
    brands: ['hp','dell'],
    models: [],
    selectedBrand: '',
    selectedModel: '',
    selectedFile: null,
    description: '',
    style: '',
    price: ''
  })

  const {
    brand,
    model,
    title,
    brands,
    models,
    selectedBrand,
    selectedModel,
    selectedFile,
    description,
    style,
    price
  } = FD

  useEffect(() => {
      axios
        .get(`${baseURL}devices/brands`)
        .then(res => {
          setFD({ ...FD, brands: res.data})          
        }).catch(error => {
          console.log(error);
        });  
  }, {})

  const onChangeHandler = e => {
    setFD({ ...FD, [e.target.name]: e.target.value})
  }

  const onSubmitDeviceHandler = async e => {
    e.preventDefault()
    
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const newFD = {
      brand,
      model
    }

    axios
    .post(`${baseURL}devices`, JSON.stringify(newFD), config)
    .then( res => {
      setFD({
        ...FD,
        brand: "",
        model: ""
      })
    })
    .catch(err => console.log(err))
  }

  const onSubmitProductHandler = async e => {
    e.preventDefault()
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const bodyFormData = new FormData();
    bodyFormData.append('brand', selectedBrand)
    bodyFormData.append('model', selectedModel)
    bodyFormData.append('title', title)
    bodyFormData.append('description', description)
    bodyFormData.append('style', style)
    bodyFormData.append('price', price)
    bodyFormData.append('product', selectedFile)


    for (var pair of bodyFormData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    
    axios
      .post(`${baseURL}products`, bodyFormData, config)
      .then( res => {
        setFD({
          ...FD,
          selectedBrand: "",
          selectedModel: "",
          models: [],
          brands: [],
          title: "",
          description: "",
          style: "",
          price: "",
          selectedFile: null
        })
      })
      .catch(err => console.log(err))
  }

  const onBrandSelection = e => {
    const selBrd = e.target.value;
    axios
      .get(`${baseURL}devices/models/${e.target.value}`)
      .then(res => {
        
        setFD({ ...FD, models: res.data, selectedBrand: selBrd })
        document.getElementById('models').disabled=false
      }).catch(error => {
        console.log(error);
      });   
  }

  const onModelSelection = e => {
    setFD({ ...FD, selectedModel: e.target.value })  
  }

  const onFileSelection = e => {
    setFD({ ...FD, selectedFile: e.target.files[0] })
  }

  return (
    <div class="form-style-5" style={{ marginTop: '6%' }}>
      <form onSubmit={e => onSubmitDeviceHandler(e)} >
        <fieldset>
          <legend><span class="number">1</span> Add Device</legend>
          <input onChange={e => onChangeHandler(e)} value={brand} type="text" name="brand" placeholder="Enter Brand Name" />
          <input onChange={e => onChangeHandler(e)} value={model} type="text" name="model" placeholder="Enter Model Name" />
          
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
      <form onSubmit={e => onSubmitProductHandler(e)}>
      <fieldset>
          <legend><span class="number">2</span> Add Product</legend>
          <input onChange={e => onChangeHandler(e)} value={title} type="text" name="title" placeholder="Enter title" />
          <select onChange={e => onBrandSelection(e)} value={selectedBrand} type="text" placeholder="Select Brand" >
            <option value="">Please select a brand</option>
            {brands.map((brd,index) => <option key={index} value={brd}>{brd}</option>)}  
          </select>
          <select disabled onChange={e => onModelSelection(e)} value={selectedModel} type="text" id="models" placeholder="Select Model">
            <option value="">Please select a model first</option>
            {models.map((mdl,index) => <option key={index} value={mdl}>{mdl}</option>)}  
          </select>
          
          <input onChange={e => onChangeHandler(e)} value={description} type="text" name="description" placeholder="Enter Description" />
          <input onChange={e => onChangeHandler(e)} value={style} type="text" name="style" placeholder="Enter Style/Type" />
          <input onChange={e => onChangeHandler(e)} value={price} type="text" name="price" placeholder="Enter Price" />
          <input onChange={e => onFileSelection(e)} type="file" name="product" placeholder="Upload Cover Image" />
        </fieldset>
        <input type="submit" onClick={e => onSubmitProductHandler(e) } value="Submit" />
      </form>
    </div>
  )
}

export default Admin