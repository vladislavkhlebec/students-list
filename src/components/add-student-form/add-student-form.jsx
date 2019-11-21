import React from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { withStudentslistService } from '../hoc';
import {connect} from 'react-redux';
import { addStudent, deselectEditStudent, updateStudent } from '../../actions'
import { compose } from '../../utils';


const useStyles = makeStyles(theme => ({
  form: {
    width: '40%',
    margin: 0,
    padding: 0
  },
  spacing: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '94%',
  },
  button: {
    marginTop: '10px',
  }
}));

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  patronymic: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  birthDate: Yup.string()
    .required('Required'),
  performance: Yup.string()
    .required('Required'),
});

const CssTextField = withStyles({
  root: {
    '& .MuiFormHelperText-contained': {
      color: 'red',
    },
  },
})(TextField);

const AddStudentForm = ({
  addStudent,
  editingStudent,
  deselectEditStudent,
  updateStudent
}) => {
  const classes = useStyles();
  const onSubmit = (student, ...props ) => {
    if (!editingStudent) {
      addStudent(student);
      console.log(props)
    }
    else {
      updateStudent(student);
      deselectEditStudent()
    }
  }
  const initialValues = {
    firstName: `${editingStudent ? editingStudent.firstName : ''}`, 
    lastName: `${editingStudent ? editingStudent.lastName : ''}`,
    patronymic: `${editingStudent ? editingStudent.patronymic : ''}`,
    birthDate: `${editingStudent ? editingStudent.birthDate : '1990-01-01'}`,
    performance: `${editingStudent ? editingStudent.performance : 'well'}`,
    avatar: `${editingStudent ? editingStudent.avatar : ''}`
  };

  return (
    <Container className={classes.form}>
      <Formik 
        initialValues={initialValues}
        enableReinitialize 
        onSubmit={ (student, {resetForm}) => {
          onSubmit(student);
          resetForm(initialValues);
        }}
        className={classes.form}
        validationSchema={ ValidationSchema }
      >
      {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid  container spacing={3}>
            <Grid item xs={12}> 
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                autoComplete="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={(errors.firstName && touched.firstName) && errors.firstName}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                autoComplete="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={(errors.lastName && touched.lastName) && errors.lastName}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="patronymic"
                label="Patronymic"
                name="patronymic"
                autoComplete="patronymic"
                value={values.patronymic}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={(errors.patronymic && touched.patronymic) && errors.patronymic}
              />
              <div className={classes.spacing}>
                <CssTextField
                  id="birthDate"
                  label="Birthdate"
                  type="date"
                  required
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.birthDate}
                  helperText={(errors.birthDate && touched.birthDate) && errors.birthDate}
                />
                <FormControl>
                  <InputLabel id="performance">Performance</InputLabel>
                  <Select
                    labelId="performance"
                    label="Performance"
                    id="performance"
                    name="performance"
                    value={values.performance}
                    onChange={handleChange}
                  >
                    <MenuItem value="well">Well</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="bad">Bad</MenuItem>
                    <MenuItem value="Inadequate">Inadequate</MenuItem>
                    
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          {!editingStudent&&
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add student
            </Button>
          }
          {editingStudent&&
            <>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  deselectEditStudent();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </>
          }
        </form>
        )} 
      </Formik>
    </Container>
  )
}


const mapStateToProps = (state) => {
  return {
    editingStudent: state.editingStudent,
  }
}

export default compose(
withStudentslistService(),
connect(
  mapStateToProps, 
  { 
    addStudent,
    deselectEditStudent,
    updateStudent
  }
)
)(AddStudentForm);