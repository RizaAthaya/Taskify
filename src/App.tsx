import "./App.css";
import { ReactQueryProvider } from "./libs/react-query/react-query-provider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import AlertProvider from "./context/alert/provider";
import { UserProvider } from "./context/user/provider";

function App() {
  return (
    <ReactQueryProvider>
      <AlertProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AlertProvider>
    </ReactQueryProvider>
  );
}

export default App;
