document.addEventListener('DOMContentLoaded', function () {
    const recommendations = document.getElementById('recommendations');
    const recommendationsList = document.getElementById('recommendation-list');
    const block1Result = document.getElementById('block1-result');
    const block2Result = document.getElementById('block2-result');
    const block3Result = document.getElementById('block3-result');
    const block4Result = document.getElementById('block4-result');
    const block5Result = document.getElementById('block5-result');

    function closeAllSelects() {
        document.querySelectorAll('.custom-select.open').forEach(select => select.classList.remove('open'));
    }

    // Обработка кастомных выпадающих списков
    document.querySelectorAll('.custom-select').forEach(select => {
        const trigger = select.querySelector('.custom-select-trigger');
        const options = select.querySelectorAll('.custom-option');

        trigger.addEventListener('click', function () {
            closeAllSelects();
            select.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', function () {
                trigger.textContent = this.textContent;
                trigger.dataset.value = this.dataset.value;
                console.log(`Выбрано: ${this.dataset.value}`);

                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                select.classList.remove('open');
            });
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.custom-select')) closeAllSelects();
    });

    // Описание вопросов для блоков
    const block1Questions = [
        {
            id: 'strategy',
            validAnswers: ['да', 'нет'],
            recommendation: `Сразу же сформировать стратегию компании бывает непросто. Рекомендуем начать с формирования бизнес-цели на ближайший финансовый год. Шаблон доступен по ссылке.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'task_setting',
            validAnswers: ['звоню', 'ставлю на совещании/личной встрече', 'пишу в мессенджере', 'есть специальное ПО', 'никак'],
            recommendation: `Уверены, что задачи вы все-таки ставите, но, возможно, делаете это не системно и с использованием нескольких информационных каналов. Необходимо определиться с каналом информирования сотрудников и помимо формулировки самой задачи, использовать еще несколько критериев, в т.ч. сроки, ответственного, результат. Подробнее см. по ссылке. Использование специальных информационных продуктов позволяет не только быстро доносить новую задачу до подчиненных, но и контролировать ее исполнение.`,
            scoreMap: { 'звоню': 1, 'ставлю на совещании/личной встрече': 1, 'пишу в мессенджере': 1, 'есть специальное ПО': 1, 'никак': 0 }
        },
        {
            id: 'overdue',
            validAnswers: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            recommendation: `Работа с просроченными задачами занимает очень значительную часть операционной деятельности любого руководителя. Чтобы снизить это время необходимо не только четко ставить задачу, но и указывать ее сроки и результат, который вы хотите достичь, а также регулярно проводить контрольные мероприятия. Легче всего это осуществлять в программном продукте.`,
            /*scoreMap: (val) => {
                const numericValue = parseInt(val, 10); // Преобразуем строку в число
                return numericValue >= 50 ? 1 : 0; // Сравниваем с порогом
            }*/
            scoreMap: { '10': 0, '20': 0, '30': 0, '40': 0, '50': 1, '60': 1, '70': 1, '80': 1,'90': 1, '100': 1 }
        },        
        {
            id: 'meeting_protocol',
            validAnswers: ['да', 'нет'],
            recommendation: `Проведение совещания без протокола снижает эффективность данного мероприятия в несколько раз. Вести протокол совсем несложно. Для этого есть специальные шаблоны и несколько простых правил.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'protocol_to_task',
            validAnswers: ['секретарь рассылает в протокол', 'сразу на совещании заносим в автоматизированный задачник', 'рассылаем по электронной почте', 'сотрудники сами записывают на совещании', 'никак'],
            recommendation: `Пункты протокола должны превращаться в задачи для ваших подчиненных оперативно и по возможности без вашего активного участия. Сделать это можно несколькими путями: 1) назначьте секретаря совещания и он (а), распределить задачи после совещания в ручном режиме; 2) работайте в информационном продукте и сразу же на совещании фиксируйте задачи.`,
            scoreMap: { 'секретарь рассылает в протокол': 1, 'сразу на совещании заносим в автоматизированный задачник': 1, 'рассылаем по электронной почте': 1, 'сотрудники сами записывают на совещании': 1, 'никак': 0 }
        }
    ];

    const block2Questions = [
        {
            id: 'job_portrait',
            validAnswers: ['да', 'нет'],
            recommendation: `Портрет должности помогает более эффективно и оперативно осуществлять поиск сотрудников в случае открытия новых вакансий или их увольнения. Рекомендуем составить портреты ключевых должностей с использованием шаблона.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'instructions',
            validAnswers: ['да', 'нет'],
            recommendation: `"Лучший" способ составить должностную инструкцию - это скачать ее из Сети. Настоятельно не рекомендуем так поступать. Должностная инструкция должна быть подготовлена под конкретную должность на конкретном предприятии на конкретном этапе. Рекомендуем применять принцип "3+20" и использовать предлагаемый шаблон.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'full_efficiency',
            validAnswers: ['менее 1 месяца', 'через месяц', 'через 2 месяца', 'более трех месяцев'],
            recommendation: `Очень часто вновь нанятый сотрудник не сразу начинает приносить прибыль компании, т.е. выполнять свои должностные инструкции на 100%. Рекомендуем сократить период адаптации сотрудника до 1-2 месяцев. Один из лучших способов сокращения периода - это система наставничества, которая подразумевает составление адаптационного плана для каждого вновь приятого сотрудника. Заполните, пожалуйста, шаблоны по всем ключевым позициям.`,
            scoreMap: { 'менее 1 месяца': 1, 'через месяц': 1, 'через 2 месяца': 1, 'более трех месяцев': 0 }
        },
        {
            id: 'mentorship',
            validAnswers: ['да', 'нет'],
            recommendation: `Система наставничества - важнейший элемент адаптации нового сотрудника. Помимо адаптационного плана (см. шаблоны), она подразумевает наставника из числа опытных сотрудников. Наставник, используя адаптационный план, сопровождает новичка в течение 1-2 месяцев. Как и всякая работа, труд наставника должен быть оплачен. Рекомендуем учесть данный факт в вашем Положении об оплате труда.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'training',
            validAnswers: ['да', 'нет'],
            recommendation: `Система обучения сотрудников - важнейший элемент не только адаптации нового сотрудника, но и стимулирования действующих работников предприятия, а также важный инструмент повышения производительности труда. Рекомендуем составить концепцию и план обучения сотрудников, используя шаблон.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        }
    ];

    const block3Questions = [
        {
            id: 'payment',
            validAnswers: ['да', 'нет'],
            recommendation: `Рекомендуем составить положение об оплате труда, используя прилагаемый шаблон. Данный документ не только основа системы стимулирования вашего сотрудника, но и требование трудового законодательства многих стран мира, в т.ч. Российской Федерации.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'stimulation_methods',
            validAnswers: ['да', 'нет'],
            recommendation: `Оплата труда - это далеко не единственный способ стимулирования ваших сотрудников. Помимо материальных стимулов существует множество нематериальных. Сочетание материальных и нематериальных стимулов зависит от конкретного этапа развития определенной компании, а также от той или иной должности. Основа составления любой системы стимулирования - это поиск соответствия внутренних стимулов сотрудника и внешних стимулов, формируемых компанией. Рекомендуем составить проект системы стимулирования вашей компании, используя шаблон`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'visual_stimulation',
            validAnswers: ['да', 'нет'],
            recommendation: `Положение об оплате труди и система стимулирования, действующая на предприятии, должны быть доступны каждому сотруднику компании. Это также является важным элементом стимулирования. Рекомендуем визуализировать их в виде конкретных документов, обсудить проекты данных документов с коллективом, собрать обратную связь, при необходимости внести корректировки. Также рекомендуем разместить данные документы на корпоративном портале и проинформировать сотрудников об этом. `,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'corporate_culture',
            validAnswers: ['да', 'нет'],
            recommendation: `Корпоративная культура компании может стать полноценным активом любого предприятия, наряду с оборудованием и даже финансовыми активами. Именно она поможет предотвратить конфликтные ситуации, сплотить и удержать коллектив в сложной ситуации, повысить мотивированность и даже производительность труда сотрудника. Рекомендуем визуализировать основные элементы вашей корпоративной культуры, используя прилагаемый шаблон`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'roles',
            validAnswers: ['да', 'нет'],
            recommendation: `Четкое представление сотрудником своих должностных обязанностей (см. рекомендации по составлению должностных обязанностей) - это важнейшая часть системы стимулирования, действующей в компании. Также эффективными элементами любой системы стимулирования могут стать понимание сотрудником бизнес-цели и задач, стоящих перед компанией в определенной временной перспективе (см. рекомендации по составлению бизнес-цели и декомпозиции ее на задачи, мероприятия и работы). Четко обрисованные и достижимые ступени карьерного роста - еще один элемент повышения мотивированности сотрудника. Рекомендуем визуализировать данные элементы и ознакомить с ними ваших сотрудников.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        }
    ];

    const block4Questions = [
        {
            id: 'business_processes',
            validAnswers: ['да', 'нет'],
            recommendation: `Описание бизнес-процессов необходимо, особенно если над одной задачей трудятся несколько человек. Также бизнес-процессы являются основой для формирования регламентов и стандартов, действующих на предприятии и очень помогают при обучении новых сотрудников. Рекомендуем начать работать с этим разделом. Для того, чтобы описывать бизнес-процессы не обязательно применять сложные программы и механизмы. Можно начать с простых текстов, описывающих деятельность ваших сотрудников. Хорошим подспорьем будет сформированный перечень задач и раздел "Должностные обязанности и функционал" в должностных инструкциях ваших сотрудников. Также вы можете воспользоваться нашим шаблоном как для описания, так и изменения (реорганизации) ваших бизнес-процессов`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'responsible_employee',
            validAnswers: ['да', 'нет'],
            recommendation: `Не всякое предприятие может позволить себе содержать отдельного сотрудника, отвечающего за описание и реорганизацию бизнес-процессов. В этом случае рекомендуем распределить функционал среди топ-менеджеров компании и начать реализовывать эту работу в вашей компании. С основным функционалом можно ознакомиться, перейдя по ссылке`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'software_use',
            validAnswers: ['да', 'нет'],
            recommendation: `Описать бизнес-процессы можно текстом, таблицей, но лучше использовать схемы и язык UML. UML (от англ. Unified Modeling Language) переводится как «унифицированный язык моделирования». Это графический язык, в котором каждой фигуре, символу, стрелке или их сочетаниям присвоены конкретные значения. Он позволяет визуализировать явление или процесс так, чтобы схема была понятна всем, кто знаком с UML.`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'regulations',
            validAnswers: ['да', 'нет'],
            recommendation: `Можно сказать, что UML — это набор правил, по которым нужно рисовать схемы. Зная его, можно быстро создавать универсальные графические представления сложных процессов и структур. Именно поэтому IT-специалисты во время разработки ПО часто используют UML-моделирование и проектирование процессов. Подробнее про UML и специальные программы можно прочитать, перейдя по ссылке`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'quality_control',
            validAnswers: ['да', 'нет'],
            recommendation: `Описанные бизнес-процессы формируют систему регламентов, действующих в вашей организации. Система регламентов описывает всю вашу деятельность целиком и способна повышать эффективность работы как начинающих, так и уже опытных сотрудников. Рекомендуем начать с составления перечня регламентов, необходимых вашей организации. С примером можно ознакомиться, перейдя по ссылке. `,
            scoreMap: { 'да': 1, 'нет': 0 }
        }
    ];

    const block5Questions = [
        {
            id: 'org_structure',
            validAnswers: ['линейно-функциональная', 'дивизиональная', 'матричная', 'проектная', 'другая', 'затрудняюсь ответить'],
            recommendation: `На основе описанных регламентов и содержащихся в них бизнес-процессов возможно формирование системы контроля качества работы вашего предприятия. Данная процедура способна оказывать положительное влияние на такие аспекты вашей деятельности как взаимоотношения с клиентами, производственные процессы, процессы найма и адаптации персонала и многие другие. Рекомендуем начать процедуру контроля качества исполнения бизнес-процессов с контроля точек перехода бизнес-процесса от одного сотрудника к другому`,
            scoreMap: { 'линейно-функциональная': 1, 'дивизиональная': 1, 'матричная': 1, 'проектная': 1, 'другая': 1, 'затрудняюсь ответить': 0 }
        },
        {
            id: 'structure_visual',
            validAnswers: ['да', 'нет'],
            recommendation: `Применение того или иного типа организационной структуры подразумевает определенные особенности в системе управления. С описанием типов организационных структур вы можете ознакомиться, перейдя по ссылке. Главное, что присутствует в каждой организационной структуре, это вертикальные и горизонтальные связи между сотрудниками и подразделениями. Рекомендуем определится с типом организационной структуры, которая вам наиболее подходит и визуализировать ее с использованием данного сервиса. `,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'hierarchy',
            validAnswers: ['да', 'нет'],
            recommendation: `Организационная структура необходима не только для понимания вертикальных и горизонтальных связей сотрудником и руководителем, но и является одним из стимулов для рядового сотрудника: человеку важно осознавать свое место в организации, важно понимать, кто имеет право ставить ему задачи, а кто нет. Рекомендуем визуализировать вашу организационную структуру и проинформировать сотрудников о том, где с ней можно ознакомиться`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'roles_knowledge',
            validAnswers: ['да', 'нет'],
            recommendation: `Организационная структура, а именно понимание сотрудником своего места в ней является частью системы стимулирования в любой организации. Также сотруднику чрезвычайно важно понимать систему подчиненности, действующей в вашей компании: кто имеет право ставить задачи ему и кому он имеет право давать указания. Рекомендуем отразить данные взаимодействия в вашей схеме и ознакомить коллектив с данной информацией`,
            scoreMap: { 'да': 1, 'нет': 0 }
        },
        {
            id: 'cross_tasks',
            validAnswers: ['да', 'нет'],
            recommendation: `Иногда для координации деятельности коллектива необходимо информировать сотрудника о том, какой функционал исполняется его коллегами. Рекомендуем перенести информацию из раздела "Должностные обязанности" должностных инструкций ваших сотрудников в организационную структуру компании и проинформировать ваших сотрудников о существовании такой опции`,
            scoreMap: { 'да': 1, 'нет': 0 }
        }
    ];

    // Обработка отправки формы
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        recommendationsList.innerHTML = ''; // Очищаем предыдущие рекомендации
        recommendations.style.display = 'none'; // Скрываем рекомендации до успешной обработки

        try {
            const allRecommendations = [];

            // Подсчёт баллов для всех блоков
            const block1Sum = calculateBlockScore(block1Questions, allRecommendations);
            const block2Sum = calculateBlockScore(block2Questions, allRecommendations);
            const block3Sum = calculateBlockScore(block3Questions, allRecommendations);
            const block4Sum = calculateBlockScore(block4Questions, allRecommendations);
            const block5Sum = calculateBlockScore(block5Questions, allRecommendations);

            // Отображение результатов блоков
            block1Result.textContent = `Блок 1 (Задачи): ${block1Sum}`;
            block2Result.textContent = `Блок 2 (Люди): ${block2Sum}`;
            block3Result.textContent = `Блок 3 (Система стимулирования): ${block3Sum}`;
            block4Result.textContent = `Блок 4 (Бизнес-процессы): ${block4Sum}`;
            block5Result.textContent = `Блок 5 (Организационная структура): ${block5Sum}`;
            recommendations.style.display = 'block'; // Отображаем рекомендации

            // Добавляем рекомендации в список
            allRecommendations.forEach(rec => {
                const li = document.createElement('li');
                li.textContent = rec;
                recommendationsList.appendChild(li);
            });

            // Построение диаграммы
            drawRadarChart([block1Sum, block2Sum, block3Sum, block4Sum, block5Sum]);
        } catch (error) {
            console.error('Ошибка обработки формы:', error.message);
            alert(error.message); // Показываем сообщение об ошибке пользователю
        }
    });

    // Функция для построения диаграммы
    function drawRadarChart(data) {
        const ctx = document.getElementById('radarChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Блок 1', 'Блок 2', 'Блок 3', 'Блок 4', 'Блок 5'],
                datasets: [{
                    label: 'Оценка',
                    data,
                    backgroundColor: 'rgba(136, 190, 255, 0.2)',
                    borderColor: 'rgba(136, 190, 255, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5
                    }
                }
            }
        });
    }

    // Функция подсчёта баллов и добавления рекомендаций
    function calculateBlockScore(questions, recommendations) {
        
        return questions.reduce((sum, { id, validAnswers, scoreMap, recommendation }) => {
            const trigger = document.querySelector(`.custom-select[data-id="${id}"] .custom-select-trigger`);
            const value = trigger.dataset.value || '';
            console.log(`ID: ${id}, Value: ${value}, ValidAnswers: ${validAnswers}`);
            if (!validAnswers.includes(value)) {
                throw new Error(`Некорректный ответ для вопроса с ID: ${id}`);
            }
            if (scoreMap[value] === 0 && recommendation) recommendations.push(recommendation);
            return sum + (scoreMap[value] || 0);
        }, 0);
    }
});

