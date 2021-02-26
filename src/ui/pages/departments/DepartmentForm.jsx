import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { Modal, Button, Form } from 'react-bootstrap';
import types from '../../../utils/types';
import { departmentResolver } from '../../../utils/validators';
import { saveData } from '../../../services/apiService';


const DepartmentForm = ({ department, isOpen, closeModal }) => {
  const { register, handleSubmit, errors, setError, reset } = useForm({
    resolver: departmentResolver(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((data) => saveData({ id: department?.id, url: '/departments', data }));

  const submitForm = async (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(types.DEPARTMENTS);
        closeModal();
        reset();
      },
      onError: (error) => {
        setError("name",
          { type: 'manual', message: 'Duplicate entry for name' },
        );
      }
    });
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
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" onSubmit={handleSubmit(submitForm)}>
            <Form.Group controlId="department-name">
              <Form.Label>Department Name <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" name="name" ref={register} defaultValue={department?.name} />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </Form.Group>
            <div className="submit-section">
              <Button className="submit-btn" type="submit">Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DepartmentForm;