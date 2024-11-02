import data from "../data/products.js"

window.addEventListener("DOMContentLoaded", () => {
    showMenu()
    showCart()
    searchProducts()
    getCartNumber()
})
const header = `
<header>
    <div class="header">
      <div class="menu">
        <img src="./assets/images/menu.png" alt="menu" id="menu">
      </div>
      <a href="/" class="icon">
        <div class="logo">
          <img src="./assets/images/киська.jpg" alt="Логотип магазину">
        </div>
        <h1>Homemade Shop</h1>
      </a>
      <div class="search-bar">
        <input type="text" placeholder="Пошук товарів...">
        <button id="search"><img src="./assets/images/search.svg" alt="search"></button>
      </div>
      <div class="cart">
        <img id="cart" src="../assets/images/cart.png" alt="cart">
        <span class="cart-number">0</span>
      </div>
    </div>
</header>
`
const footer = `
<footer>
    <p>&copy; 2024 Homemade Shop. Усі права захищені.</p>
    <div class="social-links">
      <a href="https://uk-ua.facebook.com/">Facebook</a> |
      <a href="https://www.instagram.com/">Instagram</a> |
      <a href="https://www.youtube.com/">YouTube</a>
    </div>
</footer>
`
document.body.insertAdjacentHTML('afterbegin', header)
document.body.insertAdjacentHTML('beforeend', footer)

const menu = document.getElementById("menu")
const cart = document.getElementById("cart")
const search = document.getElementById("search")
const cartNumber = document.querySelector(".cart-number")


function showMenu() {
    menu.addEventListener("click", () => {
        const menuDiv = `
        <div class="modal">
        <div class="modal-body">
          <img id="closeBtn" src="./assets/images/close.svg" alt="close" class="menu-close close-image">
          <ul>
            <li><a href="./catalog.html">Каталог</a></li>
            <li><a id="categories">Категорії</a></li>
            <hr>
            <li><a href="./about.html">Про нас</a></li>
          </ul>
        </div>
        </div>
        `
        document.body.insertAdjacentHTML("beforeend", menuDiv)
        const modal = document.querySelector(".modal")
        const closeBtn = document.getElementById("closeBtn")
        closeBtn.addEventListener("click", () => {
            modal.remove()
            document.body.classList.toggle("disable-scroll")
        })
        document.body.classList.toggle("disable-scroll")
        const categories = document.getElementById("categories")
        categories.addEventListener("click", () => {
            document.querySelector(".modal-body").remove()
            const categoryModal = `
            <div class="modal-body">
              <img id="closeBtn" src="./assets/images/close.svg" alt="close" class="menu-close close-image">
              <ul id="categoryUl">
                
             </ul>
            </div>
            `
            modal.insertAdjacentHTML("beforeend", categoryModal)
            const closeBtn = document.getElementById("closeBtn")
            closeBtn.addEventListener("click", () => {
                modal.remove()
                document.body.classList.toggle("disable-scroll")
            })
            const categoryList = []
            data.products.forEach(e => {
                if (!categoryList.includes(e.category)) {
                    categoryList.push(e.category)
                }
            })
            categoryList.forEach(e => {
                const categoryUl = document.getElementById("categoryUl")
                const li = document.createElement("li")
                const a = document.createElement("a")
                a.innerText = e
                a.addEventListener("click", () => {
                    localStorage.setItem("category", e)
                    window.location.href = "../category.html"
                })
                li.append(a)
                categoryUl.append(li)
            })
        })
    })
}

function showCart() {
    cart.addEventListener("click", () => {
        const cartDiv = `
        <div class="modal">
            <div class="modal-body">
                <div class="cart-close">
                    <span class="cart-name">Кошик</span>
                    <img id="closeBtn" src="./assets/images/close.svg" alt="close" class="close-image">
                </div>
                <div class="cart-items">
                </div>
                <div class="cart-buy-products">
                    <div class="total-price">
                      <span>Разом</span>
                      <span id="total">29000$</span>
                    </div>
                    <div class="to-register-button">
                      <button id="registerBtn" class="btn">Оформити замовлення</button>
                    </div>
                </div>
            </div>
        </div>
        `
        document.body.insertAdjacentHTML("beforeend", cartDiv)
        const registerBtn = document.getElementById("registerBtn")
        registerBtn.addEventListener("click", () => {
            window.location = "../html/register.html"
        })
        const total = document.getElementById("total")
        const closeBtn = document.getElementById("closeBtn")
        closeBtn.addEventListener("click", () => {
            document.querySelector(".modal").remove()
            document.body.classList.toggle("disable-scroll")
        })
        document.body.classList.toggle("disable-scroll")

        const cartItems = document.querySelector(".cart-items")
        const cartList = []
        fillListWithLocalStorage(cartList)
        total.innerText = `${roundUp(findSum(cartList))}$`
        if (cartList.length === 0) {
            const cartBuyProducts = document.querySelector(".cart-buy-products")
            const emptyCart = `
            <div class="empty-cart-container">
                <img src="./assets/images/empty_cart.png" class="empty-cart-image" alt="Порожня корзина">
                <span>Ваш кошик порожній :(</span>
            </div>
            `
            cartItems.insertAdjacentHTML('afterbegin', emptyCart)
            cartBuyProducts.remove()
        }
        cartList.forEach((e, index) => {
            const product = data.products.find(el => el.title === e.title)
            const showCart = `
            <div class="cart-item">
              <div class="cart-body">
                <div class="item-image">
                  <img src="${product.images[0]}" alt="Зображення товару">
                </div>
                <div class="item-info">
                  ${product.title}
                </div>
              </div>
              <div class="cart-price">
                <div class="amount">
                  <button id="minus${index}" class="button-minus"><img class="minus" src="./assets/images/minus.svg" alt="minus"></button>
                  <input disabled value="${e.amount}" class="amount-input" type="text" id="">
                  <button id="plus${index}" class="button-plus"><img class="plus" src="./assets/images/plus.svg" alt="plus"></button>
                </div>
                <div class="price" id="price${index}">
                  ${roundUp(Math.ceil((product.price * e.amount) * 100) / 100)}$
                </div>
              </div>
              <div class="cart-menu">
                <img id="close${index}" src="./assets/images/close.svg" alt="close">
              </div>
            </div>
            `
            cartItems.insertAdjacentHTML("beforeend", showCart)
            const minusBtn = document.getElementById(`minus${index}`)
            const plusBtn = document.getElementById(`plus${index}`)
            const price = document.getElementById(`price${index}`)
            const close = document.getElementById(`close${index}`)
            close.addEventListener("click", e => {
                e.target.parentElement.parentElement.remove()
                fillListWithLocalStorage(cartList)
                const [...productName] = e.target.parentElement.previousElementSibling.previousElementSibling.children
                const index = cartList.findIndex(e => e.title === productName[1].innerText.trim())
                localStorage.removeItem(`cartItem${index}`)
                for (let i = parseInt(index); i < cartList.length - 1; i++) {
                    localStorage[`cartItem${i}`] = localStorage[`cartItem${i + 1}`]
                    localStorage.removeItem(`cartItem${i + 1}`)
                }
                fillListWithLocalStorage(cartList)
                getCartNumber()
                total.innerText = `${roundUp(findSum(cartList))}$`
                if (cartList.length === 0) {
                    const cartBuyProducts = document.querySelector(".cart-buy-products")
                    const emptyCart = `
                    <div class="empty-cart-container">
                        <img src="./assets/images/empty_cart.png" class="empty-cart-image" alt="Порожня корзина">
                        <span>Ваш кошик порожній :(</span>
                    </div>
                    `
                    cartItems.insertAdjacentHTML('afterbegin', emptyCart)
                    cartBuyProducts.remove()
                }

            })
            minusBtn.addEventListener("click", e => {

                let button = e.target
                if (button.tagName !== document.createElement("button").tagName) {
                    button = e.target.parentElement
                }
                const index = button.id[button.id.length - 1]
                if (button.nextElementSibling.value > 1) {
                    button.nextElementSibling.value--
                    const showedPrice = Math.ceil((product.price * button.nextElementSibling.value) * 100) / 100
                    price.innerText = `${roundUp(showedPrice)}$`
                    const amount = JSON.parse(localStorage[`cartItem${index}`])
                    amount.amount--
                    localStorage[`cartItem${index}`] = JSON.stringify(amount)
                    fillListWithLocalStorage(cartList)
                    total.innerText = `${roundUp(findSum(cartList))}$`
                    getCartNumber()
                }


            })
            plusBtn.addEventListener("click", e => {
                let button = e.target
                if (button.tagName !== document.createElement("button").tagName) {
                    button = e.target.parentElement
                }
                button.previousElementSibling.value++
                const showedPrice = Math.ceil((product.price * button.previousElementSibling.value) * 100) / 100

                price.innerText = `${roundUp(showedPrice)}$`
                const amount = JSON.parse(localStorage[`cartItem${index}`])
                amount.amount++
                localStorage[`cartItem${index}`] = JSON.stringify(amount)
                fillListWithLocalStorage(cartList)
                total.innerText = `${roundUp(findSum(cartList))}$`
                getCartNumber()
            })

        })
    })
}

function searchProducts() {
    search.addEventListener("click", () => {
        const input = search.previousElementSibling
        localStorage["search"] = input.value
        window.location = "../products.html"
    })
}

function getCartNumber() {
    const productList = []
    fillListWithLocalStorage(productList)
    let cartAmount = 0
    productList.forEach(e => {
        cartAmount += e.amount
        cartNumber.innerText = cartAmount
    })
    if (productList.length !== 0) {
        cartNumber.classList.add("show-cart-number")
    }
    else if(productList.length === 0){
        cartNumber.classList.remove("show-cart-number")
        cartNumber.innerText = 0
    }
}

function findSum(list) {
    const sum = list.reduce(function (acc, product) {
        return acc + product.price * product.amount
    }, 0)
    return sum
}

function roundUp(number) {
    const penny = `${number}`.split(".")
    if (penny.length === 1) {
        return penny.join("")
    }
    else if (penny[1].length < 2) {
        penny[1] = penny[1] + "0"
    }
    else if (penny[1].length > 2) {
        penny[1] = Math.ceil(penny[1].slice(0, 3) / 10)
    }
    return penny.join(".")
}

function fillListWithLocalStorage(list) {
    list.splice(0, list.length)
    for (let i = 0; i < localStorage.length; i++) {
        const product = localStorage[`cartItem${i}`]
        if (product !== undefined) {
            list.push(JSON.parse(localStorage[`cartItem${i}`]))
        }

    }
}

function createProducts(list, place) {
    const placeToInsert = document.querySelector(place)
    list.forEach((e, index) => {
        const products = `
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
        placeToInsert.insertAdjacentHTML("beforeend", products)
        const productInfo = document.getElementById(`product${index}`)
        const button = document.createElement("button")
        button.className = "btn"
        button.innerText = "Переглянути"
        button.id = e.title
        button.addEventListener("click", () => {
            localStorage.setItem("showProduct", JSON.stringify(e))
            window.location.href = "../product.html"
        })
        productInfo.append(button)
    })
}

function sortProducts(list) {
    const container = document.querySelector(".container-div")
    container.insertAdjacentHTML("afterbegin", `
    <section class="sort">
        <h1>Сортування</h1>
        <div class="sort-by">
          <div class="sort-container">
            <div class="by-price">
              <h3>Ціна</h3>
              <span class="main-span"><span>Від <input class="number-input" id="by-price-min" value="0" type="text"></span> <span>До <input class="number-input" id="by-price-max" type="text">$</span></span>
            </div>
            <div class="by-rate">
              <h3>Рейтинг</h3>
              <span class="main-span"><span>Від <input class="number-input" id="by-rate-min" value="0" type="text"></span> <span>До <input class="number-input" id="by-rate-max" type="text"></span></span>
            </div>
          </div>
          <button id="submit-sort" class="btn">Сортувати</button>
        </div>
    </section>`)

    const byPriceMin = document.getElementById("by-price-min")
    const byPriceMax = document.getElementById("by-price-max")
    const byRateMin = document.getElementById("by-rate-min")
    const byRateMax = document.getElementById("by-rate-max")
    const submitSort = document.getElementById("submit-sort")

    let maxPrice = 0
    list.forEach(e => {
        if (e.price > maxPrice) {
            maxPrice = e.price
        }
    })
    let maxRate = 0
    list.forEach(e => {
        if (e.rating > maxRate) {
            maxRate = e.rating
        }
    })
    byPriceMax.value = Math.ceil(maxPrice)
    byRateMax.value = Math.ceil(maxRate)

    filterInput(byPriceMin)
    filterInput(byPriceMax)
    filterInput(byRateMin)
    filterInput(byRateMax)
    checkValues(byPriceMin, byPriceMax, Math.ceil(maxPrice))
    checkValues(byRateMin, byRateMax, Math.ceil(maxRate))

    submitSort.addEventListener("click", () => {
        const sortedProducts = list.filter(e => {
            return e.price > parseInt(byPriceMin.value) &&
                e.price < parseInt(byPriceMax.value) &&
                e.rating > parseInt(byRateMin.value) &&
                e.rating < parseInt(byRateMax.value)
        })
        const [...productGrid] = document.querySelector(".product-grid").children
        productGrid.forEach(e => e.remove())
        createProducts(sortedProducts, ".product-grid")
        document.querySelector(".category h1").insertAdjacentHTML("afterend", `<h2>(Ціна від ${byPriceMin.value} до ${byPriceMax.value}$. Рейтинг від ${byRateMin.value} до ${byRateMax.value} зірок)</h2>`)
    })
}

function filterInput(input) {
    input.addEventListener("beforeinput", () => {
        if (input.selectionStart < input.value.length) {
            input.selectionStart = input.value.length
        }
    })
    input.addEventListener("input", () => {
        const lastChar = input.value.slice(input.value.length - 1, input.value.length)
        const lastCharNumber = /[0-9]/
        if (lastChar.search(lastCharNumber) === -1 && input.value.length !== 0) {
            input.value = input.value.slice(0, input.value.length - 1)
        }

        if (input.value.slice(0, 1) === "0" && input.value.length > 1) {
            input.value = input.value.slice(1, input.value.length)
        }

        if (input.id === "by-rate-max" || input.id === "by-rate-min") {
            if (input.value.length > 1) {
                input.value = input.value.slice(1, input.value.length)
            }

            if (input.value > 5) {
                input.value = 5
            }
        }

        if (input.value.length === 0) {
            input.value = "0"
        }
    })
}

function checkValues(firstInput, lastInput, maxNumber) {
    firstInput.addEventListener("change", () => {
        if (parseInt(firstInput.value) > parseInt(lastInput.value)) {
            firstInput.value = lastInput.value
        }
        if (parseInt(firstInput.value) > maxNumber) {
            firstInput.value = maxNumber
        }
    })

    lastInput.addEventListener("change", () => {
        if (parseInt(firstInput.value) > parseInt(lastInput.value)) {
            lastInput.value = firstInput.value
        }
        if (parseInt(lastInput.value) > maxNumber) {
            lastInput.value = maxNumber
        }
    })

}

export { fillListWithLocalStorage, createProducts, sortProducts }