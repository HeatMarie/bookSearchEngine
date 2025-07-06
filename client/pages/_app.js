import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/apolloClient';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
