import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from '../../scss/addPage.module.scss';
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
    const [pImagURL, setPImageURL] = useState(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=',
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [okStatus, setOkStatus] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () =>
        okStatus &&
        setTimeout(function () {
            setShow(true);
        }, 800);
    function handleSubmit(e) {
        console.log(pimage);
        if (pimage !== 0) {
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
        if (pname == '' || pdescrip == '') {
            setMessage('Các trường tên, mô tả không được để trống!!!');
        } else {
            setOkStatus(true);
        }
    }
    function handleAdd() {
        var newProductObject = {
            name: pname,
            owner: localStorage.getItem('userMail'),
            description: pdescrip,
            price: pprice,
            photoURL: pImagURL,
        };
        axios
            .post('https://my-simple-crud-hlan.vercel.app/userdata/add', newProductObject)
            .then((res) => console.log(res.data));
        setTimeout(function () {
            window.location.href = '/home';
        }, 1000);
    }
    return (
        <div>
            <h2 className="mb-5 mt-3" style={{ textAlign: 'center' }}>
                Thêm một sản phẩm mới vào danh sách quản lý của bạn
            </h2>
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
                    <label class="custom-file-label" for="customFile" mb-4>
                        Tải lên file ảnh sản phẩm của bạn :
                    </label>
                    <br />
                    <input
                        type="file"
                        className={style['inputFile']}
                        // id="customFile"
                        accept=".jpeg,.jpg,.png"
                        onChange={(e) => {
                            setPimage(e.target.files[0]);
                            console.log(e.target.files[0]);
                        }}
                    />
                </div>
            </form>
            <Link to="/home" class={style['toPrevious']}>
                &laquo; Về trang chủ
            </Link>
            <Button
                style={{ float: 'right' }}
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
                <Modal.Body>Bạn có chắc chắn muốn thêm sản phẩm {pname} vào danh sách?</Modal.Body>
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
export default add;
