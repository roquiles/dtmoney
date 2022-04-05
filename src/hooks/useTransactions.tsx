import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  value: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsContextData {
  transactionsList: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

// Criando um contexto para a lista de transações
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider(props: TransactionsProviderProps) {
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactionsList(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactionsList([...transactionsList, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactionsList, createTransaction }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}

// Hook que criamos para evitar que tenhamos que importar 'useContext' e 'TransactionsContext' nos arquivos em que utilizaremos o contexto das transações,
// assim podemos importar somente 'useTransactions'
export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
