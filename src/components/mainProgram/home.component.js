import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../../scss/home.module.scss';
import Modal from 'react-bootstrap/Modal';

function home() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userData, setUserData] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userInfor, setUserInfor] = useState({});
    const userMail = localStorage.getItem('userMail');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalShow, setModalShow] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [deleteTitle, setDeleteTitle] = useState('Xóa');

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
    useEffect(function () {
        axios
            .get(`https://my-simple-crud-hlan.vercel.app/userdata/${userMail}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    function handleLogOut() {
        localStorage.removeItem('userMail');
        window.location.href = '/';
    }
    function handleDelete(slug) {
        axios.put(`https://my-simple-crud-hlan.vercel.app/userdata/softdelete/` + slug, { onGarbage: true });
    }

    return (
        <div>
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container fluid>
                    <Link to={'/home'} style={{ textDecoration: 'none' }}>
                        <h4 style={{ color: '#000', fontWeight: '700' }}>TRANG CHỦ</h4>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="#action1"></Nav.Link>
                        </Nav>
                        <NavDropdown className="" title="Tài khoản" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5" onClick={handleLogOut}>
                                Đăng xuất
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section id="header" class="jumbotron text-center mb-4">
                <h1 class="display-3">Trang chủ</h1>
                <h3 class="lead">Danh sách sản phẩm của bạn</h3>
            </section>

            <section id="gallery">
                <div class="container">
                    <div class="row">
                        {userData.map(function (data) {
                            return (
                                <div class="col-lg-3 mb-4" key={data.name}>
                                    <div class={`card`} id="_card">
                                        <div style={{ minHeight: '298px' }}>
                                            <img
                                                id="cardImg"
                                                src={data.photoURL}
                                                alt="Ảnh bị lỗi"
                                                class={style['card-img']}
                                            />
                                        </div>
                                        <div class="card-body">
                                            <h5 class={style['card-title']}>{data.name}</h5>
                                            <p class={style['card-text']}>{data.description}</p>
                                            <p class={style['card-price']}>Giá : {data.price} vnđ</p>
                                            <Link
                                                to={{ pathname: `/home/update/${data.slug}`, state: `${data.name}` }}
                                                class="btn btn-outline-success btn-sm"
                                            >
                                                Chỉnh sửa
                                            </Link>
                                            <Button
                                                href="/home"
                                                class="btn btn-outline-warning"
                                                onClick={() => handleDelete(data.slug)}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                        {/* <Button
                                            className="btn-warning"
                                            onClick={handleDelete(data.slug)}
                                            hidden={!modalShow}
                                        >
                                            Xác nhận xóa
                                        </Button> */}
                                    </div>
                                </div>
                            );
                        })}
                        <Link
                            to={'/add'}
                            class={`col-lg-3 mb-4 d-flex flex-column align-items-center ${style.addButton} ${style['text-decoration-none']}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="160"
                                height="160"
                                fill="currentColor"
                                class="bi bi-cloud-plus"
                                viewBox="0 0 16 16"
                                color="#000"
                                className="col-8"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
                                />
                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                            </svg>
                            <p className={`col-8 ${style['sub-card-title']}`}>Thêm sản phẩm</p>
                        </Link>
                        <Link
                            to={'/home/trash'}
                            class={`col-lg-3 mb-4 d-flex flex-column align-items-center ${style.addButton} ${style['text-decoration-none']}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="80"
                                width="80"
                                viewBox="0 0 448 512 "
                                className="col-8"
                            >
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                            <p className={`col-8 ${style['sub-card-title']}`}>Thùng rác</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default home;
