import Head from 'next/head';
import HeaderNavbar from './navbar';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Loading from './loading';

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
            {((loading || !session) && router.pathname == '/') ? 
            <Loading />
            : <><HeaderNavbar />
            <Container fluid className="mt-3 pb-3">
                {props.children}
            </Container></> }
        </div>
    );
}
export default Layout;