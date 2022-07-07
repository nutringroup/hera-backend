
class SquadError extends Error {
    constructor(error="Você não possui um squad ou não tem a permissão de criar uma prospecção") {
      super(error);
      this.name = "SquadValidation";
    }
  }

  export default SquadError;