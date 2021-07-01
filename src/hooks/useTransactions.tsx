import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: Date;
  }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionProviderProps){
    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
      api.get("transactions").then((response) => setTransaction(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
       const respose = await api.post('/transactions', {
           ...transactionInput,
            createdAt: new Date(),
        })
       const { transaction } = respose.data;

       setTransaction([
           ...transactions,
           transaction
       ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransaction(){
    const context = useContext(TransactionsContext);

    return context;
}