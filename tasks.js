document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tasks-form");
    const tableBody = document.querySelector("#tasks-table tbody");

    // Обработчики для кнопок сортировки
    document.querySelectorAll("th[data-column]").forEach((header) => {
        header.addEventListener("click", (event) => {
            const target = event.target.closest(".sort-btn");
            if (!target) return;

            const column = header.getAttribute("data-column");
            const order = target.getAttribute("data-order");
            const rows = Array.from(tableBody.querySelectorAll("tr"));

            // Сортировка строк
            rows.sort((a, b) => {
                let aValue, bValue;

                if (column === "number") {
                    aValue = parseInt(a.getAttribute("data-id"), 10);
                    bValue = parseInt(b.getAttribute("data-id"), 10);
                } else {
                    aValue = a.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();
                    bValue = b.querySelector(`td:nth-child(${header.cellIndex + 1})`).textContent.trim();

                    if (!isNaN(aValue) && !isNaN(bValue)) {
                        aValue = parseFloat(aValue);
                        bValue = parseFloat(bValue);
                    }
                }

                return order === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
            });

            // Перерисовка строк
            rows.forEach((row) => tableBody.appendChild(row));

            // Обновление активной стрелки
            document.querySelectorAll(".sort-btn").forEach((btn) => btn.classList.remove("active"));
            target.classList.add("active");
        });
    });
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
    
        const taskNumber = tableBody.children.length + 1;
        addTaskToTable(taskData, taskNumber);
    
        form.reset();
    });
    

    // Функция редактирования задачи
    function editTask(row) {
        const form = document.getElementById("tasks-form");
        const submitButton = form.querySelector(".submit-btn");
        let saveButton = form.querySelector(".save-btn");
    
        // Заполнение формы текущими данными задачи
        const columns = row.children;
        form.querySelector("textarea[name='task']").value = columns[1].textContent;
        form.querySelector("textarea[name='event']").value = columns[2].textContent;
        form.querySelector("textarea[name='work']").value = columns[3].textContent;
        form.querySelector("input[name='responsible']").value = columns[4].textContent;
        form.querySelector("input[name='deadline']").value = columns[5].textContent;
        form.querySelector("textarea[name='result']").value = columns[6].textContent;
        form.querySelector("textarea[name='resources']").value = columns[7].textContent;
        form.querySelector("input[name='coexecutors']").value = columns[8].textContent;
        form.querySelector("textarea[name='comments']").value = columns[9].textContent;
    
        // Скрываем кнопку "Отправить"
        submitButton.style.display = "none";
    
        // Если кнопка "Сохранить изменения" уже существует, не создаём новую
        if (!saveButton) {
            saveButton = document.createElement("button");
            saveButton.textContent = "Сохранить изменения";
            saveButton.className = "save-btn";
            form.appendChild(saveButton);
        }
    
        // Обработчик для кнопки "Сохранить изменения"
        saveButton.onclick = (event) => {
            event.preventDefault();
    
            // Обновление данных в таблице
            columns[1].textContent = form.querySelector("textarea[name='task']").value;
            columns[2].textContent = form.querySelector("textarea[name='event']").value;
            columns[3].textContent = form.querySelector("textarea[name='work']").value;
            columns[4].textContent = form.querySelector("input[name='responsible']").value;
            columns[5].textContent = form.querySelector("input[name='deadline']").value;
            columns[6].textContent = form.querySelector("textarea[name='result']").value;
            columns[7].textContent = form.querySelector("textarea[name='resources']").value;
            columns[8].textContent = form.querySelector("input[name='coexecutors']").value;
            columns[9].textContent = form.querySelector("textarea[name='comments']").value;
    
            // Сбрасываем форму
            form.reset();
    
            // Убираем кнопку "Сохранить изменения"
            saveButton.remove();
    
            // Восстанавливаем кнопку "Отправить"
            submitButton.style.display = "inline-block";
        };
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
