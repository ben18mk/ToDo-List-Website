loadList();

function loadList() {
    fetch(API + '/completed')
    .then(res => res.json())
    .then(res => {
        document.getElementById('count').innerText = res.count;

        res.tasks.forEach(task => {
            const completedTime = task.completedTime;

            const item = document.createElement('section');
            item.setAttribute('class', 'item-container');
            item.setAttribute('id', task._id);
            item.innerHTML =
            `
                <p class="buttons-container">
                    <a href="#" onclick="removeTask('${task._id}', false)">🗑️</a>
                </p>
                <a class="datetime">${getDate(completedTime)}</a>
                <a class="datetime">${getTime(completedTime)}</a>
                <p class="text">${task.text}</p>
            `;

            main.appendChild(item);
        });
    });
}