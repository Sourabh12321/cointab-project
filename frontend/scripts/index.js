let fetchuser = document.querySelector("#fetch-users");
let deleteuser = document.querySelector("#delete-users");
let userdetails = document.querySelector("#user-details");
let url = "http://localhost:2000"


let isFetching = false;

fetchuser.addEventListener('click', (e) => {
    e.preventDefault();
    if (isFetching) {
        Swal.fire({
            title: `Wait`,
            text: 'Please wait, a fetch request is already in progress.',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
        
        return;
    }

    console.log('fetch');
    isFetching = true;

    fetch(`${url}/fetch-users`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Handle the data after successful fetch
            console.log(data);
            Swal.fire({
                title: `Done`,
                text: 'fetch request is completed',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            isFetching = false; // Reset the flag after the request is completed
        })
        .catch((error) => {
            // Handle errors
            console.error('Error:', error.message);
            isFetching = false; // Reset the flag on error as well
        });
});



deleteuser.addEventListener('click', (e) => {
    e.preventDefault();

    // const confirmation = confirm('Are you sure you want to delete all users?');
    // if (!confirmation) {
    //     return;
    // }
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action will delete all users.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete all users!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${url}/delete-users`,{
                method:"DELETE"
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Handle the data after successful fetch
                    Swal.fire({
                        title: `Done`,
                        text: 'Data deleted successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    console.log(data);
                })
                .catch((error) => {
                    Swal.fire({
                        title: `Error`,
                        text: `${error}`,
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    });
                    // Handle errors
                    console.error('Error:', error.message);
                });
            // Perform the delete operation here or show a success message
        }
    });

    
    
});



