import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Form } from 'react-bootstrap';
import types from '../../../utils/types';
import { claimResolver, claimFileResolver, claimOcrFileResolver } from '../../../utils/validators';
import { saveData, uploadFile } from '../../../services/apiService';
import { toServerDate } from '../../../utils/dateHelpers';
import { useFetchQuery } from '../../../hooks/useApi';
import { useAuthUser } from '../../../hooks/userHook';
import { defaultDateValue } from '../../../utils/dateHelpers';
import PageHeader from '../../components/PageHeader';
import SelectInput from '../../components/SelectInput';
import InputField from '../../components/InputField';
import DateField from '../../components/DateField';
import Loading from '../../components/Loading';


const CreateClaim = () => {
  const [ocrResult, setOcrResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: user } = useAuthUser();
  const { data: projects } = useFetchQuery({ key: types.MY_PROJECTS, url: '/user/projects' });


  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: !id ? claimResolver() : claimFileResolver(),
  });

  const mutation = useMutation(data => {
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
        history.push(`/claims?q=saved`);
      },
      onError: (error) => {
        console.log(error.response.data);
        setError("fileError",
          { type: 'manual', message: 'File could not be uploaded at this time' },
        );
      }
    });
  }

  /* OCR file upload data */
  const { register: reg, handleSubmit: submitOcr, formState: { errors: ocrErrors }, setError: setOCRError } = useForm({
    resolver: claimOcrFileResolver(),
  });

  const uploadOCRData = async data => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    try {
      setLoading(true);
      const response = await axios.post('https://api.ocr.space/parse/image',
        formData, {headers: {'apikey': 'dfb8ca669b88957 '}}
      );
      setLoading(false);

      // console.log(response.data);

      const parsedResult = response.data['ParsedResults'];
      if(parsedResult) {
        setOcrResult(parsedResult[0].ParsedText);
      }

    } catch (error) {
      setOCRError("ocrFile",
        { type: 'manual', message: 'File may be too large to read, upload a smaller file size.' },
      );
    }
  }

  return (
    <>
      <PageHeader
        title="New Claim"
        buttonTitle={id ? undefined : "Close"}
        isCloseButton={true}
        onClick={() => {
          history.replace("/claims");
        }}
      />
      <div className="row">
        <div className="col-sm-12">
          {!id && <Form onSubmit={handleSubmit(submitForm)}>
            <div className="row">
              <div className="col-sm-6 col-md-6">
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

              <div className="col-sm-6 col-md-6">
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

              </div>
              
              <div className="row">
                <div className={user && user.role !== "Admin" ? "col-sm-4" : "col-sm-6"}>
                  <SelectInput
                    form={Form}
                    type="text"
                    name="project_id"
                    label="Project"
                    required={false}
                    valueKey="id"
                    valueName="name"
                    itemsList={projects}
                    register={register}
                    error={errors.project_id}
                  />
                </div>

                {user && user.role !== "Admin" && <div className={"col-sm-4 col-md-4"}>
                  <SelectInput
                    form={Form}
                    type="text"
                    name="department_id"
                    label="Department"
                    required={false}
                    valueKey="id"
                    valueName="name"
                    itemsList={user && user.department ? [user.department] : []}
                    value={user?.department?.id}
                    register={register}
                    error={errors.department_id}
                  />
                </div>}
                <div className={user && user.role !== "Admin" ? "col-sm-4" : "col-sm-6"}>
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
              <button className="btn btn-primary submit-btn">
                Proceed
                {mutation.isLoading && <Loading />}
              </button>
            </div>
          </Form>}

          {id && <Form onSubmit={handleSubmit(uploadInvoice)}>
            <div className="row">
              <div className="col-sm-8">
                <Form.File id="upload-invoice">
                  <Form.File.Label>Upload Invoice or Receipt</Form.File.Label>
                  <Form.File.Input {...register("file")} required />
                </Form.File>
                {errors && errors.file && <p className="text-danger">{errors.file.message}</p>}
              </div>
              <div className="col-sm-4">
                <button className="btn btn-primary submit-btn">Upload
                  {mutation.isLoading && <Loading />}
                </button>
              </div>
            </div>
          </Form>}

          {id && <Form onSubmit={submitOcr(uploadOCRData)}>
            <h2>&nbsp;</h2>
            <div className="row">
              <div className="col-sm-8">
                <Form.File id="upload-ocr-invoice">
                  <Form.File.Label>Upload Invoice or Receipt</Form.File.Label>
                  <Form.File.Input {...reg("file")} required />
                </Form.File>
                {ocrErrors && ocrErrors.file && <p className="text-danger">{ocrErrors.file.message}</p>}
              </div>
              <div className="col-sm-4">
                <button className="btn btn-outline-primary submit-btn">Extract OCR Data
                  {isLoading && <Loading />}
                </button>
              </div>
              {ocrResult && <div className='col-sm-12'>
                <br />
                <h3>OCR Result</h3>
                <pre>{ocrResult}</pre>
              </div>}
            </div>
          </Form>}
        </div>
      </div>
      
    </>
  );
}

export default CreateClaim;