import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export const uploadFile = async (file) => {
  try {
    if (!(file instanceof File)) {
      throw new Error('Provided input is not a valid file.');
    }

    const formData = new FormData();
    formData.append('file', file); 
    formData.append('fileName', file.name);  
    formData.append('mimeType', file.type);  

    console.log('Sending form data:', formData);

    const response = await apiClient.post('/upload', formData, {
      headers: {
 
      },
    });

    const { success, data, error } = response.data;

    if (!success) {
      throw new Error(error || 'File upload failed');
    }

    const { invoices, products, customers } = data;

    if (!invoices || !products || !customers) {
      throw new Error('Invalid data structure received from server');
    }

    return {
      success: true,
      data: {
        invoices,
        products,
        customers,
      },
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
    };
  }
};