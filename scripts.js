function showCreateAccount() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('create-account').style.display = 'block';
}

function showLogin() {
    document.getElementById('create-account').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function login() {
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('password').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contact, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.is_admin) {
            window.location.href = 'admin.html';
        } else if (data.is_user) {
            window.location.href = 'user.html';
        } else {
            alert('Invalid credentials');
        }
    })
    .catch(error => console.error('Error:', error));
}

function createAccount() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact-create').value;
    const password = document.getElementById('password-create').value;

    fetch('create_account.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, contact, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        showLogin();
    })
    .catch(error => console.error('Error:', error));
}

function showAddBook() {
    document.getElementById('add-book').style.display = 'block';
    document.getElementById('borrowed-books').style.display = 'none';
}

function viewBorrowedBooks() {
    document.getElementById('add-book').style.display = 'none';
    document.getElementById('borrowed-books').style.display = 'block';

    fetch('view_books.php?type=borrowed')
    .then(response => response.json())
    .then(data => {
        const borrowedBooksList = document.getElementById('borrowed-books-list');
        borrowedBooksList.innerHTML = '';
        data.forEach(book => {
            borrowedBooksList.innerHTML += `<p>ISBN: ${book.isbn}, Title: ${book.title}, Borrowed By: ${book.borrowed_by}</p>`;
        });
    })
    .catch(error => console.error('Error:', error));
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    fetch('add_book.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, isbn })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('add-book-form').reset();
        document.getElementById('add-book').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function listAvailableBooks() {
    document.getElementById('available-books').style.display = 'block';
    document.getElementById('my-books').style.display = 'none';
    document.getElementById('return-book').style.display = 'none';

    fetch('view_books.php?type=available')
    .then(response => response.json())
    .then(data => {
        const availableBooksList = document.getElementById('available-books-list');
        availableBooksList.innerHTML = '';
        data.forEach(book => {
            availableBooksList.innerHTML += `<p>${book.title} by ${book.author} <button onclick="borrowBook('${book.isbn}')">Borrow</button></p>`;
        });
    })
    .catch(error => console.error('Error:', error));
}

function borrowBook(isbn) {
    fetch('borrow_book.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isbn })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('available-books').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function myBorrowedBooks() {
    document.getElementById('available-books').style.display = 'none';
    document.getElementById('my-books').style.display = 'block';
    document.getElementById('return-book').style.display = 'none';

    fetch('view_books.php?type=my')
    .then(response => response.json())
    .then(data => {
        const myBooksList = document.getElementById('my-books-list');
        myBooksList.innerHTML = '';
        data.forEach(book => {
            myBooksList.innerHTML += `<p>${book.title} - Deadline: ${book.deadline}</p>`;
        });
    })
    .catch(error => console.error('Error:', error));
}

function returnBook() {
    document.getElementById('available-books').style.display = 'none';
    document.getElementById('my-books').style.display = 'none';
    document.getElementById('return-book').style.display = 'block';

    fetch('view_books.php?type=my')
    .then(response => response.json())
    .then(data => {
        const returnBookList = document.getElementById('return-book-list');
        returnBookList.innerHTML = '';
        data.forEach(book => {
            returnBookList.innerHTML += `<p>${book.title} <button onclick="processReturn('${book.isbn}')">Return</button></p>`;
        });
    })
    .catch(error => console.error('Error:', error));
}

function processReturn(isbn) {
    fetch('return_book.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isbn })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('return-book').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function logout() {
    fetch('logout.php', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error:', error));
}
