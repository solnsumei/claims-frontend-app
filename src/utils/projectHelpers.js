export const getAvailableUsers = ({project, allUsers}) => {
  const project_team = project.team.map(item => item.id);

  return allUsers.filter(user => !project_team.includes(user.id) && user.id !== project.manager.id);
}

export const isActiveUser = {
  hasChangedPassword: true,
}

export const isAdmin = {
  admin: true,
  ...isActiveUser,
}
