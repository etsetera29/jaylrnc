CREATE TABLE IF NOT EXISTS users (
    contact TEXT PRIMARY KEY,
    name TEXT,
    password TEXT,
    is_admin INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS books (
    isbn TEXT PRIMARY KEY,
    title TEXT,
    author TEXT,
    is_available INTEGER DEFAULT 1,
    borrowed_by TEXT,
    borrow_date TEXT,
    deadline TEXT
);
