import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Form } from 'react-bootstrap';
import types from '../../../utils/types';
import { claimResolver, claimFileResolver } from '../../../utils/validators';
import { saveData, uploadFile } from '../../../services/apiService';
import { toServerDate } from '../../../utils/dateHelpers';
import { useAuthUser } from '../../../hooks/userHook';
import { defaultDateValue } from '../../../utils/dateHelpers';
import PageHeader from '../../components/PageHeader';
import SelectInput from '../../components/SelectInput';
import InputField from '../../components/InputField';
import DateField from '../../components/DateField';


const CreateClaim = () => {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: user } = useAuthUser();

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: !id ? claimResolver() : claimFileResolver(),
  });

  const mutation = useMutation(data =>  {
    return id 
      ? uploadFile({ id, data })
      : saveData({ url: '/claims', data });
  });

  const submitForm = async data => {

    if (data.due_date !== undefined && data.due_date !== null) {
      data.due_date = toServerDate(data.due_date);
    }

    mutation.mutate(data, {
      onSuccess: (claim) => {
        history.push(`/claims/new/${claim.id}`);
      },
      onError: (error) => {
        setError("invoice_no",
          { type: 'manual', message: 'Duplicate entry for invoice number' },
        );
      }
    });
  }

  const uploadInvoice = async data => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    mutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(types.CLAIMS);
        history.push(`/claims`);
      },
      onError: (error) => {
        console.log(error.response.data);
        setError("file",
          { type: 'manual', message: 'File could not be uploaded at this time' },
        );
      }
    });
  }

  return (
    <>
      <PageHeader
        title="New Claim"
        buttonTitle={id ? undefined : "Close"}
        isCloseButton={true}
        onClick={() => {
          history.push("/claims");
        }}
      />
      <div className="row">
        <div className="col-sm-12">
          {!id && <Form onSubmit={handleSubmit(submitForm)}>
            <div className="row">
              <div className="col-sm-6 col-md-5">
                <InputField
                  form={Form}
                  type="text"
                  name="title"
                  label="Title"
                  register={register}
                  required={true}
                  error={errors.title}
                />
              </div>
              <div className="col-sm-6 col-md-3">
                <InputField
                  form={Form}
                  type="text"
                  name="invoice_no"
                  label="Invoice No."
                  register={register}
                  required={true}
                  error={errors.invoice_no}
                />
              </div>

              <div className="col-sm-6 col-md-4">
                <InputField
                  form={Form}
                  type="number"
                  name="amount"
                  label="Amount"
                  register={register}
                  required={true}
                  error={errors.amount}
                />
              </div>

              <div className="col-sm-6 col-md-4">
                <DateField
                  form={Form}
                  name="due_date"
                  label="Due Date"
                  register={register}
                  value={defaultDateValue()}
                  required={true}
                  error={errors.due_date}
                />
              </div>

              <div className="col-sm-6 col-md-4">
                <SelectInput
                  form={Form}
                  type="text"
                  name="project_id"
                  label="Project"
                  required={false}
                  valueKey="id"
                  valueName="name"
                  itemsList={user?.projects.concat(user?.managed_projects) || []}
                  register={register}
                  error={errors.project_id}
                />
              </div>

              {user && user.role !== "Admin" && <div className="col-sm-6 col-md-4">
                <SelectInput
                  form={Form}
                  type="text"
                  name="department_id"
                  label="Department"
                  required={false}
                  valueKey="id"
                  valueName="name"
                  itemsList={user && user.department && user.department.id ? [user.department] : []}
                  value={user?.department.id}
                  register={register}
                  error={errors.department_id}
                />
              </div>}
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-md-12">
                    <InputField
                      form={Form}
                      type="textarea"
                      name="description"
                      label="Description"
                      register={register}
                      required={true}
                      error={errors.description}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-section">
              <button className="btn btn-primary submit-btn">Proceed</button>
            </div>
          </Form>}

          {id && <Form onSubmit={handleSubmit(uploadInvoice)}>
            <div className="row">
              <div className="col-sm-8">
                <Form.File id="upload-invoice">
                  <Form.File.Label>Upload Invoice or Receipt</Form.File.Label>
                  <Form.File.Input ref={register} name="file" required />
                </Form.File>
                { errors && errors.file && <p className="text-danger">{errors.file.message}</p>}
              </div>
              <div className="col-sm-4">
                <button className="btn btn-primary submit-btn">Upload</button>
              </div>
            </div>
          </Form>}
        </div>
      </div>
    </>
  );
}

export default CreateClaim;