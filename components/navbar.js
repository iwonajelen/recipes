import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';

const HeaderNavbar = () => {  
    const [ session, loading ] = useSession();
    console.log(session)

    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
            <Link href="/"><a className="nav-link">Home</a></Link>
            <Link href="/recipes"><a className="nav-link">Recipes</a></Link>
            </Nav>
            {!session && <Button onClick={signIn}>Sign in</Button>}
            {session && session.user.name && <>
                <Navbar.Text style={{marginRight: '20px'}}>
                    {session.user.name}
                </Navbar.Text>
                <Button variant="secondary" onClick={signOut}>Sign out</Button>
            </>}
        </Navbar>
    );
}
export default HeaderNavbar;