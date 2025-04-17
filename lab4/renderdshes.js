document.addEventListener("DOMContentLoaded", () => {
    const containers = {
      soup: document.getElementById("soup-container"),
      main: document.getElementById("main-container"),
      drink: document.getElementById("drink-container")
    };
  
    const selectMap = {
      soup: document.querySelector('select[name="soup"]'),
      main: document.querySelector('select[name="main_dish"]'),
      drink: document.querySelector('select[name="drink"]')
    };
    // Сортировка блюд по алфавиту
    dishes.sort((a, b) => a.name.localeCompare(b.name));

    dishes.forEach(dish => {
      // 1. Создание карточки блюда
      const card = document.createElement("div");
      card.className = "dish";
      card.dataset.dish = dish.keyword;
      card.dataset.category = dish.category;
  
      card.innerHTML = `
        <div class="foods"><img src="${dish.image}" alt="${dish.name}"></div>
        <p>${dish.name}</p>
        <p>${dish.price} ₽</p>
        <p>${dish.count}</p>
        <button>Добавить</button>
      `;
  
      card.querySelector("button").addEventListener("click", () => {
        handleAddClick(dish, card);
      });
  
      containers[dish.category].appendChild(card);
  
      // 2. Создание option для <select>
      const option = document.createElement("option");
      option.value = dish.keyword;
      option.textContent = dish.name;
      selectMap[dish.category].appendChild(option);
    });
  });
  
  function handleAddClick(dish, cardElement) {
    // Снятие выделения со всех карточек этой категории
    document.querySelectorAll(`.dish[data-category="${dish.category}"]`)
      .forEach(el => el.classList.remove("selected"));
  
    // Выделение текущей карточки
    cardElement.classList.add("selected");
  
    // Обновление значения в <select>
    const selectMap = {
      soup: document.querySelector('select[name="soup"]'),
      main: document.querySelector('select[name="main_dish"]'),
      drink: document.querySelector('select[name="drink"]')
    };
  
    const select = selectMap[dish.category];
    if (select) {
      select.value = dish.keyword;
    }
    updateOrderSummary();
  }
  function updateOrderSummary() {
    const summary = document.getElementById("order-summary");
    summary.innerHTML = ""; // очищаем
  
    const soupVal = document.querySelector('select[name="soup"]').value;
    const mainVal = document.querySelector('select[name="main_dish"]').value;
    const drinkVal = document.querySelector('select[name="drink"]').value;
  
    const selected = {
      soup: dishes.find(d => d.keyword === soupVal),
      main: dishes.find(d => d.keyword === mainVal),
      drink: dishes.find(d => d.keyword === drinkVal),
    };
  
    const output = [];
    let total = 0;
  
    if (!selected.soup && !selected.main && !selected.drink) {
      summary.innerHTML = `<p class="empty-order"><strong>Ничего не выбрано</strong></p>`;
      return;
    }
  
    if (selected.soup) {
      output.push(`<p><strong>Суп:</strong> ${selected.soup.name} — ${selected.soup.price} ₽</p>`);
      total += selected.soup.price;
    } else {
      output.push(`<p><em>Выберите суп</em></p>`);
    }
  
    if (selected.main) {
      output.push(`<p><strong>Главное блюдо:</strong> ${selected.main.name} — ${selected.main.price} ₽</p>`);
      total += selected.main.price;
    } else {
      output.push(`<p><em>Выберите главное блюдо</em></p>`);
    }
  
    if (selected.drink) {
      output.push(`<p><strong>Напиток:</strong> ${selected.drink.name} — ${selected.drink.price} ₽</p>`);
      total += selected.drink.price;
    } else {
      output.push(`<p><em>Выберите напиток</em></p>`);
    }
  
    output.push(`<p class="order-total"><strong>Итого:</strong> ${total} ₽</p>`);
  
    summary.innerHTML = output.join("");
  }
  document.querySelector("form").addEventListener("reset", () => {
    // Убираем выделение с карточек
    document.querySelectorAll(".dish.selected").forEach(el => {
      el.classList.remove("selected");
    });
  
    // Очищаем блок заказа
    const summary = document.getElementById("order-summary");
    summary.innerHTML = `<p class="empty-order"><strong>Ничего не выбрано</strong></p>`;
  });
  
