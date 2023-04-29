<template>
    <div class="modal fade" id="archiveStudent" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Archive student</h1>
                </div>
                <div class="modal-body">
                    <form ref="studentForm" @submit="vArchiveStudent()">
                        <div class="mb-3">
                            <label for="id" class="form-label">Index: </label>
                            <input readonly v-model="id" type="text" class="form-control" name="id" id="">
                        </div>
                        <div class="mb-3">
                            <label for="firstName" class="form-label">First name:</label>
                            <input readonly v-model="firstName" type="text" class="form-control" name="firstName" id="">
                        </div>
                        <div class="mb-3">
                            <label for="lastName" class="form-label">Last name:</label>
                            <input readonly v-model="lastName" type="text" class="form-control" name="lastName" id="">
                        </div>
                        <div class="mb-3">
                            <label for="dateOfBirth" class="form-label">Date of birth:</label>
                            <input readonly v-model="dateOfBirth" type="date" class="form-control" name="dateOfBirth"
                                placeholder="yyyy-mm-dd" id="">
                        </div>
                        <div class="mb-3">
                            <label for="dateOfRegistration" class="form-label">Date of registration:</label>
                            <input readonly v-model="dateOfRegistration" type="text" class="form-control" name="dateOfRegistration" id="">
                        </div>
                        <div class="mb-3">
                            <label for="municipality" class="form-label">Municipality</label>
                            <input readonly v-model="municipality" type="text" class="form-control" name="municipality" id="">
                        </div>
                        <div class="container-fluid d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                @click="dismiss()">Dismiss</button>
                            <button type="submit" class="btn btn-info ms-3">Archive</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Store from "../store/index"
import { mapActions, mapState } from 'vuex'

export default {
    store: Store,
    name: "ArchiveStudent",
    props: {
        student: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            dateOfRegistration: '',
            municipality: ''
        }
    },
    computed: {
        ...mapState(['students']),
        ...mapState(['archive'])
    },
    mounted() {
        try {
            this.loadArchive()
            this.loadStudents()
        } catch (error) {
            alert("There was an error while loading students")
        }
    },
    methods: {
        ...mapActions(['loadStudents']),
        ...mapActions(['loadArchive']),
        ...mapActions(['archiveStudent']),
        vArchiveStudent(){
            try {
                const {id, firstName, lastName, dateOfBirth, dateOfRegistration, municipality} = this.student
                const archiveStudent = {id, firstName, lastName, dateOfBirth, dateOfRegistration, municipality, archiveDate: this.setDate()}
                this.archiveStudent(archiveStudent)
                this.dismiss()
            } catch (error) {
                alert("THere was an error while archiving student")
            }
        },
        dismiss() {
            this.id = ''
            this.firstName = ''
            this.lastName = ''
            this.dateOfBirth = ''
            this.dateOfRegistration = ''
            this.municipality = ''
        },
        setDate() {
            let date = new Date()
            let year = date.getUTCFullYear()

            let tempMonth = date.getUTCMonth() + 1
            tempMonth = tempMonth.toString()
            let month = (tempMonth.length == 1) ? "0" + tempMonth : tempMonth

            let tempDay = date.getUTCDate().toString()
            let day = (tempDay.length == 1) ? "0" + tempDay : tempDay

            let tempHours = date.getHours().toString()
            let hours = (tempHours.length == 1) ? "0" + tempHours : tempHours

            let tempMinutes = date.getMinutes().toString()
            let minutes = (tempMinutes.length == 1) ? "0" + tempMinutes : tempMinutes

            let tempSeconds = date.getSeconds().toString()
            let seconds = (tempSeconds.length == 1) ? "0" + tempSeconds : tempSeconds

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        }
    }
}
</script>

<style></style>