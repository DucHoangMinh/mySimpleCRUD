import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from '../../scss/home.module.scss';
import { Button } from 'react-bootstrap';
import { storage } from '../../firebase';
function recycleBin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userData, setUserData] = useState([]);
    const userMail = localStorage.getItem('userMail');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(function () {
        axios
            .get(`http://localhost:4000/userdata/trash/${userMail}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    function handleRestore() {}
    function handleDeleteParmanent(slug, photoURL) {
        axios.delete(`http://localhost:4000/userdata/trash/delete/` + slug);
        window.location.href = '/home/trash';
        // console.log(photoURL);
        // let pictureRef = storage.refFromURL(
        //     'gs://my-simple-crud-f5b5c.appspot.com/o/files%2Fan-nut-nho-tha-giac-mo.jpg',
        // );
        // pictureRef
        //     .delete()
        //     .then(() => {
        //         //3.
        //         // setImages(allImages.filter((image) => image !== url));
        //         alert('Picture is deleted successfully!');
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }
    return (
        <div>
            <h1>Danh sách sản phẩm trong thùng rác của bạn </h1>
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
                                        <Link onClick={handleRestore} class="btn btn-outline-success btn-sm mb-4">
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
