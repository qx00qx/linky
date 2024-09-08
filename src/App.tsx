import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/router'
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@redux/store';

const App = () => {
    return <Provider store={store}>
                <PersistGate loading={<div>Loading.....</div>} persistor={persistor}>
                        <ChakraProvider theme={theme}>
                                <RouterProvider router={router} />
                        </ChakraProvider>
                </PersistGate>
           </Provider>
}

export default App
