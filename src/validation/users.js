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
        within: ['admin', 'atlauncher', 'root'],
        message: 'is not allowed'
    },
    uniqueUsername: true
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
    email: true,
    uniqueEmail: true
};

export const VALIDATE_ID = {
    id: idValidation
};

export const POST = {
    username: usernameValidation,
    password: passwordValidation,
    email: emailValidation
};

export const PUT = {
    username: {
        ...usernameValidation,
        presence: false
    },
    password: {
        ...passwordValidation,
        presence: false
    },
    email: {
        ...emailValidation,
        presence: false
    }
};