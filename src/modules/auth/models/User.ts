export default class User {
    password: any;
    cpf: any;
    constructor(cpf: string, password: string) {
        this.cpf = cpf;
        this.password = password;
    }

}
