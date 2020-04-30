// Ejemplo de manipulación del processß
console.log("Process ENV");

process.env.MODE = "dev";
process.env.USERDB = "postgres";

console.log(process.env);
