export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

// export const productsAPI =
  // 'https://react-shopping-cart-67954.firebaseio.com/products.json';
export const productsAPI = "http://192.168.43.129:8001/api/products";
