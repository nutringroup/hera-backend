
class ProspectionError extends Error {
    constructor(error="Não foi possível buscar a prospecção!") {
      super(error);
      this.name = "proespectionValidation";
    }
  }

  export default ProspectionError;