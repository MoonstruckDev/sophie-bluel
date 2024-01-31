

export function isAdmin() {
    return parseInt(sessionStorage.getItem('userId')) === 1;
}

export function getBearerToken() {
    return sessionStorage.getItem('token');
}

export function logout() {
    sessionStorage.removeItem('token')
    const filter__list = document.querySelector('.filter__list');
    filter__list.style.display = "flex";
}
