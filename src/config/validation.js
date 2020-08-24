const validateMail = mail => {
    // eslint-disable-next-line
    const regEx = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regEx.test(mail);
};
const validatePassword = (password, min, max) => password.length > min && password.length < max;
const matchPasswords = (password, repeatedPassword) => password === repeatedPassword;

export {validateMail, validatePassword, matchPasswords};