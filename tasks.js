document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tasks-form");
    const addTaskButton = document.getElementById("add-task");

    let taskCount = 1;

    addTaskButton.addEventListener("click", () => {
        taskCount++;
        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.id = `task-${taskCount}`;

        newTask.innerHTML = `
            <fieldset>
                <legend>Задача №${taskCount}</legend>
                
                <label for="task-${taskCount}-task">Задача:</label>
                <textarea id="task-${taskCount}-task" name="task" placeholder="Введите описание задачи" rows="2" required></textarea>
                
                <label for="task-${taskCount}-event">Мероприятие:</label>
                <textarea id="task-${taskCount}-event" name="event" placeholder="Введите мероприятие" rows="2" required></textarea>
                
                <label for="task-${taskCount}-work">Работа:</label>
                <textarea id="task-${taskCount}-work" name="work" placeholder="Введите описание работы" rows="2" required></textarea>
                
                <label for="task-${taskCount}-responsible">Ответственный:</label>
                <input type="text" id="task-${taskCount}-responsible" name="responsible" placeholder="Введите имя" required>
                
                <label for="task-${taskCount}-deadline">Срок:</label>
                <input type="date" id="task-${taskCount}-deadline" name="deadline" required>
                
                <label for="task-${taskCount}-result">Результат:</label>
                <textarea id="task-${taskCount}-result" name="result" placeholder="Введите ожидаемый результат" rows="2" required></textarea>
                
                <label for="task-${taskCount}-resources">Необходимые ресурсы:</label>
                <textarea id="task-${taskCount}-resources" name="resources" placeholder="Введите необходимые ресурсы" rows="3" required></textarea>
                
                <label for="task-${taskCount}-coexecutors">Соисполнители:</label>
                <input type="text" id="task-${taskCount}-coexecutors" name="coexecutors" placeholder="Введите соисполнителей">
                
                <label for="task-${taskCount}-comments">Комментарии:</label>
                <textarea id="task-${taskCount}-comments" name="comments" placeholder="Введите комментарии" rows="2"></textarea>
            </fieldset>
        `;

        form.insertBefore(newTask, addTaskButton);
    });
});
