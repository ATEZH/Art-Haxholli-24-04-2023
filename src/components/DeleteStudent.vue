<template>
    <div class="modal fade" id="deleteStudent" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete student</h1>
                </div>
                <div class="modal-body">
                    <form ref="studentForm" @submit="vDeleteStudent()">
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
                            <label for="municipality" class="form-label">Municipality</label>
                            <input readonly v-model="municipality" type="text" class="form-control" name="municipality" id="">
                        </div>
                        <div class="container-fluid d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                @click="dismiss()">Dismiss</button>
                            <button type="submit" class="btn btn-danger ms-3">Delete</button>
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
    name: "DeleteStudent",
    data() {
        return {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            municipality: ''
        }
    },
    computed: {
        ...mapState(['students'])
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
        ...mapActions(['deleteStudent']),
        vDeleteStudent(){
            try {
                this.deleteStudent(this.id)
            } catch (error) {
                alert("There was an error during student deletion")
            }
        },
        dismiss() {
            this.id = ''
            this.firstName = ''
            this.lastName = ''
            this.dateOfBirth = ''
            this.municipality = ''
        }
    }
}
</script>

<style></style>