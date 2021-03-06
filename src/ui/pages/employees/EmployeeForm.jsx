import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import types from '../../../utils/types';
import { createEmployeeResolver, updateEmployeeResolver } from '../../../utils/validators';
import { useFetchQuery } from '../../../hooks/useApi';
import { saveData } from '../../../services/apiService';
import InputField from '../../components/InputField';
import SelectInput from '../../components/SelectInput';


const EmployeeForm = ({ user, isOpen, closeModal }) => {
  const queryClient = useQueryClient();
  const [resetPassword, setResetPassword] = useState(false);

  const { data: departments } = useFetchQuery({ key: types.DEPARTMENTS, url: '/departments/' });
  const { data: roles } = useFetchQuery({ key: types.ROLES, url: '/auth/roles' });

  const { register, handleSubmit, errors, setError, reset } = useForm({
    resolver: user?.name ? updateEmployeeResolver() : createEmployeeResolver(),
  });

  const mutation = useMutation(data => saveData({ id: user?.id, url: '/users', data }));

  const submitForm = async (data) => {
    mutation.mutate(data, {
      onSuccess: (newUser) => {
        if (user?.id) {
          queryClient.invalidateQueries(types.EMPLOYEES);
        } else {
          queryClient.setQueryData(types.EMPLOYEES, old => [...old, newUser]);
        }
        reset();
        closeModal('Employee was saved successfully');
      },
      onError: (error) => {
        setError("username",
          { type: 'manual', message: 'Duplicate entry for username' },
        );
      }
    });
  }

  const resetAndClose = () => {
    if (resetPassword) {
      setResetPassword(false);
    }

    closeModal();
  }

  return (
    <>
      <Modal
        animation={false}
        show={isOpen}
        onHide={resetAndClose}
        backdrop="static"
        size="lg"
        keyboard={false}
        className="custom-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{user?.id ? 'Edit' : 'Add'} Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            <div className="row">
              <div className="col-sm-7">
                <InputField
                  form={Form}
                  type="text"
                  name="name"
                  label="Name"
                  register={register}
                  required={true}
                  value={user?.name}
                  error={errors.name}
                />
              </div>
              <div className="col-sm-5">
                <SelectInput
                  form={Form}
                  type="text"
                  name="role"
                  label="Role"
                  required={true}
                  itemsList={roles}
                  register={register}
                  value={user?.role}
                  error={errors.role}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <InputField
                  form={Form}
                  type="text"
                  name="username"
                  label="Username"
                  register={register}
                  required={true}
                  isDisabled={!!(user && user?.username)}
                  value={user?.username}
                  error={errors.username}
                />
              </div>
              <div className="col-sm-6">
                <InputField
                  form={Form}
                  type="email"
                  name="email"
                  label="Email"
                  register={register}
                  required={true}
                  value={user?.email}
                  error={errors.email}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                {!user?.id
                  ? <InputField
                    form={Form}
                    type="text"
                    name="password"
                    label="Password"
                    register={register}
                    required={true}
                    value={user?.password}
                    error={errors.password}
                  />
                  : <>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                  <Form.Control type="text" name="password" ref={register} disabled={!resetPassword} />
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setResetPassword(!resetPassword)}>
                          { !resetPassword ? 'Reset' : 'Cancel'}
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </>
                }
              </div>
              <div className="col-sm-6">
                <SelectInput
                  form={Form}
                  type="text"
                  name="department_id"
                  label="Department"
                  itemsList={departments}
                  register={register}
                  valueKey="id"
                  valueName="name"
                  value={user?.department?.id || user?.department_id}
                  error={errors.department_id}
                />
              </div>
            </div>
            <div className="submit-section">
              <Button className="submit-btn" type="submit">Save Employee</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmployeeForm;