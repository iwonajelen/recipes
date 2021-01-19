import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Nav, Navbar, Form, FormControl } from 'react-bootstrap';

const HeaderNavbar = () => {  
    const [ session, loading ] = useSession();
    const [ searchQuery, setSearchQuery] = useState("");

    const hrefObj = () => {
        return searchQuery ? { 
            pathname: '/recipes', 
            query: { search: searchQuery } 
        } : { 
            pathname: '/recipes'
        }
    }

    return(
        <Navbar bg="dark" variant="dark" className="justify-content-around">
            <Nav className="mr-auto">
            {session && <>
            <Link href="/recipes"><a className="nav-link">Recipes</a></Link>
            <Link href="/new-recipe"><a className="nav-link">Create</a></Link></>}
            </Nav>
            {session && <>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setSearchQuery(e.target.value)} />
                <Link href={hrefObj()}>
                    <Button variant="success">Search</Button>
                </Link>
            </Form></>}
            {!session && <Button onClick={signIn}>Sign in</Button>}
            {session && session.user.name && <>
                <Navbar.Text style={{margin: 'auto 20px'}}>
                    {session.user.name}
                </Navbar.Text>
                <Button variant="secondary" onClick={signOut}>Sign out</Button>
            </>}
        </Navbar>
    );
}
export default HeaderNavbar;