function add() {
    return <div>
        {/* <form>
        <div class="form-group mb-4">
            <label for="formGroupExampleInput">Tên sản phẩm</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder=""/>
        </div>
        <div class="form-group mb-4">
            <label for="formGroupExampleInput2">Mô tả sản phẩm</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder=""/>
        </div>
        <div class="form-group mb-4">
            <label for="formGroupExampleInput2">Giá sản phẩm</label>
            <input type="number" id="typeNumber" class="form-control" />
        </div>
        <div class="form-group mb-4">
            <label className="mb-4" for="formGroupExampleInput2">Ảnh sản phẩm</label>
            <br/>
            <label class="custom-file-label" for="customFile">Choose file</label>
            <input type="file" class="custom-file-input" id="customFile"/>
        </div>
        </form> */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal@
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
}
export default add