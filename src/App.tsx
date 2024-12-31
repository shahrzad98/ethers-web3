import { Routes } from "./routes";
import { ThemeProvider } from "states/themeContext";
import { GlobalProvider } from "states/globalContext";
import { UseWebWalletProvider } from "hooks/use-web-wallet/useWebWallet";
import { NotificationProvider } from "states/notificationContext";
import { Notification } from "./components/notification";
import QueryClientContainer from "components/QueryClientContainer";
import ErrorBoundary from "components/ErrorBoundary";

const App = () => {
    return (
        <ErrorBoundary>
            <NotificationProvider>
                <UseWebWalletProvider>
                    <QueryClientContainer>
                        <GlobalProvider>
                            <ThemeProvider>
                                <Routes />
                                <Notification />
                            </ThemeProvider>
                        </GlobalProvider>
                    </QueryClientContainer>
                </UseWebWalletProvider>
            </NotificationProvider>
        </ErrorBoundary>
    );
};

export default App;
