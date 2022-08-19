import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote( { title, body, id, imageUrls, date } ) );
    }
    const newTitle = useMemo( () => {
        return title.length > 15
            ? title.substring(0,15) + '...'
            : title;
    }, [ title ])

    return (
        <ListItem
            disablePadding
            onClick={ onClickNote }
        >
            <ListItemButton>
                <ListItemIcon>
                <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText 
                        primary={ newTitle }
                    />
                    <ListItemText 
                        secondary={ body }
                    />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
    }
