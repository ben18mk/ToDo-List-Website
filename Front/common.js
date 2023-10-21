API = 'http://127.0.0.1:8000/api/v1/tasks';

const main = document.getElementById('list');

function removeTask(id, completeTask) {
    fetch(
        completeTask ? `${API}/complete/${id}` : `${API}?id=${id}`,
        {
            method: completeTask ? 'PUT' : 'DELETE'
        }
    )
    .then(res => res.json())
    .then(res => {
        console.log(res);
        location.reload();
    });
}

function removeAll(completeTasks, deleteUncomplete = 'true') {
    fetch(
        API + '/all' + (completeTasks ? '' : `?uncompleted=${deleteUncomplete}`),
        {
            method: completeTasks ? 'PUT' : 'DELETE',
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