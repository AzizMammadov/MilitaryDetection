import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUploader({ onChange, selectedFilesCount}) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          component="label"
          variant="contained"
          endIcon={<FileUploadOutlinedIcon/>}
          sx={{
            width: '150px', // Adjust button width
            textTransform: 'none', // Prevent capitalization
            fontSize: '15px',
            height: '43px',
            borderRadius: '20px',
            color: '#fff', // Set text color
            '&:hover': {
              backgroundColor: '#115293', // Set background color on hover
            },
          }}
        >
          {selectedFilesCount > 0 ? `${selectedFilesCount} Şəkil` : "Şəkil seçin"}
          <VisuallyHiddenInput
            type="file"
            onChange={onChange}
            multiple
          />
        </Button>
      </div>
    );
  }