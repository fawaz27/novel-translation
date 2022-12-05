import { HttpException } from "../HttpException";



class NoUserFoundException extends HttpException
{

    constructor()
    {
        super(404, `No Users exist`);
    }
}

export default NoUserFoundException;