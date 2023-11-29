const AddCart = (cartList) => {
  var dataCart = JSON.parse(localStorage.getItem('cart')) || [];
  var pushdata = [];
  if (dataCart.length === 0){    
    pushdata.push(cartList);
    localStorage.setItem('cart', JSON.stringify(pushdata))
  }else if(dataCart.length === 0 || !dataCart.find((p) => p.item_name === cartList.item_name)) {
    dataCart.map((value,index) => {
      pushdata.push(value);
    })
    pushdata.push(cartList)
    localStorage.setItem('cart', JSON.stringify(pushdata))
  }else if (dataCart.find((p) => p.item_name === cartList.item_name)) {
    let name = cartList.item_name;
    dataCart.map((value,index) => {
        let newqty = ((dataCart.find((p) => value.item_name === name))) ? (value.item_qty + 1) : value.item_qty; 
        value.item_qty = newqty;
        let priceval = value.item_price;
        //console.log('QTY',newqty);
        let newprice = ((dataCart.find((p) => value.item_name === name))) ? (priceval * newqty) : (priceval*newqty); 
        //console.log('QTY',newprice);
        value.item_total = newprice;        
        pushdata.push(value);
    })
    localStorage.setItem('cart', JSON.stringify(pushdata))
  }
}

const GetCartItems = (cartList) => {
  var dataCart = JSON.parse(localStorage.getItem('cart')) || [];
  return dataCart;
}

const RemoveCart = () => {
  localStorage.removeItem("cart");
}

const CartIncrement = (name) => {
  var dataCart = JSON.parse(localStorage.getItem('cart')) || [];
  var pushdata = [];
  if (dataCart.find((p) => p.item_name === name)) {
    dataCart.map((value,index) => {
        let newqty = ((dataCart.find((p) => value.item_name === name))) ? (value.item_qty + 1) : value.item_qty; 
        value.item_qty = newqty;
        let priceval = value.item_price;
        let newprice = ((dataCart.find((p) => value.item_name === name))) ? (priceval * newqty) : (priceval*value.item_qty); 
        value.item_total = newprice;        
        pushdata.push(value);
    });
    localStorage.setItem('cart', JSON.stringify(pushdata))
  }
}

const CartDecrement = (name) => {
  var dataCart = JSON.parse(localStorage.getItem('cart')) || [];
  var pushdata = [];
  if (dataCart.find((p) => p.item_name === name)) {
    dataCart.map((value,index) => {
        let newqty = ((dataCart.find((p) => value.item_name === name))) ? (value.item_qty - 1) : value.item_qty; 
        value.item_qty = newqty;
        let priceval = value.item_price;
        let newprice = ((dataCart.find((p) => value.item_name === name))) ? (priceval * newqty) : (priceval*value.item_qty); 
        value.item_total = newprice;        
        pushdata.push(value);
    });
    localStorage.setItem('cart', JSON.stringify(pushdata))
  }
}

const RemoveCartByID = (name) => {
  var dataCart = JSON.parse(localStorage.getItem('cart')) || [];
  var pushdata = [];
  dataCart.map((value,index) => {
      if (value.item_name !== name) {
        pushdata.push(value);
      }
  })
  localStorage.setItem('cart', JSON.stringify(pushdata))
}

export { 
  AddCart,
  GetCartItems,
  RemoveCart,
  CartIncrement,
  CartDecrement,
  RemoveCartByID
};
