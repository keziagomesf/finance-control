function Input(props) {
    return (
      <input
        className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border-gray-200 dark:border-gray-500"
        {...props}
      />
    );
  }
  
  export default Input;