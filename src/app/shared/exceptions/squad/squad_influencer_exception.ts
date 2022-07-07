
class SquadInfluencerError extends Error {
    constructor(error="Você está tentando criar uma negociação com produto já utilizado por esse mesmo influenciador em outra prospecção!") {
      super(error);
      this.name = "SquadInfluencerValidation";
    }
  }

  export default SquadInfluencerError;