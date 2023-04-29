import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      students: [],
      archive: []
    }
  },
  mutations: {
    addStudent(state, student) {
      state.students.push(student)
      localStorage.setItem('students', JSON.stringify(state.students))
    },

    deleteStudent(state, studentId) {
      const index = state.students.findIndex((student) => student.id === studentId)
      if (index !== -1) {
        state.students.splice(index, 1)
        localStorage.setItem('students', JSON.stringify(state.students))
      }
    },

    updateStudent(state, updatedStudent) {
      const index = state.students.findIndex((student) => student.id === updatedStudent.id)
      if (index !== -1) {
        state.students.splice(index, 1, updatedStudent)
        localStorage.setItem('students', JSON.stringify(state.students))
      }
    },

    loadStudents(state) {
      const students = localStorage.getItem('students')
      if (students) {
        state.students = JSON.parse(students)
      } else {
        state.students = []
      }
    },

    loadArchive(state) {
      const students = localStorage.getItem('archive')
      if (students) {
        state.archive = JSON.parse(students)
      } else {
        state.archive = []
      }
    },

    archiveStudent(state, archivedStudent) {
      const index = state.students.findIndex((student) => student.id === archivedStudent.id)
      if (index !== -1) {
        state.students.splice(index, 1)
        localStorage.setItem('students', JSON.stringify(state.students))
        state.archive.push(archivedStudent)
        localStorage.setItem('archive', JSON.stringify(state.archive))
      }
    },

    restoreStudent(state, restoredStudent) {
      const index = state.archive.findIndex((student) => student.id === restoredStudent.id)
      if (index !== -1) {
        state.archive.splice(index, 1)
        localStorage.setItem('archive', JSON.stringify(state.archive))
        state.students.push(restoredStudent)
        localStorage.setItem('students', JSON.stringify(state.students))
      }
    },
  },

  actions: {
    addStudent({ commit }, student) {
      commit('addStudent', student)
    },

    deleteStudent({ commit }, studentId) {
      commit('deleteStudent', studentId)
    },

    updateStudent({ commit }, updatedStudent) {
      commit('updateStudent', updatedStudent)
    },

    loadStudents({ commit }) {
      commit('loadStudents')
    },

    loadArchive({ commit }) {
      commit('loadArchive')
    },

    archiveStudent({ commit }, archivedStudent) {
      commit('archiveStudent', archivedStudent)
    },

    restoreStudent({ commit }, restoredStudent) {
      commit('restoreStudent', restoredStudent)
    }
  },
})
