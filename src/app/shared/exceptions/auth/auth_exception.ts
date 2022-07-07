
class AuthError extends Error {
    constructor(error="Validação dos campos inválida") {
      super(error);
      this.name = "AuthValidation";
    }
  }

  export default AuthError;