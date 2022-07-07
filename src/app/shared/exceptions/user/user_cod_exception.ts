
class UserCodError extends Error {
    constructor(error="Não foi possível obter o código do usuário para criar a prospecção!") {
      super(error);
      this.name = "UserCodValidation";
    }
  }

  export default UserCodError;