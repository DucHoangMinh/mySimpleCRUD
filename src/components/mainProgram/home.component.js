import { Link } from "react-router-dom"
function home(){
    return <div>
    <nav class="bg-dark navbar-dark">
        <div class="container">
            <a href="" class="navbar-brand"><i class="fas fa-tree mr-2"></i>Forest</a>
        </div>
    </nav>
    <section id="header" class="jumbotron text-center">
        <h1 class="display-3">FOREST</h1>
        <p class="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    </section>
    
    <section id="gallery">
    <div class="container">
        <div class="row">
        <div class="col-lg-4 mb-4">
        <div class="card">
            <img src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt="" class="card-img-top"/>
        <div class="card-body">
            <h5 class="card-title">Sunset</h5>
            <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut eum similique repellat a laborum, rerum voluptates ipsam eos quo tempore iusto dolore modi dolorum in pariatur. Incidunt repellendus praesentium quae!</p>
            <a href="" class="btn btn-outline-success btn-sm">Chỉnh sửa</a>
            <a href="" class="btn btn-outline-success btn-sm">Xóa</a>
        </div>
        </div>
        </div>

        <Link to={'/add'}></Link>
        <button class="col-lg-4 mb-4 bg-secondary">
            <i class="bi bi-file-earmark-plus"></i>
        </button>
    </div>
    </div>
    </section>

    </div>
}
export default home