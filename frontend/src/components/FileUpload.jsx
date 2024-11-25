import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../redux/api';
import { setData } from '../redux/dataSlice';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const FileUpload = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.data);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    dispatch({ type: 'data/uploadStart' });

    const result = await uploadFile(file);

    if (result.success) {
      dispatch(setData(result.data));
      dispatch({ type: 'data/uploadSuccess' });
    } else {
      dispatch({ type: 'data/uploadFailure', payload: result.error });
    }
  };

  return (
    <Box
      sx={{
        margin:'auto',
        width:'50%',
        height:'15vh',
        padding: 3,
        border: '2px dashed #6C63FF',
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: '#FFF',
      }}
    >
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUpload />}
        sx={{
          marginTop:'3%'
,          backgroundColor: 'black',
          color: '#FFF',
          '&:hover': { backgroundColor: '#5A55E0' },
        }}
      >
        Upload File
        <input hidden type="file" onChange={handleFileChange} />
      </Button>
      {loading && (
        <Box sx={{ marginTop: 2 }}>
          <CircularProgress />
          <Typography sx={{ marginTop: 1 }}>Processing file...</Typography>
        </Box>
      )}
      {error && (
        <Typography sx={{ color: 'red', marginTop: 1 }}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
