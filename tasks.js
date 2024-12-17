document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tasks-form");
    const tableBody = document.querySelector("#tasks-table tbody");

    // Функция добавления строки в таблицу
    function addTaskToTable(taskData, taskNumber) {
        const row = document.createElement("tr");
        row.setAttribute("data-id", taskNumber); // Привязываем уникальный ID к строке
    
        const numberCell = document.createElement("td");
        numberCell.textContent = taskNumber;
        row.appendChild(numberCell);
    
        // Заполняем строку данными задачи
        Object.values(taskData).forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
    
        // Добавляем кнопки действий
        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `
            <button class="edit-btn">Редактировать</button>
            <button class="delete-btn">Удалить</button>
        `;
        row.appendChild(actionsCell);
    
        tableBody.appendChild(row);
    
        // Обработчики для кнопок
        actionsCell.querySelector(".edit-btn").addEventListener("click", () => editTask(row, taskData));
        actionsCell.querySelector(".delete-btn").addEventListener("click", () => deleteTask(row));
    }
        

    // Обработчик отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Собираем данные задачи
        const taskData = {
            task: form.querySelector("textarea[name='task']").value,
            event: form.querySelector("textarea[name='event']").value,
            work: form.querySelector("textarea[name='work']").value,
            responsible: form.querySelector("input[name='responsible']").value,
            deadline: form.querySelector("input[name='deadline']").value,
            result: form.querySelector("textarea[name='result']").value,
            resources: form.querySelector("textarea[name='resources']").value,
            coexecutors: form.querySelector("input[name='coexecutors']").value,
            comments: form.querySelector("textarea[name='comments']").value,
        };

        const taskNumber = tableBody.children.length + 1; // Определяем номер задачи
        addTaskToTable(taskData, taskNumber); // Добавляем задачу в таблицу
        form.reset(); // Очищаем форму
    });

    // Функция редактирования задачи
    function editTask(row, taskData) {
        const inputs = Object.keys(taskData);

        // Заполнение формы текущими данными задачи
        inputs.forEach((key, index) => {
            const input = form.querySelector(`[name='${key}']`);
            if (input) input.value = row.children[index + 1].textContent; // Смещение на +1 из-за номера задачи
        });

        // Добавляем временную кнопку "Сохранить"
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Сохранить изменения";
        saveBtn.className = "save-btn";
        form.appendChild(saveBtn);

        // Обработчик сохранения
        saveBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Обновление данных в таблице
            inputs.forEach((key, index) => {
                row.children[index + 1].textContent = form.querySelector(`[name='${key}']`).value; // Смещение на +1
            });

            form.reset(); // Очищаем форму
            saveBtn.remove(); // Убираем кнопку
        });
    }

    // Функция удаления задачи
    function deleteTask(row) {
        row.remove(); // Удаляем строку
    
        // Перенумеровываем оставшиеся строки и обновляем их data-id
        Array.from(tableBody.children).forEach((child, index) => {
            child.children[0].textContent = index + 1; // Обновляем номер задачи в таблице
            child.setAttribute("data-id", index + 1); // Обновляем data-id
        });
    }
      

    // Сортировка столбцов
    document.querySelectorAll("th[data-column]").forEach((header) => {
        header.addEventListener("click", () => {
            const column = header.getAttribute("data-column");
            const order = header.getAttribute("data-order");
            const rows = Array.from(tableBody.querySelectorAll("tr"));
    
            rows.sort((a, b) => {
                if (column === "number") {
                    // Сортировка по data-id для столбца с номерами
                    const aId = parseInt(a.getAttribute("data-id"), 10);
                    const bId = parseInt(b.getAttribute("data-id"), 10);
                    return order === "asc" ? aId - bId : bId - aId;
                } else {
                    // Сортировка по содержимому ячеек для других столбцов
                    const aText = a.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();
                    const bText = b.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();
    
                    const isNumber = !isNaN(aText) && !isNaN(bText);
                    if (isNumber) {
                        return order === "asc" ? aText - bText : bText - aText;
                    }
    
                    return order === "asc"
                        ? aText.localeCompare(bText, undefined, { numeric: true })
                        : bText.localeCompare(aText, undefined, { numeric: true });
                }
            });
    
            // Меняем порядок сортировки
            header.setAttribute("data-order", order === "asc" ? "desc" : "asc");
    
            // Перерисовка строк
            rows.forEach((row) => tableBody.appendChild(row));
    
            // Обновляем индикаторы сортировки
            updateSortIndicators(header);
        });
    });
    
    
    // Функция для обновления визуальных индикаторов сортировки
    function updateSortIndicators(activeHeader) {
        document.querySelectorAll("th[data-column]").forEach((header) => {
            const indicator = header.querySelector(".sort-indicator");
    
            // Если индикатор существует, обновляем его в активном столбце
            if (indicator) {
                const isActive = header === activeHeader;
                const order = header.getAttribute("data-order");
                indicator.textContent = isActive ? (order === "asc" ? "▲" : "▼") : "⬍";
            }
        });
    }
    
    // Добавляем индикаторы сортировки в HTML
    document.querySelectorAll("th[data-column]").forEach((header) => {
        if (!header.querySelector(".sort-indicator")) {
            const span = document.createElement("span");
            span.classList.add("sort-indicator");
            span.textContent = "⬍"; // Изначальное состояние
            header.appendChild(span);
        }
    });
    

    // Фильтрация
    document.getElementById("filter-input").addEventListener("input", (event) => {
        const filterValue = event.target.value.toLowerCase();
        const filterColumn = document.getElementById("filter-column").value; // Получаем выбранный столбец
        const rows = tableBody.querySelectorAll("tr");
    
        rows.forEach((row) => {
            // Если выбрано "Все столбцы", ищем по всем ячейкам
            if (filterColumn === "all") {
                const cells = Array.from(row.querySelectorAll("td:not(:last-child)")); // Исключаем последний столбец с действиями
                const match = cells.some((cell) => cell.textContent.toLowerCase().includes(filterValue));
                row.style.display = match ? "" : "none";
            } else {
                // Если выбран конкретный столбец, ищем только в нем
                const cell = row.children[parseInt(filterColumn)];
                if (cell) {
                    const match = cell.textContent.toLowerCase().includes(filterValue);
                    row.style.display = match ? "" : "none";
                }
            }
        });
    });
    
});
