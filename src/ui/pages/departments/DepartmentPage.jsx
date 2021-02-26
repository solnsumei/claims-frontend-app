import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import PageHeader from '../../components/PageHeader';
import DepartmentList from './DepartmentList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import DepartmentForm from './DepartmentForm';
import DeleteModal from '../../components/DeleteModal';
import { deleteItem } from '../../../services/apiService';


const DepartmentPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchQuery({ key: types.DEPARTMENTS, url: '/departments' })
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [showDeleteModal, setDeleteModalVisibility] = useState(false);
  const [selectedDepartment, setDepartment] = useState(null);

  const mutation = useMutation((id) => deleteItem(`/departments/${id}`));

  const showForm = (department) => {
    setDepartment(department);
    setFormModalVisibility(true);
  };

  const closeForm = () => {
    if (selectedDepartment) {
      setDepartment(null);
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
        closeDeleteModal();
      },
      onError: (error) => {
        console.log(error);
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Departments"
        buttonTitle="Add Department"
        onClick={showForm}
      />

      {isLoading && <p>Loading...</p>}

      <DepartmentList
        departmentList={data}
        editItem={showForm}
        deleteItem={showDeleteForm} />
      
      <DepartmentForm
        isOpen={showFormModal}
        closeModal={closeForm}
        department={selectedDepartment}
      />
      {showDeleteModal && <DeleteModal 
        title="department"
        onDelete={handleDelete}
        closeModal={closeDeleteModal} />}
    </>
  );
}

export default DepartmentPage;