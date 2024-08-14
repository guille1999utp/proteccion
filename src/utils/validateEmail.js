const axios = require("axios");
require("dotenv").config();

const ValidateEmail = async (correo) => {
  try {
    const urlValidate = `https://api.listclean.xyz/v1/verify/email/${correo}`;

    const headers = {
      "X-Auth-Token": process.env.KEY_ACCESS_TOKEN_EMAIL,
    };

    const response = await axios.get(urlValidate, { headers });

    // Manejar la respuesta de la API según tus necesidades
    if (response.status === 200) {
      // La petición fue exitosa, puedes acceder a los datos en response.data
      return response.data;
    } else {
      // La API respondió con un código de estado diferente a 200, maneja según tu lógica
      console.error(`Error en la petición: ${response.status}`);
      return null;
    }
  } catch (error) {
    // Manejar errores durante la petición
    console.error(`Error en la petición: ${error.message}`);
    return null;
  }
};

module.exports = ValidateEmail;
