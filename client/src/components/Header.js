import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavLink, NavItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';


function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    Xổ Số VIP
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink to={"/"}>
                                Trang Chủ
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown inNavbar nav>
                            <DropdownToggle
                                caret
                                nav
                            >
                                Tỉnh Thành
                            </DropdownToggle>
                            <DropdownMenu end>
                                <Link className='link' to={'/region/north'}>
                                    <DropdownItem>
                                        Miền Bắc
                                    </DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <Link className='link' to={'/region/central'}>
                                    <DropdownItem>
                                        Miền Trung
                                    </DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <Link className='link' to={'/region/south'}>
                                    <DropdownItem>
                                        Miền Nam
                                    </DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <NavItem>
                            <NavLink href="/search-lottery">
                                Dò vé
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink href="">
                                Lịch sử dò vé
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">
                                Quản lý User
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <Link to={"/lottery-manager"} >
                                Quản lý Vé dò
                            </Link>
                        </NavItem>
                    </Nav>
                    <div className="me-0 d-flex justify-content-center">
                        <Link to={'/signup'}>
                            <Button className='me-2' color="primary">
                                Đăng ký
                            </Button>
                        </Link>

                        <Link to={'/login'}>
                            <Button color="primary">
                                Đăng nhập
                            </Button>
                        </Link>

                    </div>
                </Collapse>



            </Navbar>
        </div>
    )
}

export default Header;