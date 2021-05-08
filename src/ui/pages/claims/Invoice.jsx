import { Modal } from 'react-bootstrap';


const Invoice = ({ invoiceUrl, closeModal }) => {
  const googleDocUrl = "https://docs.google.com/gview?url=";

  const fileExtension = invoiceUrl.split('.').pop();

  return (
    <>
      <Modal
        animation={false}
        show={true}
        onHide={closeModal}
        backdrop="static"
        size="lg"
        keyboard={false}
        className="custom-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice / Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe src={fileExtension.includes('doc')
            ? `${googleDocUrl}${invoiceUrl}&embedded=true`
            : invoiceUrl } title="Claim Invoice" width="100%" height="650"></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Invoice;