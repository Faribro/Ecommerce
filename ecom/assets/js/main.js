let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price} </h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
  </div>
    `;

    
//      <div class="showcase">

//     <div class="showcase-banner">

//       <img src="./assets/images/products/jacket-3.jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img default">
//       <img src="./assets/images/products/jacket-4.jpg" alt="Mens Winter Leathers Jackets" width="300" class="product-img hover">

//       <p class="showcase-badge">15%</p>

//       <div class="showcase-actions">

//         <button class="btn-action">
//           <ion-icon name="heart-outline"></ion-icon>
//         </button>

//         <button class="btn-action">
//           <ion-icon name="eye-outline"></ion-icon>
//         </button>

//         <button class="btn-action">
//           <ion-icon name="repeat-outline"></ion-icon>
//         </button>

//         <button class="btn-action">
//           <ion-icon name="bag-add-outline"></ion-icon>
//         </button>

//       </div>

//     </div>

//     <div class="showcase-content">

//       <a href="#" class="showcase-category">jacket</a>

//       <a href="#">
//         <h3 class="showcase-title">Mens Winter Leathers Jackets</h3>
//       </a>

//       <div class="showcase-rating">
//         <ion-icon name="star"></ion-icon>
//         <ion-icon name="star"></ion-icon>
//         <ion-icon name="star"></ion-icon>
//         <ion-icon name="star-outline"></ion-icon>
//         <ion-icon name="star-outline"></ion-icon>
//       </div>

//       <div class="price-box">
//         <p class="price">$48.00</p>
//         <del>$75.00</del>
//       </div>

//     </div>

//   </div>




    })
    .join(""));
};

generateShop();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
