import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import DepartmentList from './DepartmentList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import DepartmentForm from './DepartmentForm';
import DeleteModal from '../../components/DeleteModal';
import { deleteItem } from '../../../services/apiService';


const DepartmentPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchQuery({ key: types.DEPARTMENTS, url: '/departments/' })
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [showDeleteModal, setDeleteModalVisibility] = useState(false);
  const [selectedDepartment, setDepartment] = useState(null);

  const mutation = useMutation((id) => deleteItem(`/departments/${id}`));

  const showForm = (department) => {
    setDepartment(department);
    setFormModalVisibility(true);
  };

  const closeForm = (message=null) => {
    if (selectedDepartment) {
      setDepartment(null);
    }
    if (message) {
      toast.success(message);
    }
    setFormModalVisibility(false);
  };

  const showDeleteForm = (department) => {
    setDepartment(department)
    setDeleteModalVisibility(true);
  }

  const closeDeleteModal = () => {
    setDepartment(null)
    setDeleteModalVisibility(false);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    if (!selectedDepartment) {
      closeDeleteModal();
      return;
    }

    mutation.mutate(selectedDepartment.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(types.DEPARTMENTS);
        toast.success('Department deleted successfully');
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
        title="Departments"
        buttonTitle="Add Department"
        onClick={showForm}
      />

      {isLoading && <p>Loading...</p>}
      <ToastContainer />

      <DepartmentList
        departmentList={data}
        editItem={showForm}
        deleteItem={showDeleteForm} />
      
      {showFormModal && <DepartmentForm
        isOpen={true}
        closeModal={closeForm}
        department={selectedDepartment}
        queryClient={queryClient}
      />}
      
      {showDeleteModal && <DeleteModal 
        title="department"
        onDelete={handleDelete}
        closeModal={closeDeleteModal} />}
    </>
  );
}

export default DepartmentPage;