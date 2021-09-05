import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import { Modal, Button, Form } from 'react-bootstrap';
import InputField from '../../components/InputField';
import types from '../../../utils/types';
import { rejectClaimResolver } from '../../../utils/validators';
import { updateClaim } from '../../../services/apiService';


const RejectClaimForm = ({ claim, closeModal }) => {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: rejectClaimResolver(),
  });

  const mutation = useMutation((data) => updateClaim({ url: `/claims/${claim.id}`, data, verify: claim.status === 'Pending' }));

  const submitForm = async (data) => {
    data['status'] = 'Cancelled';

    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries([types.CLAIMS, claim.id]);
        queryClient.invalidateQueries(types.CLAIMS);
        closeModal('Claim updated successfully');
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
        className="custom-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            {error && <p className="text-danger">{error}</p>}
            <h3>Are you sure you want to cancel claim with claim number {claim.claim_id}?</h3>
            <InputField
              form={Form}
              type="textarea"
              name="remark"
              label="Reason"
              register={register}
              required={true}
              error={errors?.remark}
              rows={3}
            />
            <div className="submit-section">
              <Button
                className="submit-btn"
                variant="danger"
                type="submit">
                  Reject Claim
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RejectClaimForm;