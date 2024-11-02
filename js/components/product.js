import data from "../../data/products.js"
import { fillListWithLocalStorage } from "../app.js"
const currentProduct = JSON.parse(localStorage.getItem("showProduct"))
const productImages = document.querySelector(".product-images")
window.addEventListener("DOMContentLoaded", () => {
    getReviews()
    getInfo()
    changeImage()
    getRecommendedProducts()

})

function getInfo() {
    const productPage = document.querySelector(".product-page")
    if (currentProduct.brand === undefined) {
        currentProduct.brand = "невідомо"
    }
    const productInfo = `
    <div class="product-details">
        <h1 class="product-title">${currentProduct.title}</h1>
        <p>Ціна: <span>${currentProduct.price}$</span></p>
        <p>Рейтинг: <span>${currentProduct.rating}</span></p>

        <p>
            Опис: <br>
            <span>${currentProduct.description}</span>
        </p>

        <ul class="product-specifications">
            <li>Гарантія: <span>${currentProduct.warrantyInformation}</span></li>
            <li>Доставка: <span>${currentProduct.shippingInformation}</span></li>
            <li>Бренд: <span>${currentProduct.brand}</span></li>
            <li>Політика повернення: <span>${currentProduct.returnPolicy}</span></li>
        </ul>
        <div class="addToCartBtn">
            
        </div>
    </div>
    `
    productPage.insertAdjacentHTML("beforeend", productInfo)

    const cartButton = document.querySelector(".addToCartBtn")
    const button = document.createElement("button")
    button.classList.add("buy-btn")
    button.innerText = "Додати в кошик"
    button.addEventListener("click", () => {
        const cartNumber = document.querySelector(".cart-number")
        cartNumber.innerText++
        cartNumber.classList.add("show-cart-number")
        const product = data.products.find(el => el.title === currentProduct.title)
        const sortedProduct = { title: product.title, price: product.price, amount: 1, images: product.images }
        if (localStorage.length !== 1) {
            var storagedProduct =  productToStorage(sortedProduct)
        }
        if(storagedProduct !== undefined){
            const storageList = []
            fillListWithLocalStorage(storageList)
            localStorage.setItem(`cartItem${storageList.length}`, JSON.stringify(storagedProduct))
        }
        else if(localStorage.length === 1){
            localStorage.setItem(`cartItem${localStorage.length - 1}`, JSON.stringify(sortedProduct))
        }
        
    })
    cartButton.append(button)

    currentProduct.images.forEach((e, index) => {
        const image = document.createElement("img")
        image.src = e
        image.alt = `Зображення товару ${index}`
        if (index == 0) {
            image.classList.add("show-img")
        }
        productImages.append(image)
    })
}

function productToStorage(product) {
    const list = []
    let contains = false
    fillListWithLocalStorage(list)
    list.forEach((e, index) => {
        if(e.title === product.title){
            contains = true
            e.amount ++
            localStorage[`cartItem${index}`] = JSON.stringify(e)
        }
    })
    
    if (!contains) {
        return product
    }
}

function changeImage() {
    if (currentProduct.images.length !== 1) {
        productImages.insertAdjacentHTML("afterbegin", '<button class="left-arrow">&#60;</button>')
        productImages.insertAdjacentHTML("afterbegin", '<button class="right-arrow">&#62;</button>')
        const leftArrow = document.querySelector(".left-arrow")
        const rightArrow = document.querySelector(".right-arrow")
        let currentImage = 0
        leftArrow.addEventListener("click", () => {
            const [...images] = productImages.children
            images.splice(0, 2)
            images[currentImage].classList.remove("show-img")
            currentImage--
            if (currentImage < 0) {
                currentImage = currentProduct.images.length - 1
            }
            images[currentImage].classList.add("show-img")
        })
        rightArrow.addEventListener("click", () => {
            const [...images] = productImages.children
            images.splice(0, 2)
            images[currentImage].classList.remove("show-img")
            currentImage++
            if (currentImage > currentProduct.images.length - 1) {
                currentImage = 0
            }
            images[currentImage].classList.add("show-img")
        })
    }
}

function getReviews() {
    const reviewGrid = document.querySelector(".review-grid")
    const reviews = currentProduct.reviews.map((e, index) => {
        return `
        <div class="review">
            <div class="date-rate">
              <div class="rate" id="rate${index}">
                
              </div>
            </div>
            <p>"${e.comment}"</p>
            <p>- ${e.reviewerName}</p>
            <span>${e.reviewerEmail}</span>
        </div>
        `
    })
    reviewGrid.insertAdjacentHTML("beforeend", reviews.join(""))
    currentProduct.reviews.forEach((e, index) => {
        const rate = document.getElementById(`rate${index}`)
        for (let i = 1; i <= 5; i++) {
            if (i <= e.rating) {
                rate.insertAdjacentHTML("beforeend", '<img src="../assets/images/star.svg" alt="star">')
            }
            else if (i > e.rating) {
                rate.insertAdjacentHTML("beforeend", '<img src="../assets/images/whitestar.svg" alt="star">')
            }
        }
    })
}

function getRecommendedProducts() {
    const productGrid = document.querySelector(".product-grid")
    const productsList = []
    data.products.forEach(e => {
        if (e.category === currentProduct.category) {
            if (e.title !== currentProduct.title) {
                productsList.push(e)
            }
        }
    })
    productsList.forEach((e, index) => {
        const recommendedProducts = `
        <div class="product">
            <div class="product-image">
                <img src="${e.images[0]}" alt="Товар">
            </div>
            <div class="product-info" id="product${index}">
                <h3>${e.title}</h3>
                <p>${e.price}$</p>
            </div>
        </div>
        `
        productGrid.insertAdjacentHTML("beforeend", recommendedProducts)
        const productInfo = document.getElementById(`product${index}`)
        const button = document.createElement("button")
        button.className = "btn"
        button.innerText = "Переглянути"
        button.id = e.title
        button.addEventListener("click", (e) => {
            const product = data.products.find(el => el.title === e.target.id)
            localStorage.setItem("showProduct", JSON.stringify(product))
            window.location.href = "../../Homemade-Shop/product.html"
        })
        productInfo.append(button)
    })
}
