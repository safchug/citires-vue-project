export default class User {
    constructor(firstname = '', lastname = '',
                mail = '', birthday= '',
                password = '') {
        this.name = firstname + ' ' + lastname;
        this.mail = mail;
        this.birthday = birthday;
        this.password = password;
    }
}