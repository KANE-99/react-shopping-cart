import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { fetchProducts } from '../../../services/shelf/actions';
import { connect } from 'react-redux';
import { updateSearch } from '../../../services/searchBy/actions';

const SearchBar = ({ filters, sort, updateSearch, fetchProducts }) => {
    
    let [ val, handleVal ] = useState("")


    const onChangeHandler = (e) => {
        handleVal(e.target.value)
        updateSearch(e.target.value)        
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        fetchProducts(filters,sort,() => {},val)
    }

    return (
        <div style={{ marginLeft: 100, marginTop: 100 }}>
            <form onSubmit={ e => onSubmitHandler(e) }>
            <input value={val} name="search" placeholder="Search Product by name" onChange={e => onChangeHandler(e)} />
            <input type="submit" value="Search" style={{ marginLeft: 20 }} />
            </form>            
        </div>
    )
}

SearchBar.propTypes = {

}

const mapStateToProps = state => ({
    products: state.shelf.products,
    filters: state.filters.items,
    sort: state.sort.type
  });
  

export default connect(
    mapStateToProps,
    // { fetchProducts }
    { updateSearch, fetchProducts }
  )(SearchBar)
