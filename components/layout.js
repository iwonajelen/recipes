import Head from 'next/head';
import HeaderNavbar from './navbar';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { Spinner, Row, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';

const Layout = (props) => {
    const [ session, loading ] = useSession();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !session) {
            signIn();
        } else if(router.pathname == '/'){
            router.push('/recipes')
        }
    });

    return(
        <div>
            <Head>
                <title>Recipes</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            </Head>
            {(loading && router.pathname == '/') ? 
            <Container className="min-vh-100">
                <Row className="min-vh-100 justify-content-center align-items-center">
                    <Spinner variant="secondary" animation="border" role="status" style={{margin: 'auto', width: '200px', height: '200px', borderWidth: '1em'}}/>
                </Row>
            </Container>
            : <><HeaderNavbar />
            <Container fluid className="mt-3">
                {props.children}
            </Container></> }
        </div>
    );
}
export default Layout;