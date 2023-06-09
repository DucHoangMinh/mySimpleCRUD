import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import axios from 'axios';
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
    const handleShow = () => okStatus && setShow(true);

    const url = window.location.href;
    const slug = url.substring(url.lastIndexOf('/') + 1);

    axios.get('http://localhost:4000/userdata/owner/' + slug).then((response) => {
        console.log(response.data);
        setName(response.data[0].name);
        setOldName(response.data[0].name);
        setDescrip(response.data[0].description);
        setPrice(response.data[0].price);
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (pimage !== null) {
            const storageRef = ref(storage, `files/${pimage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, pimage);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL);
                        setPImageURL(downloadURL);
                    });
                },
            );
        }
        if (name == '' || descrip == '') {
            setMessage('Các trường tên, mô tả không được để trống!!!');
        } else {
            setOkStatus(true);
        }
    }
    function handleAdd() {
        var newProductObject = {
            name: name,
            owner: localStorage.getItem('userMail'),
            description: descrip,
            price: price,
            photoURL: pImagURL,
        };
        axios.post('http://localhost:4000/userdata/add', newProductObject).then((res) => console.log(res.data));
        window.location.href = '/home';
    }
    return (
        <div>
            <h3>Thay đổi thông tin của sản phẩm {oldName}</h3>
            <form>
                <div class="form-group mb-4">
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
            <Button type="button" onClickCapture={handleSubmit} variant="primary" onClick={handleShow}>
                Thay đổi thông tin
            </Button>
            <p className="text-danger">{message}</p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn thêm sản phẩm {name} vào danh sách?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button onClickCapture={handleAdd} variant="primary" onClick={handleClose}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default update;
