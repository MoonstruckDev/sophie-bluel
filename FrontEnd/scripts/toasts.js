
export function createToast(titlecontent, textcontent, color) {
    // Create the elements for the toast
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-bread-slice';

    const toastTextContainer = document.createElement('div');
    toastTextContainer.className = 'toast__text';

    const title = document.createElement('h2');
    title.className = 'toast--title';
    title.textContent = titlecontent;

    const text = document.createElement('p');
    text.className = 'toast--text';
    text.textContent = textcontent;

    const duration = document.createElement('div');
    duration.className = 'toast-duration';

    // Append the elements to the container
    toastTextContainer.appendChild(title);
    toastTextContainer.appendChild(text);

    toastContainer.appendChild(icon);
    toastContainer.appendChild(toastTextContainer);
    toastContainer.appendChild(duration);
	toastContainer.style.backgroundColor = color;

   
    document.body.insertAdjacentElement('afterbegin', toastContainer);

}

export function closeToast(event) {
	let toastClose = event.target;
	toastClose.closest('.toast-container').remove();
}

export function closeToastDuration() {
	if (document.querySelectorAll('.toast-container')) {
		let toasts = document.querySelectorAll('.toast-container');
		toasts.forEach(toast => {
			setTimeout(() => {
				toast.remove();
			}, 5000);
		});
	}
}

closeToastDuration();

if (document.getElementById('toast-container')) {
	let mutationObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			closeToastDuration();
		});
	});
	mutationObserver.observe(document.getElementById('toast-container'), {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true,
		attributeOldValue: true,
		characterDataOldValue: true
	});
}