const {
    addBookShelf,
    getAllBooksShelf,
    getIdBookShelf,
    editBookShelf,
    deleteBookShelf
    }= require('./handler');

const routes = [
    {
        method : 'POST',
        path : '/books',
        handler : addBookShelf
    },
    {
        method : 'GET',
        path : '/books',
        handler : getAllBooksShelf
    },
    {
        method : 'GET',
        path : '/books/{bookId}',
        handler : getIdBookShelf
    },
    {
        method : 'PUT',
        path : '/books/{bookId}',
        handler : editBookShelf
    },
    {
        method : 'DELETE',
        path : '/books/{bookId}',
        handler : deleteBookShelf
    }
];

module.exports = routes;