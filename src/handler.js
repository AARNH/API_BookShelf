const { nanoid } =  require('nanoid');
const books = require('./books');

const addBookShelf = ( request, h) => {
    const {name, year , author, summary, publisher, pageCount, readPage, reading} = request.payload;
    if (!name){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    const newBooks = {
        id, name, year , author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
    };
    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBooksShelf = (request,h) => {
    const {name,finished,reading} = request.query;
    let filterBook = books;   
    if (name) {
        filterBook = filterBook.filter((bs)=>bs.name.toUpperCase().includes(name.toUpperCase()));
    }
    if (finished) {
        filterBook = filterBook.filter((bs)=>bs.finished == (finished == 1));
    }
    if (reading) {
        filterBook = filterBook.filter((bs)=>bs.reading == (reading == 1));
    }
    const response = h.response ({
        status : 'success',
        data : { books: JSON.parse(JSON.stringify(filterBook, ['id', 'name', 'publisher'])) },
    });
    response.code(200);
    return response;
};

const getIdBookShelf = (request,h) => {
    const {bookId} = request.params;
    const book = books.filter((b) => b.id === bookId)[0];
    if (book !== undefined) {
        return {
            status: 'success',
            data: { 
                book 
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
}; 

const editBookShelf = (request,h) => {
    const {bookId} = request.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const updatedAt = new Date().toISOString();
    const finished = (pageCount === readPage);
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt, finished
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookShelf = (request,h) =>{
    const {bookId} = request.params;
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;

}

module.exports = {addBookShelf,getAllBooksShelf,getIdBookShelf,editBookShelf,deleteBookShelf};