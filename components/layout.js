import Head from 'next/head';
import HeaderNavbar from './navbar';
import { Container } from 'react-bootstrap';

const Layout = (props) => {
    return(
        <div>
            <Head>
                <title>Recipes</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            </Head>
            <HeaderNavbar />
            <Container fluid className="mt-3">
                {props.children}
            </Container>
        </div>
    );
}
export default Layout;