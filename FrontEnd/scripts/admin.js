export function isAdmin() {
    return parseInt(sessionStorage.getItem('userId')) === 1;
}

export function getBearerToken() {
    return sessionStorage.getItem('token');
}

export function logout() {
    sessionStorage.removeItem('token')
}
