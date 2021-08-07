import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { Modal, Button, Form } from 'react-bootstrap';
import InputField from '../../components/InputField';
import DateField from '../../components/DateField';
import types from '../../../utils/types';
import { updateClaimResolver } from '../../../utils/validators';
import { defaultDateValue, toServerDate } from '../../../utils/dateHelpers';
import { updateClaim } from '../../../services/apiService';
import { nextStatus } from '../../../utils/claimHelpers';
import Loading from '../../components/Loading';


const ClaimUpdateForm = ({ claim, closeModal }) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const { status, label } = nextStatus(claim);

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
    resolver: updateClaimResolver(),
  });

  const mutation = useMutation((data) => updateClaim({ url: `/claims/${claim.id}`, data, verify: claim.status === 'Pending' }));

  const submitForm = async (data) => {
    if (!status) {
      closeModal();
      return;
    }

    data['status'] = status;

    if (data.payment_date !== undefined && data.payment_date !== null) {
      data.payment_date = toServerDate(data.payment_date);
    }

    if (data.approval_date !== undefined && data.approval_date !== null) {
      data.approval_date = toServerDate(data.approval_date);
    }
    
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries([types.CLAIMS, claim.id]);
        queryClient.invalidateQueries(types.CLAIMS);
        closeModal(`Claim ${status} successfully`);
      },
      onError: (_) => {
        setError('Claim could not be updated at this time, please try again');
      }
    });
  }

  return (
    <>
      <Modal
        animation={false}
        show={true}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        size={claim.status === 'Verified' ? 'lg' : 'md'}
        className="custom-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{ label } Claim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            {error && <p className="text-danger">{error}</p>}
            { status && status === 'Approved' && <>
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <DateField
                  form={Form}
                  name="approval_date"
                  label="Approval Date"
                  register={register}
                  value={defaultDateValue()}
                  required={true}
                  error={errors.approval_date}
                />
              </div>
              <div className="col-sm-6 col-md-6">
                <DateField
                  form={Form}
                  name="payment_date"
                  label="Payment Date"
                  register={register}
                  value={defaultDateValue()}
                  required={true}
                  error={errors.payment_date}
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-sm-6">
                <InputField
                  form={Form}
                  type="number"
                  name="tax_percent"
                  label="Tax %"
                  register={register}
                  required={false}
                  error={errors.tax_percent}
                  value={0}
                  onChange={(e) => {
                    const value = e.target.value;
                    let tax = value / 100 * claim.amount;

                    setValue('tax_percent', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });

                    setValue('tax', Math.ceil(tax));
                  }}
                />
              </div>
              <div className="col-sm-6">
                <fieldset disabled>
                <InputField
                  form={Form}
                  type="number"
                  name="tax"
                  label="VAT value"
                  required={false}
                  register={register}
                  value={getValues('tax') || 0}
                  isDisabled={false}
                />
                </fieldset>
              </div>
            </div> </>}
            <InputField
              form={Form}
              type="textarea"
              name="remark"
              label="Comment (optional)"
              register={register}
              required={false}
              error={errors.remark}
              rows={3}
            />
            
            <div className="submit-section">
              <Button className="submit-btn" type="submit">{ label }
                {mutation.isLoading && <Loading />}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ClaimUpdateForm;