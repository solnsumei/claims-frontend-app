import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { Modal, Button, Form } from 'react-bootstrap';
import types from '../../../utils/types';
import { projectResolver } from '../../../utils/validators';
import { useFetchQuery } from '../../../hooks/useApi';
import { saveData } from '../../../services/apiService';
import InputField from '../../components/InputField';
import SelectInput from '../../components/SelectInput';
import Loading from '../../components/Loading';


const ProjectForm = ({ project, isOpen, closeModal }) => {
  const queryClient = useQueryClient();

  const { data: departments } = useFetchQuery({ key: types.DEPARTMENTS, url: '/departments/' });
  const { data: users } = useFetchQuery({ key: types.EMPLOYEES, url: '/users/' });

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: projectResolver(),
  });

  const mutation = useMutation((data) => saveData({ id: project?.id, url: '/projects', data }));

  const submitForm = async (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(types.PROJECTS);
        reset();
        closeModal('Project saved successfully');
      },
      onError: (error) => {
        setError("code",
          { type: 'manual', message: 'Project with the code already exists' },
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
        size="lg"
        keyboard={false}
        className="custom-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{project?.id ? 'Edit' : 'Add'} Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            <div className="row">
              <div className="col-sm-8">
                <InputField
                  form={Form}
                  type="text"
                  name="name"
                  label="Name"
                  register={register}
                  required={true}
                  value={project?.name}
                  error={errors.name}
                />
              </div>
              <div className="col-sm-4">
                <InputField
                  form={Form}
                  type="text"
                  name="code"
                  label="Code"
                  register={register}
                  required={true}
                  isDisabled={!!(project && project?.code)}
                  value={project?.code}
                  error={errors.code}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <SelectInput
                  form={Form}
                  type="text"
                  name="manager_id"
                  label="Manager"
                  itemsList={users}
                  register={register}
                  required={true}
                  valueKey="id"
                  valueName="name"
                  value={project?.manager?.id || project?.manager_id}
                  error={errors.manager_id}
                />
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
                  value={project?.department?.id || project?.department_id}
                  error={errors.department_id}
                />
              </div>
            </div>
            <InputField
              form={Form}
              type="textarea"
              name="description"
              label="Description"
              register={register}
              required={true}
              value={project?.description}
              error={errors.description}
            />
            <div className="row">
              <div className="col-sm-6">
                <InputField
                  form={Form}
                  type="number"
                  name="budget"
                  label="Budget"
                  register={register}
                  required={true}
                  value={project?.budget}
                  error={errors.budget}
                />
              </div>
              <div className="col-sm-6">
                <InputField
                  form={Form}
                  type="number"
                  name="duration"
                  label="Duration (Months)"
                  register={register}
                  required={true}
                  value={project?.duration}
                  error={errors.duration}
                />
              </div>
            </div>
            <div className="submit-section">
              <Button className="submit-btn" type="submit">Save Project
                {mutation.isLoading && <Loading />}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProjectForm;