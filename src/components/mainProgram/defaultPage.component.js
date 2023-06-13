import { Link } from 'react-router-dom';
import style from '../../scss/defaultPage.module.scss';
function autoRoute() {
    if (localStorage.getItem('userMail') !== null) {
        window.location.href = '/home';
    } else {
        return (
            <div className={style.defaultWrapper}>
                <h3>
                    Vui lòng{' '}
                    <Link className={style.link} to={'/login'}>
                        đăng nhập
                    </Link>{' '}
                    /{' '}
                    <Link className={style.link} to={'/register'}>
                        đăng ký
                    </Link>{' '}
                    để sử dụng ứng dụng
                </h3>
            </div>
        );
    }
}
export default autoRoute;
