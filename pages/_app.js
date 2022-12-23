/** @format */
import { ThemeProvider } from "../Context/themeContext";
// import { UserProvider } from "../Context/UserProvider";
import "../styles/globals.css";
import Layout from "../comps/Layout/Layout";
import { UserProvider } from "../Context/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
