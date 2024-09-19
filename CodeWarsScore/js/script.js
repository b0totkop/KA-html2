function api() {
    let id = document.getElementById("input").value;
    document.getElementById("er").innerHTML = "";
    fetch(`https://www.codewars.com/api/v1/users/` + id + `.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            show(users);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById("er").innerHTML = "Nem található a felhasználó!";
            document.getElementById("table").innerHTML = "";
        });
}

function show(user) {
    let table = document.getElementById("table");
    table.innerHTML = "<tr><th>username</th><th>name</th><th>honor</th><th>clan</th><th>leaderboardPosition</th></tr>";
        if (user.name == null){
            user.name = "";
        }
        if (user.clan == null){
            user.clan = "";
        }
        if (user.leaderboardPosition == null){
            user.leaderboardPosition = "";
        }
        table.innerHTML += `<tr>
                        <td>${user.username}</td>
                        <td>${user.name}</td>
                        <td>${user.honor}</td>
                        <td>${user.clan}</td>
                        <td>${user.leaderboardPosition}</td>
                    </tr>`;
}

function apiL() {
    let id = document.getElementById("input").value;
    document.getElementById("er").innerHTML = "";
    fetch(`https://www.codewars.com/api/v1/users/` + id + `.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            showL(users);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById("er").innerHTML = "Nem található a felhasználó!";
            document.getElementById("table").innerHTML = "";
        });
}

function showL(user) {
    let table = document.getElementById("table");
    table.innerHTML = "<tr><th>username</th><th>language</th><th>score</th></tr>";
    for (let lang in user.ranks.languages) {
        table.innerHTML += `<tr>
                        <td>${user.username}</td>
                        <td>${lang}</td>
                        <td>${user.ranks.languages[lang].score}</td>
                    </tr>`;
    }
}