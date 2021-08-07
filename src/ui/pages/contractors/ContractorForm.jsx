import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import types from '../../../utils/types';
import { createContractorResolver, updateContractorResolver } from '../../../utils/validators';
import { saveData } from '../../../services/apiService';
import InputField from '../../components/InputField';
import SelectInput from '../../components/SelectInput';
import Loading from '../../components/Loading';
import { useAuth } from '../../../providers/auth';


const ContractorForm = ({ user, isOpen, closeModal }) => {
  const { isAuthenticated } = useAuth();
  const { role } = isAuthenticated();
  const queryClient = useQueryClient();
  const [resetPassword, setResetPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: user?.name ? updateContractorResolver() : createContractorResolver(),
  });

  const mutation = useMutation(data => saveData({ id: user?.id, url: '/users', data }));

  const submitForm = async (data) => {
    mutation.mutate(data, {
      onSuccess: (newUser) => {
        if (user?.id) {
          queryClient.invalidateQueries(types.CONTRACTORS);
        } else {
          queryClient.setQueryData(types.CONTRACTORS, old => [...old, newUser]);
        }
        reset();
        closeModal('Contractor was saved successfully');
      },
      onError: (error) => {
        console.log('>>>>>>', error.response?.data);
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
          <Modal.Title>{user?.id ? 'Edit' : 'Add'} Contractor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
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
            <div className="row">
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
                      <Form.Control type="text" {...register('password')} disabled={!resetPassword} />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={() => setResetPassword(!resetPassword)}>
                          {!resetPassword ? 'Reset' : 'Cancel'}
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  </>
                }
              </div>
            </div>
            {role !== types.MANAGER && <div className="row">
              <div className="col-sm-6">
                <SelectInput
                  form={Form}
                  type="text"
                  name="status"
                  label="Status"
                  itemsList={['active', 'inactive']}
                  defaultOption={false}
                  register={register}
                  value={user?.status}
                  error={errors.status}
                />
              </div>
            </div>}

            <Form.Control type="hidden" {...register('role')} value="Contractor" />

            <div className="submit-section">
              <Button className="submit-btn" type="submit">Save Contractor
              {mutation.isLoading && <Loading />}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ContractorForm;