import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Loading from '../../components/Loading';


const ProjectUsersForm = ({
  isOpen, closeModal, availableUsers, onSave, loading 
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleSelectedItem = id => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers([...selectedUsers.filter(item => item !== id)]);
      return;
    }
    setSelectedUsers([...selectedUsers, id]);
  }

  const addTeamMembers = async () => {
    await onSave(selectedUsers, 'add');
  }

  return (
    <>
      <Modal
        animation={false}
        show={isOpen}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Team</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "scroll" }}>
          <>
            <ul className="chat-user-list">
              {availableUsers?.length && availableUsers.map(item => (
                <li key={item.id}>
                  <Form.Check className="media" type="checkbox" id={item.id}>
                    <span className="avatar"><i className="fa fa-user"></i></span>
                    <Form.Check.Label className="media-body align-self-center text-nowrap">
                      <div className="user-name">{item.name}</div>
                      <span className="designation">{item.role === 'Contractor' ? 'Contractor' : 'Employee'}</span>
                    </Form.Check.Label>
                    <div className="align-self-center">
                      <Form.Check.Input type="checkbox" onChange={() => toggleSelectedItem(item.id)}/>
                    </div>
                  </Form.Check>
                </li>
              ))}
            </ul>
          </>

          <div className="submit-section">
            <Button
              className="submit-btn"
              onClick={addTeamMembers}
              disabled={selectedUsers.length === 0}>
                Save {loading && <Loading />}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectUsersForm;