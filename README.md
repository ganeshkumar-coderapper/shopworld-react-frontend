# shopworld react frontend

react frontend to list products on carousel with cart create, update and checkout redirect 
for shopworld onlinestore on shopify


## ProductList - component
- to get products filtered with tag 'featured' and to them dispay on carousel layout


## MediaCard - component
- to display product's featured image, title, price with add to cart and go to checkout action buttons


### functional flow
on click of add to cart
- script will check for presence of cartId
- if not found, then new cart will be created with unique cartId
- successive add to card for other products will proceed to update the same cart with new cart items using same cartId
- after cart create/update, the corresponding media card will replace add to cart button with go to checkout button
on click of go to checkout
- checkout url will be retrieved from shopify and page will be redirected to the checkout url


## files
```
└── src
    ├── ProductList.jsx
    └── MediaCard.jsx
```
