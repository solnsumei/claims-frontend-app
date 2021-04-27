import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { Form } from 'react-bootstrap';
import types from '../../../utils/types';
import { claimResolver } from '../../../utils/validators';
import { useFetchQuery } from '../../../hooks/useApi';
import { defaultDateValue } from '../../../utils/dateHelpers';
import PageHeader from '../../components/PageHeader';
import SelectInput from '../../components/SelectInput';
import InputField from '../../components/InputField';
import DateField from '../../components/DateField';


const CreateClaim = () => {

  const history = useHistory();

  const { register, handleSubmit, errors, setError, reset } = useForm({
    resolver: claimResolver(),
  });

  const submitForm = data => {
    console.log(data);
  }

  return (
    <>
      <PageHeader
        title="New Claim"
        buttonTitle="Close"
        isCloseButton={true}
        onClick={() => {
          history.push("/claims");
        }}
      />
      <div className="row">
        <div className="col-sm-12">
          <Form onSubmit={handleSubmit(submitForm)}>
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
                  itemsList={[]}
                  register={register}
                  error={errors.project_id}
                />
              </div>

              <div className="col-sm-6 col-md-4">
                <SelectInput
                  form={Form}
                  type="text"
                  name="department_id"
                  label="Department"
                  required={false}
                  itemsList={[]}
                  register={register}
                  error={errors.department_id}
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
              <button className="btn btn-primary submit-btn">Proceed</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CreateClaim;