import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ThemeToggle from "../components/ThemeToggle";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];

const Charts = () => {
  const { transactions } = useContext(AppContext); // Pegando as transações do contexto

  
const expenses = transactions.filter((t) => t.type === "expense");


const descriptionTotals = expenses.reduce((acc, transaction) => {
  acc[transaction.description] = (acc[transaction.description] || 0) + Math.abs(transaction.amount);
  return acc;
}, {});


const pieChartData = Object.keys(descriptionTotals).map((description) => ({
  name: description, 
  value: descriptionTotals[description],
}));

  
  const incomeExpenseByMonth = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("pt-BR", { month: "long" });

    if (!acc[month]) {
      acc[month] = { name: month, income: 0, expense: 0 };
    }

    if (transaction.type === "income") {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expense += Math.abs(transaction.amount);
    }
    
    return acc;
  }, {});

  const barChartData = Object.values(incomeExpenseByMonth);

  return (
    <div className="flex flex-col items-center p-6 dark:bg-gray-900 ">
      <div className="w-full flex justify-between items-center bg-white dark:bg-gray-800 text-green-800 dark:text-green-500 p-4 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">Análise de Gastos</h2>
        <nav className="flex items-center gap-4">
          <Link to="/">Voltar à página inicial</Link>
          <ThemeToggle />
        </nav>
      </div>

      {/* Gráfico de Pizza - Distribuição dos Gastos */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-white mt-12">
        <h3 className="text-xl font-semibold text-center mb-4">Gastos por Categoria</h3>
        {pieChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
              data={pieChartData} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={100} 
              label={({ name, value }) => `${name}: R$${value}`}
              >
                {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`R$${value}`, name]} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center">Nenhuma despesa registrada.</p>
        )}
      </div>

      {/* Gráfico de Barras - Comparação de Receita vs Despesas */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
        <h3 className="text-xl font-semibold text-center mb-4">Receitas vs Despesas</h3>
        {barChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4CAF50" name="Receita" />
              <Bar dataKey="expense" fill="#FF6384" name="Despesa" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center">Nenhum dado disponível.</p>
        )}
      </div>
    </div>
  );
};

export default Charts;