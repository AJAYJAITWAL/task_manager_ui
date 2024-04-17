export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('userRole', data.role);
  localStorage.setItem('userName', data.name);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
