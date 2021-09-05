import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import ContractorList from './ContractorList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import ContractorForm from './ContractorForm';
import DeleteModal from '../../components/DeleteModal';
import { deleteItem } from '../../../services/apiService';


const ContractorPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchQuery({ key: types.CONTRACTORS, url: '/users/?contractors=true' })
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [showDeleteModal, setDeleteModalVisibility] = useState(false);
  const [selectedItem, setItem] = useState(null);

  const mutation = useMutation((id) => deleteItem(`/users/${id}`));

  const showForm = (item) => {
    setItem(item);
    setFormModalVisibility(true);
  };

  const closeForm = (message=null) => {
    if (message) {
      toast.success(message);
    }
    if (selectedItem) {
      setItem(null);
    }
    setFormModalVisibility(false);
  };

  const showDeleteForm = (item) => {
    setItem(item)
    setDeleteModalVisibility(true);
  }

  const closeDeleteModal = () => {
    setItem(null)
    setDeleteModalVisibility(false);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    if (!selectedItem) {
      closeDeleteModal();
      return;
    }

    mutation.mutate(selectedItem.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(types.CONTRACTORS);
        toast.success("Contractor was deleted successfully");
      },
      onError: (error) => {
        if (error?.response) {
          toast.error(error.response.data.detail);
        }
      }
    });

    closeDeleteModal();
  }

  return (
    <>
      <PageHeader
        title="Contractors"
        buttonTitle="Add Contractor"
        onClick={showForm}
      />

      {isLoading && <p>Loading...</p>}

      <ToastContainer />

      <ContractorList
        contractorList={data}
        isLoading={isLoading}
        editItem={showForm}
        deleteItem={showDeleteForm} />
      
      {showFormModal &&<ContractorForm
        isOpen={true}
        closeModal={closeForm}
        user={selectedItem}
      />}
      
      {showDeleteModal && <DeleteModal 
        title="Contractor"
        onDelete={handleDelete}
        closeModal={closeDeleteModal} />}
    </>
  );
}

export default ContractorPage;