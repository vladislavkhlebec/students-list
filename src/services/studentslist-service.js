export default class StudentsListService {
  getStudents() {
    const studentsFromStore = localStorage.getItem('students');
    return studentsFromStore ? JSON.parse(studentsFromStore) : [];
  }
  saveToLocalStore(students) {
    localStorage.setItem('students', JSON.stringify(students));
  }
}