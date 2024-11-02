import data from "../../data/products.js";
window.addEventListener("DOMContentLoaded", () => {
    showProducts()
})

function showProducts() {
    const container = document.querySelector(".container-div")
    const categoryList = []
    data.products.forEach(e => {
        if (!categoryList.includes(e.category)) {
            categoryList.push(e.category)
        }
    })
    categoryList.forEach(e => {
        const section = `
        <section class="category">
            <h1>${e}</h1>
            <div class="product-grid" id="${e}">

            </div>
        </section>
        `
        container.insertAdjacentHTML("beforeend",section)
        const category = document.getElementById(e)
        const categoryProducts = []
        data.products.forEach(el => {
            if (el.category === e) {
                categoryProducts.push(el)
            }
        })
        
        categoryProducts.forEach(e => {
            const product = `
            <div class="product">
                <div class="product-image">
                    <img src="${e.images[0]}" alt="Товар">
                </div>
                <div class="product-info" id="product${e.id}">
                    <h3>${e.title}</h3>
                    <p>${e.price}$</p>
                </div>
            </div>
            `
            category.insertAdjacentHTML("beforeend", product)
            const productInfo = document.getElementById(`product${e.id}`)
            const button = document.createElement("button")
            button.className = "btn"
            button.innerText = "Переглянути"
            button.id = e.title 
            button.addEventListener("click",(e) => {
                const productToStorage = data.products.find(el => el.title === e.target.id)
                localStorage.setItem("showProduct", JSON.stringify(productToStorage))
                window.location.href = "../Homemade-Shop/product.html"
            })
            productInfo.append(button)
        })

        

    })
}