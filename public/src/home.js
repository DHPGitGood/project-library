function getTotalBooksCount(books) {
  return books.length > 0 ? books.length : 0;
}

function getTotalAccountsCount(accounts) {
  return accounts.length > 0 ? accounts.length : 0;
}

function getBooksBorrowedCount(books) {
  const checkedOut = books.filter((book) =>
    book.borrows.some((transaction) => transaction.returned === false)
  );
  return checkedOut.length;
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre);
  let common = genres.reduce((accumu, genre) => {
    if (!accumu[genre]) {
      accumu[genre] = { name: genre, count: 0 };
    }
    accumu[genre].count++;
    return accumu;
  }, []);
  return Object.values(common)
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .splice(0, 5);
}

function sortThenSplice(array) {
  let result = array.sort((a, b) => b.count - a.count).splice(0, 5);
  return result;
}

function getMostPopularBooks(books) {
  let popularBooks = books.reduce((total, book) => {
    const obj = {
      name: book.title,
      count: book.borrows.length,
    };
    total.push(obj);
    return total;
  }, []);
  return sortThenSplice(popularBooks);
}

function getMostPopularAuthors(books, authors) {
  const getBooksByAuthorId = (books, authorId) => {
    return books.filter((book) => book.authorId === authorId);
  };
  const result = authors.map((author) => {
    const naming = author.name;
    const fullName = `${naming.first} ${naming.last}`;
    const booksByAuthor = getBooksByAuthorId(books, author.id);
    const totalBorrows = booksByAuthor.reduce(
      (accum, book) => accum + book.borrows.length,
      0
    );
    const newAuthorInfo = { name: fullName, count: totalBorrows };
    return newAuthorInfo;
  });
  return Object.values(result)
    .sort((bookA, bookB) => bookB.count - bookA.count)
    .splice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
