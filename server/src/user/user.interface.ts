/**
 * @swagger
 * tags:
 *   - name: _id
 *     description: ID
 *   - name: userName
 *     description: Username
 *   - name: nickName
 *     description: Short nickname of the user
 *   - name: email
 *     description: Unique email address
 */
interface User {
  _id: string;
  userName: string;
  nickName: string;
  email: string;
}

export default User;
