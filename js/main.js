/** program for shopping cart */
let carts = document.querySelectorAll('.add-cart');

let products = [{
    name: "Sennheiser Momentum True Wireless 2 - Bluetooth Earbuds",
    tag: "sennheiser",
    price: 21499,
    color: "Grey",
    category: "Electronics",
    inCart: 0
},
{
    name: 'boAt Rockerz 255 Sports in-Ear Bluetooth Neckband Earphone with Mic(Ocean Blue)',
    tag: "boatw",
    price: 1290,
    color: "Blue",
    category: "Electronics",
    inCart: 0
},
{
    name: "Drone-Tech Lab Phantom 4 Pro Plus",
    tag: "drone",
    price: 49999,
    color: "Pearl White",
    category: "Electronics",
    inCart: 0
},
{
    name: "Bluetooth Speakers, DOSS SoundBox Pro Portable Wireless Bluetooth Speaker with 20W Stereo Sound, Active Extra Bass",
    tag: "doss-speaker",
    price: 1999,
    color: "Greyish-Black",
    category: "Electronics",
    inCart: 0
},
{
    name: "Apple Airpods Pro",
    tag: "ae",
    price: 24999,
    color: "White",
    category: "Electronics",
    inCart: 0
},

{
    name: "OnePlus Bullets Wireless Z Bass Edition (Reverb Red)",
    tag: "1plusz",
    price: 1799,
    color: "Reverb Red",
    category: "Electronics",
    inCart: 0
},
{
    name: "Zebronics Sound Bomb Supporting Bluetooth 5.0 TWS Earphones",
    tag: "beatsbomb",
    price: 1299,
    color: "Black",
    category: "Electronics",
    inCart: 0
},
{
    name: "Acer Nitro 5 Intel Core i5-9th Gen 15.6 (39.62cms) Display 1920 x 1080 Thin and Light Gaming Laptop",
    tag: "AcerNitro",
    price: 54999,
    color: "Black",
    category: "Electronics",
    inCart: 0
},

    //add up remaining products here

];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
        (cartItems));
}

function totalCost(product) {
    // console.log("the product price is" , product.price);   
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let tableProduct = document.querySelector(".table-p");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && tableProduct) {

        tableProduct.innerHTML = '';
        Object.values(cartItems).map(item => {
            tableProduct.innerHTML += `
                                    <table class="table-p">
                                        <tbody>                                       
                                            <tr>
                                                <td>
                                                    <div class="table-p__box">
                                                        <div class="table-p__img-wrap">

                                                            <img class="u-img-fluid"
                                                                src="images/index page/${item.tag}.jpg" alt="">
                                                        </div>
                                                        <div class="table-p__info">

                                                            <span class="table-p__name">

                                                            <a href="#">${item.name}</a></span>

                                                            <span class="table-p__category">

                                                            <a href="#">${item.category}</a></span>
                                                            <ul class="table-p__variant-list">

                                                                <li>

                                                                <span> Color: ${item.color}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                 </td>
                                                <td>

                                                <span class="table-p__price">₹${item.price * item.inCart}</span>
                                                </td>
                                                <td>
                                                    <div class="table-p__input-counter-wrap">

                                                        <!--====== Input Counter ======-->
                                                        <div class="input-counter">

                                                            <span class="input-counter__minus fas fa-minus"></span>

                                                            <input
                                                                class="input-counter__text input-counter--text-primary-style"
                                                                type="text" value="${item.inCart}" data-min="1" data-max="1000">

                                                            <span class="input-counter__plus fas fa-plus"></span>
                                                        </div>
                                                                <!--====== End - Input Counter ======-->
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="table-p__del-wrap">

                                                        <a class="far fa-trash-alt table-p__delete-link" href="#"></a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
            `;
        });
            tableProduct.innerHTML += `
                                    <div class="container">
                                        <div class="row">
                                            <div class="tableTotal col-lg-12 col-md-12 col-sm-12">
                                                <h3 style="padding-left: 450px;">
                                                    SUBTOTAL : ₹${cartCost}.00
                                                </h3>
                                            </div>
                                        </div>
        `;
    }

}

onLoadCartNumbers();
displayCart();


/**function grandTotal() {

    let cartCost = localStorage.getItem("productsCost");
    cartCost = JSON.parse(cartCost);
    let fcart = document.querySelector(".f-cart__pad-box");
    console.log(cartCost);
    if (cartCost && fcart) {

        fcart.innerHTML = '';
        Object.values(cartCost).map(item => {

            grandTotal.innerHTML += `
                < div class="f-cart__pad-box" >
    <div class="u-s-m-b-30">
      <table class="f-cart__table">
          <tbody>
              <tr>
                  <td>SHIPPING</td>
                  <td>Free</td>
              </tr>
              <tr>
                  <td>TAX</td>
                  <td>00</td>
              </tr>
              <tr>
                  <td>SUBTOTAL</td>
                  <td>${cartCost}</td>
              </tr>
              <tr>
                  <td>GRAND TOTAL</td>
                  <td>  ${item.inCart * item.price}.00</td>
              </tr>
          </tbody>
      </table>
   </div>
   <div>

      <button class="btn btn--e-brand-b-2" type="submit"> PROCEED TO CHECKOUT</button></div>
   </div >
                `;
        });
    }

}
 grandTotal() */


