/**Exception for error which can occur during server working.
 * @module exceptions/api-error
 */

module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnathorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotAccess(message, errors = []) {
    return new ApiError(403, "Нет доступа к данному ресурсу", errors);
  }

  static NotFound(message, errors = []) {
    return new ApiError(404, "По данному запросу нчего не найдено", errors);
  }
};
