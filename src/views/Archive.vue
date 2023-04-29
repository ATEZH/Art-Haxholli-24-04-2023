<template>
    <div>
        <Header></Header>
        <div class="container-fluid p-4">
            <div>
                <div class="container-fluid d-flex justify-content-star align-items-center mb-3">
                    <form class="w-25 d-flex align-items-center" role="search">
                        <div class="input-group input-group-sm">
                            <button disabled class="btn btn-outline-secondary" type="button" id="button-addon2"><i
                                    class="fa-solid fa-magnifying-glass"></i></button>
                            <input v-model="search" type="search" class="form-control" aria-describedby="button-addon2">
                        </div>
                    </form>
                </div>
            </div>
            <RestoreStudent ref="restoreModal" :student="student"></RestoreStudent>
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
                            <th @click='sort("municipality")'>Municipality
                                <i v-if="sortKey === 'municipality' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'municipality' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sort("archiveDate")'>Archive date
                                <i v-if="sortKey === 'archiveDate' && sortDirection === 1" class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKey === 'archiveDate' && sortDirection === -1" class="fa-solid fa-sort-down"></i>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in paginatedData" :key="student.id">
                            <td>{{ student.id }}</td>
                            <td>{{ student.firstName }}</td>
                            <td>{{ student.lastName }}</td>
                            <td>{{ student.dateOfBirth }}</td>
                            <td>{{ student.municipality }}</td>
                            <td>{{ student.archiveDate }}</td>
                            <td>
                                <a @click="restoreStudent(student)" class="link text-decoration-none" data-bs-toggle="modal" data-bs-target="#restoreStudent">Restore</a>
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
import RestoreStudent from "../components/RestoreStudent.vue"
import PaginationButtons from "../components/PaginationButtons.vue"
import Store from "../store/index"
import { mapActions, mapState } from 'vuex'

export default {
    store: Store,
    name: "Archive",
    data() {
        return {
            student: {},
            currentPage: 1,
            itemsPerPage: 10,
            sortKey: "archiveDate",
            sortDirection: -1,
            search: ''
        }
    },
    computed: {
        ...mapState(['archive']),
        pageCount() {
            return Math.ceil(this.archive.length / this.itemsPerPage);
        },
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredData.slice(startIndex, endIndex);
        },
        sortedData() {
            let archive = this.archive
            return archive.sort((a, b) => {
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
                const dateOfRegistration = value.archiveDate.toUpperCase()
                const municipality = value.municipality.toUpperCase()
                return firstName.includes(search) || lastName.includes(search) || dateOfBirth.includes(search) || dateOfRegistration.includes(search) || municipality.includes(search)
            });
        },
    },
    mounted() {
        try {
            this.loadArchive()
        } catch (error) {
            alert("There was an error while loading students")
        }
    },
    methods: {
        ...mapActions(['loadArchive']),
        restoreStudent(student){
            this.$refs.restoreModal.id = student.id
            this.$refs.restoreModal.firstName = student.firstName
            this.$refs.restoreModal.lastName = student.lastName
            this.$refs.restoreModal.dateOfBirth = student.dateOfBirth
            this.$refs.restoreModal.dateOfRegistration = student.dateOfRegistration
            this.$refs.restoreModal.municipality = student.municipality
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
        RestoreStudent,
        PaginationButtons
    }
}
</script>

<style>
</style>