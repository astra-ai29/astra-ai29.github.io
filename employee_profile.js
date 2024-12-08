document.addEventListener("DOMContentLoaded", () => {
    const profileItemsContainer = document.getElementById("profileItems");
    const addProfileItemButton = document.getElementById("addProfileItem");
    let itemCount = 10; // Количество существующих пунктов

    addProfileItemButton.addEventListener("click", () => {
        itemCount++;
        const newItem = document.createElement("div");
        newItem.classList.add("profile-item");

        newItem.innerHTML = `
            <label for="customField_${itemCount}_name">Название пункта ${itemCount}:</label>
            <input type="text" id="customField_${itemCount}_name" name="customField_${itemCount}_name" placeholder="Введите название пункта" required>
            <label for="customField_${itemCount}_value">Значение пункта ${itemCount}:</label>
            <input type="text" id="customField_${itemCount}_value" name="customField_${itemCount}_value" placeholder="Введите значение" required>
        `;

        profileItemsContainer.appendChild(newItem);
    });
});
