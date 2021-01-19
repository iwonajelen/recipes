import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Nav, Navbar, Form, FormControl, Row, Col, Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Search } from 'react-bootstrap-icons';

const HeaderNavbar = () => {  
    const [ session, loading ] = useSession();
    const [ searchQuery, setSearchQuery] = useState("");

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const hrefObj = () => {
        return searchQuery ? { 
            pathname: '/recipes', 
            query: { search: searchQuery } 
        } : { 
            pathname: '/recipes'
        }
    }

    return(<>
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
            <Nav>
            {session && <>
            <Link href="/recipes"><a className="nav-link">Recipes</a></Link>
            <Link href="/new-recipe"><a className="nav-link">Create</a></Link></>}
            </Nav>
            {session && !isTabletOrMobile && <>
            <Form inline>
                <FormControl type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                <Link href={hrefObj()}>
                    <Button variant="success" className="ml-sm-3">Search</Button>
                </Link>
            </Form></>}
            {!session && <Button onClick={signIn}>Sign in</Button>}
            {session && session.user.name && <>
                <Navbar.Text className="d-none d-sm-block d-md-none" style={{margin: 'auto 20px'}}>
                    {session.user.name}
                </Navbar.Text>
                <Button variant="secondary" onClick={signOut}>Sign out</Button>
            </>}
        </Navbar>
        {session && isTabletOrMobile &&
        <Container className="mt-3">
        <Form inline>
            <Row>
                <Col xs={9}>
                    <FormControl type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                </Col>
                <Col xs={2}>
                    <Link href={hrefObj()}>
                        <Button variant="success"><Search/></Button>
                    </Link>
                </Col>
            </Row>
        </Form>
        </Container>}
        </>
    );
}
export default HeaderNavbar;