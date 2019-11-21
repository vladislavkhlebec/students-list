import React from 'react';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import { deleteStudent, selectEditStudent } from '../../actions'


const useStyles = makeStyles(theme => ({
    margin: {
			margin: theme.spacing(1),
    }, 
    center: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingRight: 0
		},
		column: {
			display: 'flex',
			flexDirection: 'column',
			width: '70%'
		}
}));

const defaultAvatar = 'https://st3.depositphotos.com/8169504/15139/v/1600/depositphotos_151391066-stock-illustration-man-portrait-beard-modern-avatar.jpg';

const StudentsListItem = ({ student, deleteStudent, selectEditStudent }) => {
	const {
		id, 
		firstName, 
		lastName, 
		patronymic, 
		birthDate,
		performance,
		avatar 
	} = student;
	const classes = useStyles();
	return (
		<ListItem button className={classes.center}>
			<ListItemAvatar>
			<Avatar
				alt={`Avatar n°${lastName + 1}`}
				src={avatar || defaultAvatar}
			/>
			</ListItemAvatar>
			<Box className={classes.column}>
				<ListItemText primary={`${lastName} ${firstName} ${patronymic}`} />
				<ListItemText primary={`Bithdate: ${birthDate} Performance: ${performance} `} />
			</Box>
			<IconButton aria-label="delete" onClick={()=> selectEditStudent(id)}>
				<EditIcon fontSize="small" />
			</IconButton>
			<IconButton aria-label="delete" onClick={ () => deleteStudent(id)}>
				<DeleteIcon fontSize="small" />
			</IconButton>
			<ListItemSecondaryAction />
		</ListItem>
	)
};

export default connect(
	null,
	{
		deleteStudent,
		selectEditStudent
	}
)(StudentsListItem);

