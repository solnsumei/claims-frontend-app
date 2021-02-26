import { Modal, Form, Button } from 'react-bootstrap';


const DeleteModal = ({ title, closeModal, onDelete }) => {
  return (
    <>
      <Modal
        show={true}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom-modal"
        >
        <Modal.Body>
          <Form onSubmit={onDelete}>
            <div className="form-header">
              <h3>Delete {title}</h3>
              <p>Are you sure want to delete this {title}?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <Button className="continue-btn col-12" type="submit">Delete</Button>
                </div>
                <div className="col-6">
                  <Button onClick={closeModal} className="cancel-btn col-12">Cancel</Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;