
class EmailError extends Error {
    constructor(error="Não foi possível enviar o email!") {
      super(error);
      this.name = "emailValidation";
    }
  }

  export default EmailError;