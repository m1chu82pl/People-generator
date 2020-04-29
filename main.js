const getUsers = (e) => {
  e.preventDefault();

  const usersNumber = document.querySelector('[name = "users-number"]').value;
  const usersGender = document.querySelector('[name = "gender"]').value;
  const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${usersGender === "both" ? "male,female" : usersGender}`;
  // console.log(url);

  fetch(url) //oczekująca obietnica
    // w odpowiedzi jest spełniona lub odrzucona
    // jeśli spełniona wykonuje się then()
    .then(response => {
      // console.log(response);
      if (response.status !== 200) {
        throw Error('To nie jest ospowiedź 200!')
      } else {
        return response.json() // = fetch API z BODY wyodrębnia JSON
      }
    })
    .then(json => showUsers(json.results))
    .catch(err => console.log(err)) // wykonuje się jeśli fetch() zostanie odrzucone
}

const showUsers = (users) => {
  const resultArea = document.querySelector('.user-list');
  resultArea.textContent = '';
  users.forEach(user => {
    // console.log(user);
    const item = document.createElement('div');
    item.className = 'user';
    item.innerHTML = `
    <div class="user__name">${user.name.title.toUpperCase()} ${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}</div>
    <img class="user__image" src=${user.picture.medium}>
    `
    resultArea.appendChild(item);
  })
}


document.querySelector('.generator').addEventListener('submit', getUsers);