import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userData, setUserData] = useState([]);
    const userMail = localStorage.getItem('userMail');
    const getUserData = function () {
        axios
            .get(`http://localhost:4000/userdata/${userMail}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    getUserData();
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Trang chủ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="#action1"></Nav.Link>
                        </Nav>
                        <NavDropdown className="" title="Tài khoản" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section id="header" class="jumbotron text-center">
                <h1 class="display-3">FOREST</h1>
                <p class="lead">Danh sách sản phẩm của bạn</p>
            </section>

            <section id="gallery">
                <div class="container">
                    <div class="row">
                        {userData.map(function (data) {
                            return (
                                <div class="col-lg-4 mb-4" key={data.name}>
                                    <div class="card">
                                        <img src={data.photoURL} alt="Ảnh bị lỗi" class="card-img-top" />
                                        <div class="card-body">
                                            <h5 class="card-title">{data.name}</h5>
                                            <p class="card-text">{data.description}</p>
                                            <Link
                                                to={{ pathname: `/home/update/${data.slug}`, state: `${data.name}` }}
                                                class="btn btn-outline-success btn-sm"
                                            >
                                                Chỉnh sửa
                                            </Link>
                                            <a href="#" class="btn btn-outline-success btn-sm">
                                                Xóa
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <Link to={'/add'} class="col-lg-4 mb-4">
                            <h1>Thêm sản phẩm</h1>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default home;
