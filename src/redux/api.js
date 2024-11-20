export const fetchFormConfig = async () => {
    try {
      const response = await fetch('https://673cb8c596b8dcd5f3fb46aa.mockapi.io/api/v1/forms'); 
      if (!response.ok) {
        throw new Error('Failed to fetch form configuration');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching form config:', error);
      throw error;
    }
  };
  