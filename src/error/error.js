class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "Not Found Error";
  }
}

function formError(field, errMsg) {
  return `${field} ${errMsg}`;
}

export { NotFoundError, formError };
