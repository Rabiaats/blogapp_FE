import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import { teal } from "@mui/material/colors";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#657AB8', // Yeni ana renk
      },
      secondary: {
        main: teal[50], // Teal [50] rengi
      },
      background: {
        default: '#F0FDFA', // Arka plan rengini teal [50] olarak ayarla
      },
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
