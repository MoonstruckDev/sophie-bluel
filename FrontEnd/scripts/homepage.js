document.addEventListener('DOMContentLoaded', () => {
    isLoggedIn();
});

const showModal = document.querySelector('.modify__modal');
const dialog = document.querySelector('dialog');
const dialogButton = document.querySelector('dialog button');

const tableBody = document.querySelector('tbody');

showModal.addEventListener('click', () => {
    dialog.showModal();
    if (tableBody.children.length === 0) {
        generateWorksTable(checkSessionStorage(), document.querySelector('tbody'));
    }

    for (const row of tableBody.children) {
        // Iterate over the cells in the row
        for (const cell of row.children) {
            // Create a button element
            const button = document.createElement('button');
            button.classList.add('delete__button');
            button.textContent = 'x'; // Set the button text as needed

            // Append the button to the cell
            cell.appendChild(button);
        }
    }
});

document.addEventListener('click', (event) => {
    // Check if the clicked element has the delete__button class
    if (event.target.classList.contains('delete__button')) {
        // Retrieve the data-id from the parent <td> element
        const dataId = event.target.closest('td').querySelector('img').getAttribute('data-id');
        deleteWorkAndUpdateUI(dataId);
        console.log();
    }
});

dialogButton.addEventListener('click', () => {
    dialog.close();
});
