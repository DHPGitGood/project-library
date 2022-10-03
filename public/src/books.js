function findAuthorById(authors, id) {
  const result = authors.find((author) => author.id === id);
  return result;
}

function findBookById(books, id) {
  const result = books.find((book) => book.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter((book) =>
    book.borrows.some((transaction) => transaction.returned === false)
  );
  const returned = books.filter((book) =>
    book.borrows.every((transaction) => transaction.returned === true)
  );
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const change = book.borrows.map((borrow) => {
    const accInfo = accounts.find((account) => account.id === borrow.id);
    accInfo.returned = borrow.returned;
    return accInfo;
  });
  return change.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
