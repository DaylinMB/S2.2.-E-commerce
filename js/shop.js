// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;


// Función para actualizar el contador del carrito
function updateCartCount() {
    const countProduct = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('count_product').innerText = countProduct;
}

// Función de compra
function buy(id) {
    console.log('ID del producto a comprar:', id);
    console.log('Productos disponibles:', products);
    console.log('Carrito antes de agregar:', cart);

    id = Number(id);  // Asegúrate de que el ID sea un número

    // Buscar el producto en la lista de productos disponibles
    let productToAdd = products.find(product => product.id === id);

    if (!productToAdd) {
        console.log('Producto no encontrado');
        return;
    }

    console.log('Producto a añadir:', productToAdd);

    // Buscar el producto en el carrito
    let productInCart = cart.find(itemCart => itemCart.id === id);

    console.log('Producto en el carrito:', productInCart);

    if (productInCart) {
        // incrementar su cantidad
        productInCart.quantity++;
        console.log('Cantidad actualizada en el carrito:', productInCart);
    } else {
        // añadirlo con cantidad 1
        let increaseQuantity = { ...productToAdd, quantity: 1 };
        cart.push(increaseQuantity);
        console.log('Producto añadido al carrito:', increaseQuantity);
    }

    console.log('Carrito después de agregar:', cart);
    applyPromotionsCart(); 
    calculateTotal(); 
    updateCartCount(); 
    printCart();
}

// Función para limpiar el carrito con confirmación
function cleanCart() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        cart = [];
        total = 0; // Reiniciar el total cuando se vacía el carrito
        console.log('Has vaciado el carrito');
        updateCartCount();
        calculateTotal(); 
        printCart();
    }
}

// Función para calcular el total
function calculateTotal() {
    total = cart.reduce((sum, item) => sum + (item.subtotalWithDiscount || (item.price * item.quantity)), 0);
    console.log('Total:', total);
    document.getElementById('total_price').innerText = total.toFixed(2);
}

// Función para aplicar promociones al carrito
function applyPromotionsCart() {
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        if (item.offer && item.quantity >= item.offer.number) {
            const discount = item.price * (item.offer.percent / 100);
            item.subtotalWithDiscount = (item.price - discount) * item.quantity;
        } else {
            delete item.subtotalWithDiscount;
        }
    }
    console.log(cart);
}

// Función para imprimir el carrito
function printCart() {
    const cartModalBody = document.getElementById('cart_list');
    cartModalBody.innerHTML = '';

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
           <td>
                <div class="btn-group" role="group" aria-label="Cantidad">
                    <button onclick="decrementQuantity(${item.id})" class="btn btn-secondary btn-sm">-</button>
                    <span class="quantity btn btn-sm">${item.quantity}</span>
                    <button onclick="incrementQuantity(${item.id})" class="btn btn-primary btn-sm">+</button>
                </div>
            </td>
            <td>$${(item.subtotalWithDiscount || (item.price * item.quantity)).toFixed(2)}</td>
        `;
        cartModalBody.appendChild(row);
    }
}

// Función para incrementar la cantidad de un producto en el carrito
function incrementQuantity(id) {
    const productInCart = cart.find(itemCart => itemCart.id === id);

    if (productInCart) {
        productInCart.quantity++;
    }

    applyPromotionsCart(); 
    calculateTotal(); 
    updateCartCount();
    printCart();
}

// Función para decrementar la cantidad de un producto en el carrito
function decrementQuantity(id) {
    const productInCart = cart.find(itemCart => itemCart.id === id);

    if (productInCart) {
        if (productInCart.quantity > 1) {
            productInCart.quantity--;
        } else {
            const index = cart.findIndex(p => p.id === id);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }
    }

    applyPromotionsCart();
    calculateTotal();
    updateCartCount(); 
    printCart();
}

// Función para abrir el modal del carrito
function open_modal() {
    calculateTotal();
    printCart();
}

// Inicialización del contador del carrito al cargar la página
updateCartCount();