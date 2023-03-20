async function addView() {
    window.location.href = '/api/phones/addPhone';
}

async function getView() {
    window.location.href = '/api/phones';
}

async function updateView(id, name, number) {
    window.location.href = `/api/phones/updatePhone?Id=${id}&SurName=${name}&PhoneNumber=${number}`;
}

async function addPhone() {
    const data = {
        SurName: document.getElementById('username').value,
        PhoneNumber: document.getElementById('phone').value,
    }
    try {
        const response = await fetch('http://localhost:3000/api/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Form submitted successfully!');
            window.location.href = 'http://localhost:3000/api/phones';
        } else {
            console.error('Form submission failed!');
            document.getElementById("err").innerHTML = "add failed"
        }
    } catch (error) {
        console.error('An error occurred while submitting the form:', error);
    }
}

async function updatePhone() {
    const data = {
        Id: parseInt(document.getElementById('phoneId').value),
        SurName: document.getElementById('SurName').value,
        PhoneNumber: document.getElementById('PhoneNumber').value,
    }
    debugger
    try {
        const response = await fetch('http://localhost:3000/api/phones', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Form submitted successfully!');
            window.location.href = 'http://localhost:3000/api/phones';
        } else {
            console.error('Form submission failed!');
            document.getElementById("err").innerHTML = "update failed"
        }
    } catch (error) {
        console.error('An error occurred while submitting the form:', error);
    }
}

async function deletePhone() {
    try {
        const id = document.getElementById('phoneId').value;
        const response = await fetch(`/api/phones/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        debugger
        if (response.ok) {
            console.log(`Customer with ID ${id} deleted successfully!`);
            // reload the page to update the customer list
            window.location.href = 'http://localhost:3000/api/phones';
        } else {
            console.error('Customer deletion failed!');
            document.getElementById("err").innerHTML = "delete failed"

        }
    } catch (error) {
        console.error(`An error`, error);
    }
}