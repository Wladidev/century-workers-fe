function isMailValid(str: string) {
  // La expresión regular para verificar si el string cumple con el formato de un correo electrónico válido
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  console.log('this is the mail =>', str);
  // Usamos la función match() para verificar si el string cumple con la expresión regular
  return str.match(regex) ? true : false;
}

function getItemById(array, key: string, value: any) {
  return array.filter(item => item[key] === value);
}

export {isMailValid, getItemById};
