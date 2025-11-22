// Данные товаров и услуг
const toursData = [
    {
        id: 1,
        name: "Сочи - Премиум",
        description: "7 дней на берегу Черного моря с экскурсиями в Олимпийский парк и Красную Поляну",
        price: 45000
    },
    {
        id: 2,
        name: "Байкал - Экспедиция",
        description: "5-дневное путешествие по священному озеру с посещением острова Ольхон",
        price: 35000
    },
    {
        id: 3,
        name: "Алтай - Приключение",
        description: "6 дней в горах Алтая с треккингом, рафтингом и конными прогулками",
        price: 28000
    },
    {
        id: 4,
        name: "Крым - Ретро тур",
        description: "8 дней по историческим местам Крыма с дегустацией местных вин",
        price: 32000
    },
    {
        id: 5,
        name: "Карелия - Северная сказка",
        description: "4 дня среди озер и водопадов с посещением горного парка Рускеала",
        price: 22000
    },
    {
        id: 6,
        name: "Золотое кольцо - Классика",
        description: "3-дневный тур по древним городам России с богатой историей",
        price: 18000
    }
];

const servicesData = [
    {
        id: 101,
        name: "Страховка путешественника",
        description: "Полное медицинское страхование на время поездки",
        price: 2500
    },
    {
        id: 102,
        name: "Трансфер из аэропорта",
        description: "Комфортабельный трансфер до отеля и обратно",
        price: 1500
    },
    {
        id: 103,
        name: "Экскурсионный пакет",
        description: "Полный набор экскурсий с профессиональным гидом",
        price: 8000
    },
    {
        id: 104,
        name: "VIP-зал в аэропорту",
        description: "Доступ в бизнес-зал с питанием и комфортным ожиданием",
        price: 3500
    },
    {
        id: 105,
        name: "Фотосессия",
        description: "Профессиональная фотосессия в самых живописных местах",
        price: 5000
    },
    {
        id: 106,
        name: "Аренда оборудования",
        description: "Туристическое снаряжение для активного отдыха",
        price: 3000
    }
];

let cart = [];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCart();
});

// Рендеринг товаров
function renderProducts() {
    const toursGrid = document.getElementById('tours-grid');
    const servicesGrid = document.getElementById('services-grid');

    // Рендерим туры
    toursData.forEach(tour => {
        toursGrid.appendChild(createProductCard(tour, 'tour'));
    });

    // Рендерим услуги
    servicesData.forEach(service => {
        servicesGrid.appendChild(createProductCard(service, 'service'));
    });
}

// Создание карточки товара
function createProductCard(product, type) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <h5>${product.name}</h5>
        <p class="description">${product.description}</p>
        <div class="price">${product.price.toLocaleString()} руб.</div>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${type}')">
            Добавить в корзину
        </button>
    `;
    return card;
}

// Добавление в корзину
function addToCart(productId, type) {
    const products = type === 'tour' ? toursData : servicesData;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push({
            ...product,
            type: type
        });
        updateCart();
        
        // Анимация добавления
        const button = event.target;
        button.textContent = 'Добавлено!';
        button.style.background = 'rgba(76, 175, 80, 0.3)';
        setTimeout(() => {
            button.textContent = 'Добавить в корзину';
            button.style.background = '';
        }, 1500);
    }
}

// Обновление корзины
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartData = document.getElementById('cart-data');
    const submitBtn = document.querySelector('.cart-submit-btn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        cartTotal.textContent = '0';
        submitBtn.disabled = true;
        cartData.value = '';
        return;
    }

    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${item.price.toLocaleString()} руб.</span>
            <button onclick="removeFromCart(${index})" style="background:none;border:none;color:#ff6b6b;cursor:pointer;margin-left:10px;">✕</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString();
    submitBtn.disabled = false;
    
    // Формируем данные для отправки
    const cartDataObj = {
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            type: item.type,
            price: item.price
        })),
        total: total,
        timestamp: new Date().toISOString()
    };
    
    cartData.value = JSON.stringify(cartDataObj);
}

// Удаление из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Очистка корзины
function clearCart() {
    cart = [];
    updateCart();
}