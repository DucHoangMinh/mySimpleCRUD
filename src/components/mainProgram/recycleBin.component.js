import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from '../../scss/home.module.scss';
import { Button } from 'react-bootstrap';
import { storage } from '../../firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
function recycleBin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userData, setUserData] = useState([]);
    const userMail = localStorage.getItem('userMail');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(function () {
        axios
            .get(`https://my-simple-crud-hlan.vercel.app/userdata/trash/${userMail}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    function handleRestore(slug) {
        axios.put(`https://my-simple-crud-hlan.vercel.app/userdata/trash/restore/` + slug, { onGarbage: false });
        setTimeout(function () {
            window.location.href = '/home/trash';
        }, 500);
    }
    function handleDeleteParmanent(slug, photoURL) {
        axios.delete(`https://my-simple-crud-hlan.vercel.app/userdata/trash/delete/` + slug);
        // console.log(photoURL);
        const desertRef = ref(storage, 'gs://my-simple-crud-f5b5c.appspot.com/files/_MG_9519.JPG');
        deleteObject(desertRef)
            .then(() => {
                // File deleted successfully
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
            });
        setTimeout(function () {
            window.location.href = '/home/trash';
        }, 800);
    }
    return (
        <div>
            <h2 className="mt-4 mb-5" style={{ textAlign: 'center' }}>
                Danh sách sản phẩm trong thùng rác của bạn{' '}
            </h2>
            <div class="row">
                {userData.map(function (data) {
                    return (
                        <div class="col-lg-3 mb-4" key={data.name}>
                            <div class={`card`} id="_card">
                                <img src={data.photoURL} alt="Ảnh bị lỗi" class={style['card-img']} />
                                <div class="card-body">
                                    <h5 class={style['card-title']}>{data.name}</h5>
                                    <p class={style['card-text']}>{data.description}</p>
                                    <p class={style['card-price']}>Giá : {data.price} vnđ</p>
                                    <div className="row justify-content-between">
                                        <Link
                                            onClick={() => handleRestore(data.slug)}
                                            class="btn btn-outline-success btn-sm mb-4"
                                        >
                                            Hoàn tác
                                        </Link>
                                        <Button
                                            class="btn btn-outline-warning"
                                            onClick={() => handleDeleteParmanent(data.slug, data.photoURL)}
                                        >
                                            Xóa vĩnh viễn
                                        </Button>
                                    </div>
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
            </div>
        </div>
    );
}
export default recycleBin;
