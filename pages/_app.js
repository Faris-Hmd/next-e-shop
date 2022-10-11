/** @format */
import { ThemeProvider } from "../Context/themeContext";
// import { UserProvider } from "../Context/UserProvider";
import "../styles/globals.css";
import Layout from "../comps/Layout/Layout";
import { UserProvider } from "../Context/UserProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
