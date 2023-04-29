<template>
    <div>
        <Header></Header>
        <h1 class="p-4 pb-0 w-100 text-center">Welcome {{ admin.username }}</h1>
        <section class="p-4 row d-flex justify-content-between flex-wrap">
            <div class="table-responsive col-6">
                <form class="w-100 mb-2 d-flex flex-column align-items-center justify-content-center" role="search">
                    <h2>Students</h2>
                    <div class="input-group input-group-sm w-50">
                        <button disabled class="btn btn-outline-secondary" type="button" id="buttonS"><i
                                class="fa-solid fa-magnifying-glass"></i></button>
                        <input v-model="searchStudents" type="search" class="form-control" aria-describedby="buttonS">
                    </div>
                </form>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th @click='sortS("id")'>Index
                                <i v-if="sortKeyStudents === 'id' && sortDirectionStudents === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyStudents === 'id' && sortDirectionStudents === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sortS("firstName")'>First name
                                <i v-if="sortKeyStudents === 'firstName' && sortDirectionStudents === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyStudents === 'firstName' && sortDirectionStudents === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sortS("lastName")'>Last name
                                <i v-if="sortKeyStudents === 'lastName' && sortDirectionStudents === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyStudents === 'lastName' && sortDirectionStudents === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sortS("dateOfRegistration")'>Date of registration
                                <i v-if="sortKeyStudents === 'dateOfRegistration' && sortDirectionStudents === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyStudents === 'dateOfRegistration' && sortDirectionStudents === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in paginatedDataStudents" :key="student.id">
                            <td>{{ student.id }}</td>
                            <td>{{ student.firstName }}</td>
                            <td>{{ student.lastName }}</td>
                            <td>{{ student.dateOfRegistration }}</td>
                        </tr>
                    </tbody>
                </table>
                <PaginationButtons :itemsPerPage="itemsPerPage" :currentPage="currentPageStudents"
                    :pageCount="pageCountStudents" :updateCurrentPage="updateCurrentPageStudents"></PaginationButtons>
            </div>
            <div class="table-responsive col-6">
                <form class="w-100 mb-2 d-flex flex-column align-items-center justify-content-center" role="search">
                    <h2>Archived students</h2>
                    <div class="input-group input-group-sm w-50">
                        <button disabled class="btn btn-outline-secondary" type="button" id="buttonS"><i
                                class="fa-solid fa-magnifying-glass"></i></button>
                        <input v-model="searchArchive" type="search" class="form-control" aria-describedby="buttonS">
                    </div>
                </form>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th @click='sortA("id")'>Index
                                <i v-if="sortKeyArchive === 'id' && sortDirectionArchive === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyArchive === 'id' && sortDirectionArchive === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sortA("firstName")'>First name
                                <i v-if="sortKeyArchive === 'firstName' && sortDirectionArchive === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyArchive === 'firstName' && sortDirectionArchive === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sortA("lastName")'>Last name
                                <i v-if="sortKeyArchive === 'lastName' && sortDirectionArchive === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyArchive === 'lastName' && sortDirectionArchive === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                            <th @click='sortA("archiveDate")'>Archive date
                                <i v-if="sortKeyArchive === 'archiveDate' && sortDirectionArchive === 1"
                                    class="fa-solid fa-sort-up"></i>
                                <i v-if="sortKeyArchive === 'archiveDate' && sortDirectionArchive === -1"
                                    class="fa-solid fa-sort-down"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in paginatedDataArchive" :key="student.id">
                            <td>{{ student.id }}</td>
                            <td>{{ student.firstName }}</td>
                            <td>{{ student.lastName }}</td>
                            <td>{{ student.archiveDate }}</td>
                        </tr>
                    </tbody>
                </table>
                <PaginationButtons :itemsPerPage="itemsPerPage" :currentPage="currentPageArchive"
                    :pageCount="pageCountArchive" :updateCurrentPage="updateCurrentPageArchive"></PaginationButtons>
            </div>
        </section>
    </div>
</template>

<script>
import Header from "../components/Header.vue"
import PaginationButtons from "../components/PaginationButtons.vue"
import Store from "../store/index"
import { mapActions, mapState } from 'vuex'

export default {
    name: "Home",
    store: Store,
    data() {
        return {
            admin: JSON.parse(sessionStorage.getItem("admin")),
            currentPageStudents: 1,
            currentPageArchive: 1,
            itemsPerPage: 5,
            sortKeyStudents: "dateOfRegistration",
            sortKeyArchive: "archiveDate",
            sortDirectionStudents: -1,
            sortDirectionArchive: -1,
            searchStudents: '',
            searchArchive: ''
        }
    },
    computed: {
        ...mapState(['students']),
        ...mapState(['archive']),
        pageCountStudents() {
            return Math.ceil(this.students.length / this.itemsPerPage);
        },
        paginatedDataStudents() {
            const startIndex = (this.currentPageStudents - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredDataStudents.slice(startIndex, endIndex);
        },
        sortedDataStudents() {
            let students = this.students
            return students.sort((a, b) => {
                const sortA = a[this.sortKeyStudents].toUpperCase();
                const sortB = b[this.sortKeyStudents].toUpperCase();

                if (sortA < sortB) return -1 * this.sortDirectionStudents
                if (sortA > sortB) return 1 * this.sortDirectionStudents
                return 0;
            });
        },
        filteredDataStudents() {
            let search = this.searchStudents.toUpperCase();
            return this.sortedDataStudents.filter(value => {
                const firstName = value.firstName.toUpperCase()
                const lastName = value.lastName.toUpperCase()
                const dateOfBirth = value.dateOfBirth.toUpperCase()
                const dateOfRegistration = value.dateOfRegistration.toUpperCase()
                const municipality = value.municipality.toUpperCase()
                return firstName.includes(search) || lastName.includes(search) || dateOfBirth.includes(search) || dateOfRegistration.includes(search) || municipality.includes(search)
            });
        },

        pageCountArchive() {
            return Math.ceil(this.archive.length / this.itemsPerPage);
        },
        paginatedDataArchive() {
            const startIndex = (this.currentPageArchive - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredDataArchive.slice(startIndex, endIndex);
        },
        sortedDataArchive() {
            let archive = this.archive
            return archive.sort((a, b) => {
                const sortA = a[this.sortKeyArchive].toUpperCase();
                const sortB = b[this.sortKeyArchive].toUpperCase();

                if (sortA < sortB) return -1 * this.sortDirectionArchive
                if (sortA > sortB) return 1 * this.sortDirectionArchive
                return 0;
            });
        },
        filteredDataArchive() {
            let search = this.searchArchive.toUpperCase();
            return this.sortedDataArchive.filter(value => {
                const firstName = value.firstName.toUpperCase()
                const lastName = value.lastName.toUpperCase()
                const archiveDate = value.archiveDate.toUpperCase()
                return firstName.includes(search) || lastName.includes(search) || archiveDate.includes(search)
            });
        },
    },
    mounted() {
        try {
            this.loadStudents()
            this.loadArchive()
        } catch (error) {
            alert("There was an error while loading students")
        }
    },
    methods: {
        ...mapActions(['loadStudents']),
        ...mapActions(['loadArchive']),
        updateCurrentPageStudents(pageNumber) {
            this.currentPageStudents = pageNumber;
        },
        updateCurrentPageArchive(pageNumber) {
            this.currentPageArchive = pageNumber;
        },
        sortS(key) {
            if (this.sortKeyStudents === key) {
                this.sortDirectionStudents = this.sortDirectionStudents * -1;
            } else {
                this.sortDirectionStudents = 1;
            }
            this.sortKeyStudents = key;
        },
        sortA(key) {
            if (this.sortKeyArchive === key) {
                this.sortDirectionArchive = this.sortDirectionArchive * -1;
            } else {
                this.sortDirectionArchive = 1;
            }
            this.sortKeyArchive = key;
        },
    },
    components: {
        Header,
        PaginationButtons
    }
}
</script>

<style></style>