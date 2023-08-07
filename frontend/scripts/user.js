// script.js
let url = "https://fair-gray-indri-cap.cyclic.app"
const displayArea = document.getElementById('displayArea');
const genderSelect = document.getElementById('gender-select');
const pageNumberInput = document.getElementById('pageNumber');
const prevButton = document.getElementById('prev');
const goToPageButton = document.getElementById('goToPage');
const nextButton = document.getElementById('next');

let temp =0;
let page = 1;

function buttonlist() {
    fetch(`${url}/get`)
        .then(response => response.json())
        .then((data) => {
            // Create buttons based on the received data
            const allbutton = document.getElementById('Allbuttons');
            let buttonNumber = 1;
            let n = (data.length) / 10;
            temp = n;
            
            for (let i = 0; i < n; i++) {
                const button = document.createElement('button');
                button.textContent = i + 1; // Display button numbers starting from 1
                button.addEventListener('click', () => {
                    // Handle button click action here
                    // Log the button number when clicked
                    console.log(`Button ${i + 1} clicked.`);
                    fetch(`${url}/users?page=${i+1}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then((data) => {
                            console.log(data);
                            const users = data;
                            const tableBody = document.querySelector('tbody');
                            tableBody.innerHTML = "";
                            users.forEach((user) => {
                                const userRow = createUserRow(user);
                                tableBody.appendChild(userRow);
                            });
                        })
                        .catch((error) => {
                            console.error('Error:', error.message);
                        });
                });
                allbutton.appendChild(button);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
        });
}




async function fetchData() {
    const gender = genderSelect.value;
    // const page = pageNumberInput.value;

    fetch(`${url}/users/filter?gender=${gender}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const users = data;
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = "";
            users.forEach((user) => {
                const userRow = createUserRow(user);
                tableBody.appendChild(userRow);
            });
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });

    // Display the fetched data in the display area
}

// Add event listeners for pagination and gender selection
genderSelect.addEventListener('change', fetchData);
prevButton.addEventListener('click', () => {
    if (page > 1) {
        page--;
        let pageN = page
        fetch(`${url}/users?page=${pageN}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                const users = data;
                const tableBody = document.querySelector('tbody');
                tableBody.innerHTML = "";
                users.forEach((user) => {
                    const userRow = createUserRow(user);
                    tableBody.appendChild(userRow);
                });
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }
});
goToPageButton.addEventListener('click', (e) => {
    e.preventDefault()
    let pNumber = pageNumberInput.value;
    fetch(`${url}/users?page=${pNumber}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const users = data;
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = "";
            users.forEach((user) => {
                const userRow = createUserRow(user);
                tableBody.appendChild(userRow);
            });
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });

});

nextButton.addEventListener('click', () => {
    
    if(page<temp){
        page++;
        let pageN = page;
    fetch(`${url}/users?page=${pageN}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const users = data;
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = "";
            users.forEach((user) => {
                const userRow = createUserRow(user);
                tableBody.appendChild(userRow);
            });
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
    }
    
});

// Function to create a table row for a user
function createUserRow(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.title + " " + user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.gender}</td>
        <td>${user.city}</td>
        <td>${user.state}</td>
        <td>${user.country}</td>
        <td>${user.postcode}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.dob_date}</td>
        <td>${user.dob_age}</td>
        <td>${user.phone}</td>
    `;
    return row;
}
window.onload = function () {
    fetchAndDisplayUsers();
    buttonlist()
};

// Function to fetch and display initial user data
function fetchAndDisplayUsers() {
    fetch(`${url}/users`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const users = data;
            const tableBody = document.querySelector('tbody');
            users.forEach((user) => {
                const userRow = createUserRow(user);
                tableBody.appendChild(userRow);
            });
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}

// Call fetchAndDisplayUsers when the DOM is loaded
// document.addEventListener('DOMContentLoaded', fetchAndDisplayUsers);
