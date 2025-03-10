import { Link } from 'react-router-dom'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ThemeToggle from "../components/ThemeToggle";


const data = [
    { category: "Aluguel", value: 1500 },
    { category: "Alimentação", value: 300 },
    { category: "Transporte", value: 300 },
    { category: "Lazer", value: 500 },
    { category: "Outros", value: 400 },
];

const incomeExpenseData = [
    { name: "Janeiro", income: 5000, expense: 2500 },
    { name: "Fevereiro", income: 4800, expense: 2200 },
    { name: "Março", income: 5100, expense: 2600 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];

const Charts = () => {
    return (

        <div className="flex flex-col items-center p-6 dark:bg-gray-900 ">
          <div className='w-full flex justify-between items-center bg-white dark:bg-gray-800 text-green-800 dark:text-green-500 p-4 shadow-md rounded-lg'>
          <h2 className="text-2xl font-bold mb-6">Análise de Gastos</h2>
        <nav className='flex items-center gap-4'>
          <Link to="/"> Voltar a página inicial
          </Link>
          <ThemeToggle />
        </nav>
          </div>
            

            {/* Gráfico de Pizza - Distribuição dos Gastos */}
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-white mt-12">
                <h3 className="text-xl font-semibold text-center mb-4">Gastos por Categoria</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico de Barras - Comparação de Receita vs Despesas */}
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
                <h3 className="text-xl font-semibold text-center mb-4">Receitas vs Despesas</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={incomeExpenseData}>
                        <XAxis dataKey="name"  
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#4CAF50" name="Receita" />
                        <Bar dataKey="expense" fill="#FF6384" name="Despesa" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;


