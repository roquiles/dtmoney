import axios from "axios";

// Criando uma instancia do axios, para conseguirmos configurar algumas informações que serão usadas em todas as requisições
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
