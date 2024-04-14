export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('userRole', data.role);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
