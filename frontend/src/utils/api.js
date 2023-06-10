class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    return fetch(this.options.baseUrl + "/cards", {
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(this.options.baseUrl + "/users/me", {
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  editProfile(name, job) {
    return fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  editAvatar(link) {
    return fetch(this.options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this.options.baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(this.options.baseUrl + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(this.options.baseUrl + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: this.options.headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.domainlyubov.students.nomoredomains.rocks',
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});

export default api;
