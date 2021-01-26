import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Button, Nav, NavDropdown, Navbar, Form, FormControl, Row, Col, Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Search } from 'react-bootstrap-icons';
import { useRouter } from 'next/router';

const HeaderNavbar = () => {  
    const [ session, loading ] = useSession();
    const router = useRouter();
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="d-flex justify-content-between">
            {session && session.user.name && isTabletOrMobile && <>
                <Button variant="secondary" onClick={signOut}>Sign out</Button>
            </>}
            {session && !isTabletOrMobile && <>
            <Nav>
            <Link href="/recipes"><a className="nav-link">Recipes</a></Link>
            <Link href="/new-recipe"><a className="nav-link">Create</a></Link>
            <Link href="/shopping-list"><a className="nav-link">Shopping list</a></Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                <Link href={hrefObj()}>
                    <Button variant="success" className="ml-sm-3">Search</Button>
                </Link>
            </Form></>}
            {session && isTabletOrMobile && <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Link href="/recipes"><a className="nav-link text-center">Recipes</a></Link>
                    <Link href="/new-recipe"><a className="nav-link text-center">Create</a></Link>
                    <Link href="/shopping-list"><a className="nav-link text-center">Shopping list</a></Link>
                </Nav>
            </Navbar.Collapse></>}
            {!session && <Button className="ml-auto" onClick={signIn}>Sign in</Button>}
            {session && session.user.name && !isTabletOrMobile && <>
                <Navbar.Text className="d-none d-sm-block d-md-none" style={{margin: 'auto 20px'}}>
                    {session.user.name}
                </Navbar.Text>
                <Button variant="secondary" onClick={signOut}>Sign out</Button>
            </>}
        </Navbar>
        {session && isTabletOrMobile && router.pathname === '/recipes' &&
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