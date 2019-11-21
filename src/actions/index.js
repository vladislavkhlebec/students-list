const studentsLoaded = (students) => {
  return {
      type: 'STUDENTSLIST_LOADED',
      payload: students
  };
}
const addStudent = (student) => {
  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  return {
      type: 'ADD_STUDENT',
      payload: {
        id: generateId(),
        ...student
      }
  };
}

const deleteStudent = (id) => {
  return {
    type: 'DELETE_STUDENT',
    payload: id
  }
}

const selectEditStudent = (id) => {
  return {
    type: 'SELECT_EDIT_STUDENT',
    payload: id
  }
}

const deselectEditStudent = () => {
  return {
    type: 'RESET_EDIT_STUDENT',
  }
}

const updateStudent = (student) => {
  return {
    type: 'UPDATE_STUDENT',
    payload: student
  }
}
export {
  studentsLoaded,
  addStudent,
  deleteStudent,
  selectEditStudent,
  deselectEditStudent,
  updateStudent
};