import { Link } from 'react-router-dom'
import './index.css';
import Charts from "./pages/Charts"
import Transactions from "./pages/Transactions"
import ThemeToggle from './components/ThemeToggle'
import { AppContext } from './context/AppContext';

function App() {
  return (

      <div className='w-full dark:bg-gray-800'>
        <header className='w-full flex justify-between items-center bg-white dark:bg-gray-700 text-green-800 dark:text-green-500 p-4 shadow-md'>
          <h1 className='text-2xl font-extrabold'>Controle Financeiro</h1>
          <nav className='flex items-center gap-4'>
            <Link
            to="/charts"
            className='bg-white dark:bg-gray-600 text-green-600 dark:text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition'>
            📊 Ver Gráficos
            </Link>
            <ThemeToggle />
          </nav>
        </header>
        <main className='p-6'>
          <div className='grid grid-cols-1 gap-6 w-full'>
            <div className='p-6 rounded-lg shadow-md w-full'>
              <Transactions/>
            </div>
          </div>
        </main>
      </div>

  );
}

export default App;