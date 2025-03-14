import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(); // Criando o contexto

export const AppProvider = ({ children }) => {
 
    const [transactions, setTransactions] = useState(() => {
      const savedTransactions = localStorage.getItem("transactions");
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    });
  
    
    useEffect(() => {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);
        

    return (
        <AppContext.Provider value={{ transactions, setTransactions }}>
            {children}
        </AppContext.Provider>
    );
};
