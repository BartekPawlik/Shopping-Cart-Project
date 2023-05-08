let label = document.getElementById('label')
let shoppingCart = document.getElementById("shoppieng-cart")


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
     
     cartIcon.innerText = basket.map((x)=>x.item).reduce((x, y) => x + y, 0)
   }
     calculation()

     let genarateCartItems = () => {
        
        if(basket.length !== 0) {
          return (shoppingCart.innerHTML = basket.map((x)=>
          {
            
            let {id, item} = x;
            let search = shopItemData.find((y) =>y.id === id) || []
            return `
            <div class="cart-item">
            <img width="100" src=${search.img} alt="" />
            
           <div class="details">
           <div class="title-price-x">
           
           <h4 class="title-price">
           <p>${search.name}</p>
           <p class="cart-item-price">$ ${search.price}</p>
          
           </h4>
           <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
           </div>
           <div class="cart-buttons">
           <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

           
      
          
           
            <h3>$ ${item * search.price}</h3>
            </div>

            </div>`
          }).join(""))
         
        }else{
           shoppingCart.innerHTML = ``;
           label.innerHTML = `
           <h2>Cart is Empty</h2>
           <a href="index.html">
           <button class="HomeBtn">Back to home</button>
           </a>
           `;
           
        }
     }
     genarateCartItems()


     
let increment = (id) => {
  let selectItem = id;
  let search = basket.find((x) => x.id === selectItem.id);

  if(search === undefined) {
    basket.push({
      id: selectItem.id,
      item: 1,
    })
  }else{
    search.item += 1;
  }
localStorage.setItem("data", JSON.stringify(basket))
genarateCartItems();

  update(selectItem.id)
};
let decrement = (id) => {
  let selectItem = id;
  let search = basket.find((x) => x.id === selectItem.id);

  if(search.item === undefined) return
  else if (search.item === 0){
return;
  }else{
    search.item -= 1;
  }
  // console.log(basket)
  update(selectItem.id)

  basket = basket.filter((x) => x.item !== 0);
  genarateCartItems();
  localStorage.setItem("data", JSON.stringify(basket))




};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  calculation()
  totalAmount()
};

let removeItem = (id) => {
let selectedItem = id;
// console.log(selectedItem) 
basket = basket.filter((x) => x.id !== selectedItem.id)
localStorage.setItem("data", JSON.stringify(basket))
genarateCartItems();
totalAmount();
calculation()

}
let clearCart = () => {
  basket = [];
  genarateCartItems()
  localStorage.setItem("data", JSON.stringify(basket))
  calculation()

}

let totalAmount = () => {
if(basket.length !== 0){
  let amount = basket.map((x) => {
    let {item, id} = x;
    let search = shopItemData.find((y) => y.id === id) || {}
    return item * search.price
  }).reduce((x , y) => x + y , 0)
// console.log(amount)
label.innerHTML = `
<h2>
Total Bill : $ ${amount}
</h2>
<button class="checkout">Checkout</button>
<button onclick="clearCart()" class="removeAll">Clear Cart</button>`
} else
  return;

}
totalAmount()
