import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import ProjectList from './ProjectList';
import { useFetchQuery } from '../../../hooks/useApi';
import types from '../../../utils/types';
import ProjectForm from './ProjectForm';
import DeleteModal from '../../components/DeleteModal';
import { deleteItem } from '../../../services/apiService';
import { useAuth } from '../../../providers/auth';


const ProjectPage = () => {
  const { isAuthenticated } = useAuth();
  const { role } = isAuthenticated();

  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchQuery({ key: types.PROJECTS, url: '/projects/' })
  const [showFormModal, setFormModalVisibility] = useState(false);
  const [showDeleteModal, setDeleteModalVisibility] = useState(false);
  const [selectedItem, setItem] = useState(null);

  const mutation = useMutation((id) => deleteItem(`/projects/${id}`));

  const showForm = (item) => {
    setItem(item);
    setFormModalVisibility(true);
  };

  const closeForm = (message=null) => {
    if (selectedItem) {
      setItem(null);
    }

    if (message) {
      toast.success(message);
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
        queryClient.invalidateQueries(types.PROJECTS);
        toast.success('Project was deleted successfully');
      },
      onError: (error) => {
        if (error?.response) {
          toast.error(error.response.data.details);
        }
      }
    });

    closeDeleteModal();
  }

  return (
    <>
      <PageHeader
        title="Projects"
        buttonTitle={ role === types.ADMIN ? "Add Project" : undefined}
        onClick={showForm}
      />

      {isLoading && <p>Loading...</p>}
      <ToastContainer />

      <ProjectList
        projectList={data}
        editItem={showForm}
        deleteItem={showDeleteForm} />
      
      {role === types.ADMIN && showFormModal && <ProjectForm
        isOpen={true}
        closeModal={closeForm}
        project={selectedItem}
      />}
      
      {role === types.ADMIN && showDeleteModal && <DeleteModal 
        title="project"
        onDelete={handleDelete}
        closeModal={closeDeleteModal} />}
    </>
  );
}

export default ProjectPage;