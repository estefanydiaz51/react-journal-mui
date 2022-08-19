import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm';
import { useEffect, useMemo } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNode, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from 'react';

export const NoteView = () => {
  const dispatch = useDispatch();

  const { active: note, messageSaved, isSaving  } = useSelector( state => state.journal );

  const { date, title, body, onInputChange, formState } = useForm( note );

  const dateString = useMemo( ()=> {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ date ])

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch( setActiveNote( formState ) )
  }, [formState])

  useEffect(() => {
    if ( messageSaved.length > 0 ){
      Swal.fire( 'Nota actualizada', messageSaved, 'success' )
    }
  
   
  }, [messageSaved])
  
  const onSaveNote = () => {
    dispatch( startSaveNote() )
  }

  const onFileInputChange = ({ target }) => {
    if ( target.files.length === 0 ) return;
    dispatch( startUploadingFiles( target.files ) )
  }

  const onDelete = () => {
    dispatch( startDeletingNode() )
  }

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography
          fontSize={ 39 }
          fontWeight='light'
        >
          { dateString }
        </Typography>
      </Grid>
      <Grid item>
        <input 
          type="file"
          multiple
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          style={{display: 'none'}}
        />
        <IconButton 
          color="primary"
          isSaving={ isSaving }
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>
        <Button 
          disabled={ isSaving }
          color="primary" 
          sx={{ padding: 2 }}
          onClick={ onSaveNote }
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          value={ title }
          name="title"
          onChange={ onInputChange }
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedio en el día de hoy?"
          minRows={ 5 }
          value={ body }
          name="body"
          onChange={ onInputChange }
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button
          onClick={ onDelete }
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      {/* Image Gallery */}
      <ImageGallery 
        images={ note.imageUrls }
      />
    </Grid>
  )
}

