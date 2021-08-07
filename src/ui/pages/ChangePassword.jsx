import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import types from '../../utils/types';
import { updatePassword } from '../../services/apiService';
import { changePasswordResolver, changePasswordUpdateResolver } from '../../utils/validators';
import PageHeader from '../components/PageHeader';
import { useAuthUser } from '../../hooks/userHook';
import InputField from '../components/InputField';
import Loading from '../components/Loading';


const ChangePassword = () => {
  const { data: user } = useAuthUser();
  const history = useHistory();

  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: user && user.uses_default_password ? changePasswordResolver() : changePasswordUpdateResolver(),
  });

  const mutation = useMutation(data =>
    updatePassword({ isUpdate: user?.uses_default_password ? false : true, url: `/auth/change-password`, data }));

  const submitForm = async (data) => {
    mutation.mutate(data, {
      onSuccess: (savedUser) => {
        queryClient.setQueryData(types.USER, savedUser);
        reset();
        toast.success('Password changed successfully');
        history.push('/profile');
      },
      onError: (error) => {
        setError(error.response?.data?.detail[0],
          { type: 'manual', message: error.response?.data?.detail[1] },
        );
      }
    });
  };

  const closeHandler = () => {
    history.push('/profile');
  }

  return (
    <>
      <ToastContainer />
      <PageHeader
        title='Change Password'
        buttonTitle={user && !user.uses_default_password ? "Close" : undefined}
        isCloseButton={user && !user.uses_default_password}
        onClick={closeHandler}
      />
      <div className="row">
        <div className="col-md-6">
          <Form onSubmit={handleSubmit(submitForm)}>

            {user && !user.uses_default_password && <InputField
              form={Form}
              type="password"
              name="old_password"
              label="Old Password"
              register={register}
              required={true}
              error={errors.old_password}
            />}

            <InputField
              form={Form}
              type="password"
              name="password"
              label="Password"
              register={register}
              required={true}
              error={errors.password}
            />

            <InputField
              form={Form}
              type="password"
              name="password_confirmation"
              label="Confirm Password"
              register={register}
              required={true}
              error={errors.password_confirmation}
            />

            <div className="submit-section">
              <Button className="submit-btn" type="submit">
                Save
                {mutation.isLoading && <Loading />}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;