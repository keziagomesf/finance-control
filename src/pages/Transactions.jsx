import Input from "../components/Input"
import { useState } from "react"

const Transactions = () => {
    const [transactions, setTransactions] = useState([
        { id: 1, type: "income", description: "Salário", category: "Entrada", amount: 5000, date: "2025-03-01" },
        { id: 2, type: "expense", description: "Aluguel", category: "Saída", amount: -1500, date: "2025-03-05" },
        { id: 3, type: "income", description: "Freelance", category: "Entrada", amount: 1200, date: "2025-03-10" },
        { id: 4, type: "expense", description: "Alimentação", category: "Saída", amount: -300, date: "2025-03-12" },
        { id: 5, type: "expense", description: "Transporte", category: "Saída", amount: -300, date: "2025-03-12" },
        { id: 6, type: "expense", description: "Lazer", category: "Saída", amount: -500, date: "2025-03-12" },
        { id: 7, type: "expense", description: "Outros", category: "Saída", amount: -400, date: "2025-03-12" },
    ]);
    
    const [type, setType] = useState("income");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const calculateValues = () => {
        const totalIncome = transactions
            .filter((transaction) => transaction.type === "income")
            .reduce((acc, transaction) => acc + transaction.amount, 0);

        const totalExpense = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0)

        const total = totalIncome + totalExpense;
        return{totalIncome, totalExpense, total}
    };

    const {totalIncome, totalExpense, total} = calculateValues();
    const handleDelete = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const transactionCategory = category || (type === "income" ? "Entrada" : "Saída");
    
        const transactionDate = date || new Date().toLocaleDateString();
    
        const newTransaction = {
          id: transactions.length + 1,
          description,
          category: transactionCategory,
          amount: type === "expense" ? -parseFloat(amount) : parseFloat(amount), 
          type,
          date: transactionDate,
        };
    
        setTransactions([...transactions, newTransaction]);
        setCategory("");
        setDescription("");
        setAmount("");
        setDate("");
        setType("income");
      };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-700 rounded-md p-6 w-full">

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold dark:text-white">Entradas</h3>
            <p className={`text 2xl mt-2 ${totalIncome >=0 ? "text-green-500" : "text-red-500"}`}>R$ {totalIncome.toFixed(2)}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold dark:text-white">Saídas</h3>
            <p className="text 2xl mt-2 text-red-500">R${totalExpense.toFixed(2)}</p>
        </div>
        
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center ${total >= 0 ? "text-green-500" : "text-red-500"}`}>
            <h3 className="text-lg font-semibold">Total</h3>
            <p className="text-2xl mt-2">R$ {total.toFixed(2)}</p>
        </div>
    </div>

    <div className="flex flex-col w-full max-w-4xl mt-6 gap-6 ">
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full">
            <header className="mb-6 text-center">
                <h1 className="text-2xl font-bold dark:text-white">Transações</h1>
            </header>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
                <div className="mb-4">
                    <label className="block text-gray-900 dark:text-gray-200 font-semibold mb-1">Nome da Transação</label>                          
                    <Input
                        type="text"
                        placeholder="Ex: Salário, Conta de Luz..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">Valor</label>                           
                    <Input
                        type="number"
                        placeholder="Ex: 100, 200.50"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 dark:text-gray-200  font-semibold mb-1">Categoria</label>
                    <select className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border-gray-200 dark:border-gray-500"
                    value={type} 
                    onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Saída</option>
                        <option value="income">Entrada</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">Data da Transação</label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="w-full p-2 mt-4 bg-green-600 dark:bg-green-800 text-white font-semibold rounded-md hover:bg-green-700 dark:hover:bg-green-900 transition">
                    Adicionar Transação
                </button>
            </form>
        </div>

        <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse border-gray-300 dark:border-gray-800 min-w-[600px]">
                        <thead>
                            <tr className="text-center bg-gray-300 dark:bg-gray-900">
                                <th className="border p-2 dark:border-gray-600 dark:text-white">Data</th>
                                <th className="border p-2 dark:border-gray-600 dark:text-white">Nome</th>
                                <th className="border p-2 dark:border-gray-600 dark:text-white">Categoria</th>
                                <th className="border p-2 dark:border-gray-600 dark:text-white">Valor</th>
                                <th className="border p-2 dark:border-gray-600 dark:text-white">Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="text-center">
                                    <td className="border p-2 dark:border-gray-600 dark:text-white dark:bg-gray-800">{transaction.date}</td>
                                    <td className="border p-2 dark:border-gray-600 dark:text-white dark:bg-gray-800">{transaction.description}</td>
                                    <td className="border p-2 dark:border-gray-600 dark:text-white dark:bg-gray-800">{transaction.category}</td>
                                    <td className={`border p-2 dark:border-gray-600 dark:bg-gray-800 ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                                    R$ {Number(transaction.amount).toFixed(2)}
                                    </td>

                                    <td className="border p-2 dark:border-gray-600 dark:bg-gray-800">
                                        <button
                                            onClick={() => handleDelete(transaction.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </div>
    </div>
</div>

    )
}

export default Transactions;