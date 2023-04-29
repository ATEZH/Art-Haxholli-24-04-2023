<template>
    <div>
        <Header></Header>
        <div class="container-fluid p-4">
            <div>
                <div class="container-fluid d-flex justify-content-between align-items-center mb-3">
                    <form class="w-25 d-flex align-items-center" role="search">
                        <div class="input-group input-group-sm">
                            <button disabled class="btn btn-outline-secondary" type="button" id="buttonS"><i
                                    class="fa-solid fa-magnifying-glass"></i></button>
                            <input v-model="search" type="search" class="form-control" aria-describedby="buttonS">
                        </div>
                    </form>
                    <button @click="setAddEdit('add', null)" type="button" class="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#addEditStudent">
                        Register new student
                    </button>
                </div>
                <AddEditStudent ref="addEditModal" :action="action" :student="student" :title="title" :button="button"
                    :addEdit="setAddEdit"></AddEditStudent>
                <DeleteStudent ref="deleteModal" :student="student"></DeleteStudent>
                <ArchiveStudent ref="archiveModal" :student="student"></ArchiveStudent>
                </div>
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th @click='sort("id")'>Index
                                <i v-if="sortKey === 'id' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'id' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sort("firstName")'>First name
                                <i v-if="sortKey === 'firstName' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'firstName' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sort("lastName")'>Last name
                                <i v-if="sortKey === 'lastName' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'lastName' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sort("dateOfBirth")'>Date of birth
                                <i v-if="sortKey === 'dateOfBirth' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'dateOfBirth' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sort("dateOfRegistration")'>Date of registration
                                <i v-if="sortKey === 'dateOfRegistration' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'dateOfRegistration' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sort("municipality")'>Municipality
                                <i v-if="sortKey === 'municipality' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'municipality' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in paginatedData" :key="student.id">
                            <td>{{ student.id }}</td>
                            <td>{{ student.firstName }}</td>
                            <td>{{ student.lastName }}</td>
                            <td>{{ student.dateOfBirth }}</td>
                            <td>{{ student.dateOfRegistration }}</td>
                            <td>{{ student.municipality }}</td>
                            <td class="d-flex justify-content-evenly flex-wrap ps-1 pe-1">
                                <a @click="setAddEdit('edit', student)" class="link text-decoration-none"
                                    data-bs-toggle="modal" data-bs-target="#addEditStudent">Edit</a>
                                <a @click="delStudent(student)" class="link text-decoration-none" data-bs-toggle="modal" data-bs-target="#deleteStudent">Delete</a>
                                <a @click="archiveStudent(student)" class="link text-decoration-none" data-bs-toggle="modal" data-bs-target="#archiveStudent">Archive</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <PaginationButtons :itemsPerPage="itemsPerPage" :currentPage="currentPage" :pageCount="pageCount" :updateCurrentPage="updateCurrentPage"></PaginationButtons>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header.vue"
import AddEditStudent from "../components/AddEditStudent.vue"
import DeleteStudent from "../components/DeleteStudent.vue"
import ArchiveStudent from "../components/ArchiveStudent.vue"
import PaginationButtons from "../components/PaginationButtons.vue"
import Store from "../store/index"
import { mapActions, mapState } from 'vuex'

export default {
    store: Store,
    name: "Students",
    data() {
        return {
            button: '',
            title: '',
            action: '',
            student: {},
            currentPage: 1,
            itemsPerPage: 10,
            sortKey: "dateOfRegistration",
            sortDirection: -1,
            search: ''
        }
    },
    computed: {
        ...mapState(['students']),
        pageCount() {
            return Math.ceil(this.students.length / this.itemsPerPage);
        },
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredData.slice(startIndex, endIndex);
        },
        sortedData() {
            let students = this.students
            return students.sort((a, b) => {
                const sortA = a[this.sortKey].toUpperCase();
                const sortB = b[this.sortKey].toUpperCase();
    
                if (sortA < sortB) return -1 * this.sortDirection
                if (sortA > sortB) return 1 * this.sortDirection
                return 0;
            });
        },
        filteredData() {
            let search = this.search.toUpperCase();
            return this.sortedData.filter(value => {
                const firstName = value.firstName.toUpperCase()
                const lastName = value.lastName.toUpperCase()
                const dateOfBirth = value.dateOfBirth.toUpperCase()
                const dateOfRegistration = value.dateOfRegistration.toUpperCase()
                const municipality = value.municipality.toUpperCase()
                return firstName.includes(search) || lastName.includes(search) || dateOfBirth.includes(search) || dateOfRegistration.includes(search) || municipality.includes(search)
            });
        },
    },
    mounted() {
        try {
            this.loadStudents()
        } catch (error) {
            alert("There was an error while loading students")
        }
    },
    methods: {
        ...mapActions(['loadStudents']),
        setAddEdit(action, student) {
            if (action == "add") {
                this.title = "Register student"
                this.button = "Register"
                this.action = "add"
                this.$refs.addEditModal.id = ''
                this.$refs.addEditModal.firstName = ''
                this.$refs.addEditModal.lastName = ''
                this.$refs.addEditModal.dateOfBirth = ''
                this.$refs.addEditModal.municipality = ''
            } else if (action == "edit") {
                this.title = "Edit student"
                this.button = "Save"
                this.action = "edit"
                this.$refs.addEditModal.id = student.id
                this.$refs.addEditModal.firstName = student.firstName
                this.$refs.addEditModal.lastName = student.lastName
                this.$refs.addEditModal.dateOfBirth = student.dateOfBirth
                this.$refs.addEditModal.municipality = student.municipality
                this.student = student
            }
        },
        delStudent(student){
            this.$refs.deleteModal.id = student.id
            this.$refs.deleteModal.firstName = student.firstName
            this.$refs.deleteModal.lastName = student.lastName
            this.$refs.deleteModal.dateOfBirth = student.dateOfBirth
            this.$refs.deleteModal.dateOfRegistration = student.dateOfRegistration
            this.$refs.deleteModal.municipality = student.municipality
        },
        archiveStudent(student){
            this.$refs.archiveModal.id = student.id
            this.$refs.archiveModal.firstName = student.firstName
            this.$refs.archiveModal.lastName = student.lastName
            this.$refs.archiveModal.dateOfBirth = student.dateOfBirth
            this.$refs.archiveModal.dateOfRegistration = student.dateOfRegistration
            this.$refs.archiveModal.municipality = student.municipality
            this.student = student
        },
        updateCurrentPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        sort(key) {
            if (this.sortKey === key) {
                this.sortDirection = this.sortDirection * -1;
            } else {
                this.sortDirection = 1;
            }

            this.sortKey = key;
        },
    },
    components: {
        Header,
        AddEditStudent,
        DeleteStudent,
        ArchiveStudent,
        PaginationButtons
    }
}
</script>

<style></style>