const bcryptjs = require('bcryptjs');

/** Function to create hash from password */
export const getHash = async (password: string): Promise<string> => bcryptjs.hashSync(password, 10);

/** Functiojn to compare hash */
export const compareHash = async (password: string | undefined, hash: string | undefined): Promise<boolean> => {
    return bcryptjs.compareSync(password, hash);
}

/************ import function to compare hash and tokenHeader ************/
export const getTokenFromHeader = (authorizationHeader: any) => authorizationHeader.substr(7, authorizationHeader.length);