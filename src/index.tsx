import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  // Usando banco de dados do MirageJs
  models: {
    transaction: Model,
  },

  // Criando dados iniciais para o banco de dados
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Desenvolvimento de website",
          value: 5000,
          type: "deposit",
          category: "Prestação de serviços",
          createdAt: new Date(),
        },
        {
          id: 2,
          title: "Aluguel apartamento",
          value: 2500,
          type: "withdraw",
          category: "Aluguel",
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction"); // retornará todas as transaction criadas
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      // Schema é o banco de dados criado ali em cima
      return schema.create("transaction", data); // transaction é o modelo de dado que estamos enviando, e data é o dado em si
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
