export const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `${token}`,
  };
};

export const handleResponse = async (response) => {
  if (response.status === 401) {
    window.location.href = '/login';
    return Promise.reject('Token expired or invalid. Redirecting to login.');
  }
  return response.json();
};
