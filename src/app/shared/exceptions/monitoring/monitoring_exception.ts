
class MonitoringError extends Error {
    constructor(error="Não foi possível buscar o monitoramento!") {
      super(error);
      this.name = "monitoringValidation";
    }
  }

  export default MonitoringError;