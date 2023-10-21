loadList();

function loadList() {
    fetch(API)
    .then(res => res.json())
    .then(res => {
        document.getElementById('count').innerText = res.count;

        res.tasks.forEach(task => {
            const item = document.createElement('section');
            item.setAttribute('class', 'item-container');
            item.setAttribute('id', task._id);
            item.innerHTML =
            `
                <p class="buttons-container">
                    <a href="#" onclick="removeTask('${task._id}', false)">🗑️</a>
                    <a href="#" onclick="removeTask('${task._id}', true)">✅</a>
                    <a href="#" class="edit" onclick="editTask('${task._id}')">✏️</a>
                    <a href="#" class="save" onclick="saveTask('${task._id}')" style="display: none;">💾</a>
                </p>
                <p class="text">${task.text}</p>
            `;

            main.appendChild(item);
        });
    });
}

function editTask(id) {
    const item = document.getElementById(id);
    const text = item.getElementsByClassName('text')[0];
    const currentText = text.innerText;

    item.getElementsByClassName('save')[0].style.display = '';
    item.getElementsByClassName('edit')[0].style.display = 'none';

    text.innerHTML = 
    `
        <input type="text" class="textInput" onkeydown="inputKeyDown(event, '${id}', '${currentText}', true)" value="${currentText}">
    `;
}

function saveTask(id = '') {
    let item, text;

    if (id) {
        item = document.getElementById(id);
        text = item.getElementsByClassName('textInput')[0].value;
    }
    else {
        text = document.getElementById('new-task').value;
    }

    fetch(
        id ? `${API}?id=${id}` : API + '/new',
        {
            method: id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text": text})
        }
    )
    .then(res => res.json().then(d => ({status: res.status, json: d})))
    .then(res => {
        if (res.status === 400) {
            alert(res.json.error);
        }

        console.log(res.json);
        location.reload();
    });
}

function inputKeyDown(event, id = '', currentText = '', editMode = false) {
    switch (event.key) {
        case "Enter":
            saveTask(id);
            return;
        case "Escape":
            if (!editMode) {
                return;
            }

            const item = document.getElementById(id);
            const text = item.getElementsByClassName('text')[0];

            item.getElementsByClassName('save')[0].style.display = 'none';
            item.getElementsByClassName('edit')[0].style.display = '';

            text.innerText = currentText;
            return;
        default:
            return;
    }
}