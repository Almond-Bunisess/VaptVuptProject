import { useState, createContext } from 'react';

export const DataContext = createContext();

const Context = ({ children }) => {
  let [cart, setcart] = useState(null);

  return (
    <DataContext.Provider value={{ cart, setcart }}>
      {children}
    </DataContext.Provider>
  );
};

export default Context;
