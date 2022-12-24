/** @format */
import { ThemeProvider } from "../Context/themeContext";
import "../styles/globals.css";
import Layout from "../comps/Layout/Layout";
import { UserProvider } from "../Context/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <ReactQueryDevtools />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
