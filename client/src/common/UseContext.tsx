import React, { createContext, useContext, useState } from 'react';

// 为 Context 提供一个默认值
interface DataContextType {
  data: {
    name: string;
    region: string;
    description: string;
  };
  setData: React.Dispatch<React.SetStateAction<{
    name: string;
    region: string;
    description: string;
  }>>;
}

const DataContext = createContext<DataContextType>({
  data: { name: '', region: '', description: '' },
  setData: () => {},
});

// 为 children 提供类型
interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState({ name: '', region: '', description: '' });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);