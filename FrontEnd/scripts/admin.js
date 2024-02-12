export function logout() {
    sessionStorage.removeItem('token')
    // Make filters show in flex when logging out
    // const filter__list = document.querySelector('.filter__list');
    // filter__list.style.display = "flex";
}
