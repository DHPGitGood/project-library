function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
  const sortedByLastName = accounts.sort((accountA, accountB) =>
    accountA.name.last < accountB.name.last ? -1 : 1
  );
  return sortedByLastName;
}

function getTotalNumberOfBorrows(account, books) {
  let timesBorrowed = 0;
  const increment = books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (account.id === borrow.id) {
        timesBorrowed++;
      }
    });
  });
  return timesBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = books.filter((book) =>
    book.borrows.find((borrow) => borrow.id === account.id && !borrow.returned)
  );
  result.forEach((book) => {
    let theAuthor = authors.find((author) => book.authorId === author.id);
    book["author"] = theAuthor;
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
