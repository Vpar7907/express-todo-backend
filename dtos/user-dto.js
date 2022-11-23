/** DTO for user data
 * @module dto/user
 */

module.exports = class UserDto {
  email;
  id;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
  }
};
