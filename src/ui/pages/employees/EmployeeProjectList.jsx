const EmployeeProjectList = ({ projectList }) => {
  return (
    <>
      <div className="card-body">
        <ul className="files-list">
          {projectList && projectList?.length > 0 && projectList.map(item => (
            <li key={item.id}>
              <div className="files-cont">
                <div className="file-type">
                  <span className="files-icon"><i className="fa fa-project"></i></span>
                </div>
                <div className="files-info">
                  <span className="file-name text-ellipsis">{item.name}</span>
                  <span className="file-author"><small>{ item.code }</small></span>
                </div>
              </div>
            </li>
          ))}
          { projectList?.length === 0 && <li>No Item added yet</li>}
        </ul>
      </div>
    </>
  );
}

export default EmployeeProjectList;