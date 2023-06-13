import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function update() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [oldName, setOldName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [descrip, setDescrip] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [price, setPrice] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pimage, setPimage] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pImagURL, setPImageURL] = useState('');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [okStatus, setOkStatus] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = window.location.href;
    const slug = url.substring(url.lastIndexOf('/') + 1);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axios.get('https://my-simple-crud-hlan.vercel.app/owner/' + slug).then((response) => {
            setName(response.data[0].name);
            setOldName(response.data[0].name);
            setDescrip(response.data[0].description);
            setPrice(response.data[0].price);
            setPImageURL(response.data[0].photoURL);
        });
        // Thực hiện các hành động khi component được tạo ra hoặc được cập nhật
    }, []);

    function handleUpdate() {
        handleClose();
        var newProductObject = {
            name: name,
            owner: localStorage.getItem('userMail'),
            description: descrip,
            price: price,
            photoURL: pImagURL,
        };
        axios
            .put('https://my-simple-crud-hlan.vercel.app/owner/update/' + slug, newProductObject)
            .then((response) => this.setState({ updatedAt: response.data.updatedAt }))
            .catch((error) => {
                console.error('There was an error!', error);
            });
        window.location.href = '/home';
    }
    return (
        <div>
            <h3 mb-4>Thay đổi thông tin của sản phẩm {oldName}</h3>
            <form mt-4>
                <div class="form-group mb-8">
                    <label for="formGroupExampleInput">Tên sản phẩm</label>
                    <input
                        value={name}
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div class="form-group mb-4">
                    <label for="formGroupExampleInput2">Mô tả sản phẩm</label>
                    <input
                        value={descrip}
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput2"
                        placeholder=""
                        onChange={(e) => setDescrip(e.target.value)}
                    />
                </div>
                <div class="form-group mb-4">
                    <label for="formGroupExampleInput2">Giá sản phẩm</label>
                    <input
                        value={price}
                        type="number"
                        id="typeNumber"
                        class="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                {/* <div class="form-group mb-4">
                    <label className="mb-4" for="formGroupExampleInput2">
                        Ảnh sản phẩm
                    </label>
                    <br />
                    <label class="custom-file-label" for="customFile">
                        Choose file
                    </label>
                    <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        accept=".jpeg,.jpg,.png"
                        onChange={(e) => {
                            setPimage(e.target.files[0]);
                            console.log(e.target.files[0]);
                        }}
                    />
                </div> */}
                <div class="form-group mb-4">
                    <p>Lưu ý, chúng tôi chưa hỗ trợ chức năng thay đổi ảnh sản phẩm !!!</p>
                </div>
            </form>
            <div className="row justify-content-between">
                <Link to={'/home'} class="col-3">
                    <Button type="button" variant="primary" onClick={handleShow}>
                        Hủy bỏ mọi thay đổi
                    </Button>
                </Link>
                <Link class="col-3">
                    <Button type="button" variant="success" onClick={handleShow}>
                        Thay đổi thông tin
                    </Button>
                </Link>
            </div>
            <p className="text-danger">{message}</p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Thông tin mới của sản phẩm :<br />
                        Tên sản phẩm : {name}
                        <br />
                        Mô tả sản phẩm : {descrip}
                        <br />
                        Giá sản phẩm : {price}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Xác nhận thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default update;
