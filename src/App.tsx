import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FormDndProvider } from './context/DndContext';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <FormDndProvider>
        <AppRoutes />
      </FormDndProvider>
    </Provider>
  );
};

export default App;