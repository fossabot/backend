const idValidation = {
    presence: true,
    numericality: {
        greaterThan: 0,
        strict: true
    }
};

const usernameValidation = {
    presence: true,
    format: {
        pattern: "[a-z0-9-_]+",
        flags: "i",
        message: "can only contain letters, numbers, underscores and dashes"
    },
    length: {
        minimum: 4,
        maximum: 64,
        tooShort: 'must be at least 4 characters',
        tooLong: 'must be less than 64 characters'
    },
    exclusion: {
        within: ['admin', 'atlauncher'],
        message: '\'%{value}\' is not allowed'
    }
};

const passwordValidation = {
    presence: true,
    length: {
        minimum: 6,
        tooShort: 'must be at least 6 characters'
    }
};

const emailValidation = {
    presence: true,
    email: true
};

export const GET = {
    id: idValidation
};

export const POST = {
    username: usernameValidation,
    password: passwordValidation,
    email: emailValidation
};