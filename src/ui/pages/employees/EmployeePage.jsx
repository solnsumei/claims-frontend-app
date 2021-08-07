import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import EmployeeList from './EmployeeList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import EmployeeForm from './EmployeeForm';
import DeleteModal from '../../components/DeleteModal';
import { deleteItem } from '../../../services/apiService';


const EmployeePage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchQuery({ key: types.EMPLOYEES, url: '/users/' })
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
        queryClient.invalidateQueries(types.EMPLOYEES);
        toast.success("Employee was deleted successfully");
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
        title="Employees"
        buttonTitle="Add Employee"
        onClick={showForm}
      />

      {isLoading && <p>Loading...</p>}

      <ToastContainer />

      <EmployeeList
        employeeList={data}
        isLoading={isLoading}
        editItem={showForm}
        deleteItem={showDeleteForm} />
      
      {showFormModal && <EmployeeForm
        isOpen={true}
        closeModal={closeForm}
        user={selectedItem}
      />}
      
      {showDeleteModal && <DeleteModal 
        title="Employee"
        onDelete={handleDelete}
        closeModal={closeDeleteModal} />}
    </>
  );
}

export default EmployeePage;