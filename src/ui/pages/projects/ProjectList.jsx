import ProjectItem from './ProjectItem';


const ProjectList = ({ projectList, editItem, deleteItem }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <table className="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>Project</th>
                  <th>Code</th>
                  <th>Budget</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projectList && projectList.length > 0
                  ? projectList.map((item, i) => 
                    <ProjectItem
                      key={item.id}
                      project={item} index={i}
                      onEdit={editItem}
                      onDelete={deleteItem}
                    />)
                  : <tr><td colSpan='7'>No item to display.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;