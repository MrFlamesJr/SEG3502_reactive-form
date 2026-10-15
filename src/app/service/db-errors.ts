/** Thrown when a phone number carries no digits and so cannot key a user. */
export class InvalidPhoneError extends Error {
    override readonly name = 'InvalidPhoneError';

    constructor(readonly phone: string) {
        super(`"${phone}" is not a usable phone number: it contains no digits.`);
    }
}

/** Thrown by createUser when the phone number is already taken. */
export class DuplicateUserError extends Error {
    override readonly name = 'DuplicateUserError';

    constructor(readonly phone: string) {
        super(`A user with phone number ${phone} already exists.`);
    }
}
