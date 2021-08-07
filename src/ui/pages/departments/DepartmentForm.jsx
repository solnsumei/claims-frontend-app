import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Modal, Button, Form } from 'react-bootstrap';
import types from '../../../utils/types';
import { departmentResolver } from '../../../utils/validators';
import { saveData } from '../../../services/apiService';
import Loading from '../../components/Loading';


const DepartmentForm = ({ department, isOpen, closeModal, queryClient }) => {

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: departmentResolver(),
  });

  const mutation = useMutation((data) => saveData({ id: department?.id, url: '/departments', data }));

  const submitForm = async (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(types.DEPARTMENTS);
        reset();
        closeModal("Department saved successfully");
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
          <Modal.Title>{ department?.id ? 'Edit' : 'Add'} Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" onSubmit={handleSubmit(submitForm)}>
            <Form.Group controlId="department-name">
              <Form.Label>Department Name <span className="text-danger">*</span></Form.Label>
              <Form.Control type="text" {...register('name')} defaultValue={department?.name} />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </Form.Group>
            <div className="submit-section">
              <Button className="submit-btn" type="submit">Submit
                {mutation.isLoading && <Loading />}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DepartmentForm;