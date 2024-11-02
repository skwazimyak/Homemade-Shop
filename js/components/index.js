import data from "../../data/products.js"
import { createProducts } from "../app.js"

window.addEventListener("DOMContentLoaded", () => {
    getCategories()
    getRecommendedProducts()
    getReviews()
})

function getCategories() {
    const categoryGrid = document.querySelector(".category-grid")
    const categoryList = []
    data.products.forEach(e => {
        if(!categoryList.includes(e.category)){
            categoryList.push(e.category)
        }
    })
    categoryList.forEach((e, index) => {
        categoryList[index] = data.products.find(el => el.category === e)
    })
    
    categoryList.forEach(e => {
        const categoryDiv = `
        <div class="category">
            <div class="category-image">
              <img src="${e.images[0]}" alt="Категорія">
            </div>
            <div class="category-info" id="${e.category}">
              <h3>${e.category}</h3>
              
            </div>
        </div>
        `
        categoryGrid.insertAdjacentHTML("beforeend", categoryDiv)
        const category = document.getElementById(e.category)
        const button = document.createElement("button")
        button.innerText = "Переглянути"
        button.classList.add("btn")
        button.addEventListener("click", () => {
            localStorage.setItem("category", e.category)
            window.location.href = "../Homemade-Shop/category.html"
        })
        category.append(button)
    })
    
}

function getRecommendedProducts() {
    const productsList = []
    while (productsList.length < 4) {
        const number = Math.floor(Math.random() * (data.products.length - 1))
        const randomProduct = data.products[number]


        if (productsList.length == 0) {
            productsList.push(randomProduct)
        }
        const checkName = productsList.map(e => {
            return e.title
        })

        if (!checkName.includes(randomProduct.title)) {
            productsList.push(randomProduct)

        }

    }
    createProducts(productsList,".product-grid")
}

function getReviews(){
    const productsList = []
    while (productsList.length < 4) {
        const number = Math.floor(Math.random() * (data.products.length - 1))
        const randomProduct = data.products[number]


        if (productsList.length == 0) {
            productsList.push(randomProduct)
        }
        const checkName = productsList.map(e => {
            return e.title
        })

        if (!checkName.includes(randomProduct.title)) {
            productsList.push(randomProduct)

        }

    } 
    const reviewGrid = document.querySelector(".review-grid")
    productsList.forEach((e,index) => {
        const review = document.createElement("div")
        review.classList.add("review")
        review.id = `${e.id}`
        review.addEventListener("click", () => {
            localStorage.setItem("showProduct", JSON.stringify(e))
            window.location.href = "../Homemade-Shop/product.html"
        })
        const reviewInfo = `
            <div class="date-rate">
              <div class="rate" id="rate${index}">
                
              </div>
            </div>
            <h3>${e.title}</h3>
            <p>"${e.reviews[0].comment}"</p>
            <p>- ${e.reviews[0].reviewerName}</p>
            <span>${e.reviews[0].reviewerEmail}</span>
            <img class="review-img" src="${e.images[0]}">
        `
        reviewGrid.append(review)
        document.getElementById(`${e.id}`).insertAdjacentHTML("beforeend",reviewInfo)
    })
    

    productsList.forEach((e, index) =>{
        const rate = document.getElementById(`rate${index}`)
        
        for(let i = 1; i <= 5; i++){
            if(i <= e.reviews[0].rating){
                rate.insertAdjacentHTML("beforeend",'<img src="./assets/images/star.svg" alt="star">')
            }
            else if(i > e.reviews[0].rating){
                rate.insertAdjacentHTML("beforeend",'<img src="./assets/images/whitestar.svg" alt="star">')
            }
        }
    })
}