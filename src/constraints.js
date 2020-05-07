const constraints = {
    nomeCompleto: {
      presence: {
        allowEmpty: false
      },
  
      type: "string"
    },
  
    CPF: {
      length: {
        minimum: 11,
        maximum: 11
      },
  
      presence: {
        allowEmpty: false
      },
  
      type: "string"
    },
  
    email: {
      email: {
        message: "^Endereço de email inválido"
      },
  
      presence: {
        allowEmpty: false
      },
  
      type: "string"
    },
  
    emailConfirmation: {
      email: {
        message: "^Endereço de email inválido"
      },
  
      equality: {
        attribute: "email",
        message: "^Endereço de email não coincidem"
      },
  
      presence: {
        allowEmpty: false
      },
  
      type: "string"
    },
  
    senha: {
      length: {
        minimum: 6
      },
  
      presence: {
        allowEmpty: false
      },
  
      type: "string"
    },
  
    senhaConfirmation: {
      equality: "senha",
  
      length: {
        minimum: 6
      },
  
      presence: {
        allowEmpty: false
      },
  
      type: "string"
    }
  };
  
  export default constraints;