import { HttpException } from "../HttpException";



class UserWithThatUsernameNotExistsException extends HttpException
{

    constructor(username: string)
    {
        super(404, `User with username ${username} not exists`);
    }
}

export default UserWithThatUsernameNotExistsException;
