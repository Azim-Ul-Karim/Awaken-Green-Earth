const showSpinner = () => {
    document.getElementById("spinner").classList.remove("hidden");
};
const hideSpinner = () => {
    document.getElementById("spinner").classList.add("hidden");
};

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => {
        displayCategory(json.categories);
        displayAllTrees();
    });
};

const displayAllTrees = () => {
    showSpinner();

    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
        removeActive();

        const allBtn = document.getElementById("category-btn-all");
        if (allBtn) {
            allBtn.classList.add("active");
        }
        displayCategoryTree(data.plants);
        hideSpinner();
    });
};

const removeActive = () => {
    const categoryButton = document.querySelectorAll(".categories-btn");
    categoryButton.forEach(btn => btn.classList.remove("active"));
};

const loadPlantDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;

    const res = await fetch(url);
    const details = await res.json();

    displayPlantDetail(details.plants);
};

const displayPlantDetail = (tree) => {

    const detailsBox = document.getElementById("details-container");

    detailsBox.innerHTML = `

    <div class="space-y-3.5">
        <h2 class="text-xl font-bold">${tree.name}</h2>

        <div>
            <img src="${tree.image}" class="h-72 w-full rounded-xl">
        </div>

        <p>
            <span class="font-semibold">Category: </span>${tree.category}
        </p>

        <p>
            <span class="font-semibold">Price: </span><span class="text-sm">৳</span>${tree.price}
        </p>

        <p>
            <span class="font-semibold">Description: </span>${tree.description}
        </p>
    </div>
    `;

    document.getElementById("card_modal").showModal();
};

const loadCategoryTrees = (id) => {
    showSpinner();

    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();

        const clickBtn = document.getElementById(`category-btn-${id}`);
        clickBtn.classList.add("active");
        
        displayCategoryTree(data.plants);
        hideSpinner();
    });
};

const displayCategoryTree = (plants) => {

    const cardsContainer = document.getElementById("cards-container");

    cardsContainer.innerHTML = "";

    plants.forEach(plant => {

        const card = document.createElement("div");

        card.innerHTML = `

        <div class="bg-white rounded-lg flex flex-col">

            <div>
                <img src="${plant.image}" class="rounded-t-xl h-50 w-full">
            </div>

            <div class="p-4">
                <div  onclick = "loadPlantDetail(${plant.id})">
                    <h4 class="font-semibold text-sm">${plant.name}</h4>

                    <p class="text-xs py-3 h-14 md:h-25 flex items-center">
                        ${plant.description}
                    </p>
                </div>

                <div class="flex items-center justify-between mt-auto">

                    <button class="bg-green-100 text-[#15803D] text-sm font-medium px-3 py-1 rounded-full hover:bg-green-300 hover:text-black transition">
                        ${plant.category}
                    </button>

                    <p class="text-xs">৳<span class="text-sm font-semibold">${plant.price}</span></p>
                </div>

                <button onclick="addToCart(${plant.id}, '${plant.name}', ${plant.price})" class="bg-[#15803D] w-full text-white font-medium px-4 py-2 rounded-full mt-4 hover:cursor-pointer hover:bg-green-500 transition">
                    Add to Cart
                </button>
            </div>
        </div>
        `;

        cardsContainer.append(card);
    });
};

const displayCategory = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    const allBtn = document.createElement("div");
    allBtn.innerHTML = `
    <button id="category-btn-all" onclick="displayAllTrees()" class="w-full text-left px-3 py-2 rounded-md categories-btn hover:bg-[#15803D] hover:text-white active">All Trees</button>
    `;
    categoriesContainer.append(allBtn);

    for(const category of categories) {

        const btnDiv = document.createElement("div");

        btnDiv.innerHTML = `
        <button id="category-btn-${category.id}" onclick="loadCategoryTrees(${category.id})" class="w-full text-left px-3 py-2 rounded-md categories-btn hover:bg-[#15803D] hover:text-white">${category.category_name}</button>
        `

        categoriesContainer.append(btnDiv);
    }
}

let cart = [];
let totalPrice = 0;

const addToCart = (id, name, price) => {
    let itemExists = false;
    
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += 1;
            itemExists = true;
            break;
        }
    }
    
    if (!itemExists) {
        cart.push({ 
            id: id, 
            name: name, 
            price: price, 
            quantity: 1 
        });
    }
    
    totalPrice += price;
    updateCartDisplay();
};

const removeFromCart = (id) => {
    let newCart = [];
    let removedItemPrice = 0;
    
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            removedItemPrice = cart[i].price * cart[i].quantity;
        } else {
            newCart.push(cart[i]);
        }
    }
    
    cart = newCart;
    totalPrice -= removedItemPrice;
    updateCartDisplay();
};

const updateCartDisplay = () => {
    const cartList = document.querySelector(".cart-list");
    
    if (cart.length === 0) {
        cartList.innerHTML = "";
        return;
    }
    
    let cartDis = "";
    
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        cartDis += `
            <li class="flex justify-between items-center p-2 bg-[#f0fdf4] rounded-lg">
                <div>
                    <span class="font-semibold">${item.name}</span>
                    <p class="pt-1.5 text-xs text-gray-600">৳${item.price} × ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:cursor-pointer">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </li>
        `;
    }
    
    cartDis += `
        <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center font-medium">
            <p>Total:</p>
            <p><span class="text-xs">৳</span>${totalPrice}</p>
        </div>
    `;
    
    cartList.innerHTML = cartDis;
};

loadCategories();