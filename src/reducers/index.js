const initialState = {
	students: [],
	editingStudent: ''
};


const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'STUDENTSLIST_LOADED':
			return {
				students: action.payload
			}     
		case 'ADD_STUDENT':
			return { 
				...state,
				students: [...state.students, action.payload]
			}
		case 'DELETE_STUDENT': {
			return {
				...state,
				students: [...state.students.filter( ({id}) => id !== action.payload)]
			}
		}
		case 'SELECT_EDIT_STUDENT': {
			return {
				...state,
				editingStudent: state.students.find( elem => elem.id === action.payload)
			};
		}
		case 'RESET_EDIT_STUDENT': {
			return {
				...state,
				editingStudent: ''
			}
		}
		case 'UPDATE_STUDENT': {
			return {
        ...state,
        students: state.students.map(student => 
					student.id === state.editingStudent.id ? { ...state.editingStudent, ...action.payload } : student
        ) 
			}
		}
		default:
			return state;
	}
};

export default reducer;