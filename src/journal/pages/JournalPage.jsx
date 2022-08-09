import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';


export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus obcaecati delectus ipsam, commodi ducimus placeat sapiente quibusdam maiores laboriosam adipisci voluptatum necessitatibus quod repellendus porro animi tempore distinctio labore. Debitis.
      </Typography> */}
      <NothingSelectedView /> 
      {/* <NoteView /> */}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {  backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30}} />
      </IconButton>
    </JournalLayout>
  )
}