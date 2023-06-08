import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import axios from 'axios';
function add() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pname, setPname] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pdescrip, setPdescrip] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pprice, setPprice] = useState(0);
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
    function handleSubmit(e) {
        e.preventDefault();
        if (pimage !== null) {
            const storageRef = ref(storage, `files/${pimage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, pimage);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    );
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            console.log(downloadURL);
                            setPImageURL(downloadURL);
                        },
                    );
                },
            );
        }
        if (pname == '' || pdescrip == '') {
            setMessage('Các trường tên, mô tả không được để trống!!!');
        } else {
            setOkStatus(true);
        }
    }
    function handleAdd() {
        var newProductObject = {
            name: pname,
            owner: localStorage.getItem('userEmail'),
            description: pdescrip,
            price: pprice,
            photoURL: pImagURL,
        };
        axios
            .post('http://localhost:4000/userdata/add', newProductObject)
            .then((res) => console.log(res.data));
    }
    return (
        <div>
            <form>
                <div class="form-group mb-4">
                    <label for="formGroupExampleInput">Tên sản phẩm</label>
                    <input
                        value={pname}
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                        onChange={(e) => setPname(e.target.value)}
                    />
                </div>
                <div class="form-group mb-4">
                    <label for="formGroupExampleInput2">Mô tả sản phẩm</label>
                    <input
                        value={pdescrip}
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput2"
                        placeholder=""
                        onChange={(e) => setPdescrip(e.target.value)}
                    />
                </div>
                <div class="form-group mb-4">
                    <label for="formGroupExampleInput2">Giá sản phẩm</label>
                    <input
                        value={pprice}
                        type="number"
                        id="typeNumber"
                        class="form-control"
                        onChange={(e) => setPprice(e.target.value)}
                    />
                </div>
                <div class="form-group mb-4">
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
                </div>
            </form>
            <Button
                type="button"
                onClickCapture={handleSubmit}
                variant="primary"
                onClick={handleShow}
            >
                Thêm vào danh sách
            </Button>
            <p className="text-danger">{message}</p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn thêm sản phẩm {pname} vào danh sách?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button
                        onClickCapture={handleAdd}
                        variant="primary"
                        onClick={handleClose}
                    >
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default add;
