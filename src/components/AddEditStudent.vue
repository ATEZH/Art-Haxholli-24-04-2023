<template>
    <div class="modal fade" id="addEditStudent" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
                </div>
                <div class="modal-body">
                    <form ref="studentForm" @submit.prevent="vAddEdit()">
                        <div v-if="action === 'edit'" class="mb-3">
                            <label for="id" class="form-label">Index: </label>
                            <input readonly v-model="id" type="text" class="form-control" name="id" id="">
                        </div>
                        <div class="mb-3">
                            <label for="firstName" class="form-label">First name:</label>
                            <input v-model="firstName" type="text" class="form-control" name="firstName" id="">
                            <span class="m-0 error" v-for="error in v$.firstName.$errors" :key="error.$uid">{{ error.$message }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="lastName" class="form-label">Last name:</label>
                            <input v-model="lastName" type="text" class="form-control" name="lastName" id="">
                            <span class="m-0 error" v-for="error in v$.lastName.$errors" :key="error.$uid">{{ error.$message }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="dateOfBirth" class="form-label">Date of birth:</label>
                            <input v-model="dateOfBirth" type="date" class="form-control" name="dateOfBirth"
                                placeholder="yyyy-mm-dd" id="">
                            <span class="m-0 error" v-for="error in v$.dateOfBirth.$errors" :key="error.$uid">{{ error.$message }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="municipality" class="form-label">Municipality</label>
                            <select v-model ="municipality" class="form-control" name="municipality" id="">
                                <option value="Prishtinë">Prishtinë</option>
                                <option value="Prizren">Prizren</option>
                                <option value="Ferizaj">Ferizaj</option>
                                <option value="Pejë">Pejë</option>
                                <option value="Gjakovë">Gjakovë</option>
                            </select>
                            <span class="m-0 error" v-for="error in v$.municipality.$errors" :key="error.$uid">{{
                                error.$message
                            }}</span>
                        </div>
                        <div class="container-fluid d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                @click="dismiss()">Dismiss</button>
                            <button type="submit" class="btn btn-success ms-3">{{ button }}</button>
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
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { nanoid } from 'nanoid'

export default {
    store: Store,
    name: "AddEditStudent",
    props: {
        button: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        student: {
            type: Object
        }
    },
    setup: () => ({
        v$: useVuelidate()
    }),
    data() {
        return {
            id: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            municipality: ''
        }
    },
    validations() {
        return {
            firstName: { required, minLength: minLength(3), maxLength: maxLength(12) },
            lastName: { required, minLength: minLength(3), maxLength: maxLength(12) },
            dateOfBirth: { required },
            municipality: { required }
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
        ...mapActions(['addStudent']),
        ...mapActions(['updateStudent']),
        async vAddEdit(){
            const result = await this.v$.$validate()
            if (result) {
                this.addEdit()

            }
        },
        addEdit() {
            if (this.action == "add") {
                try {
                    this.addNewStudent()
                } catch (error) {
                    alert("There was an error during student registration")
                }
                this.dismiss()
            } else if (this.action == "edit") {
                try {
                    this.editStudent(this.student)
                } catch (error) {
                    alert("There was an error during student update")
                }
            }
        },
        addNewStudent() {
            const newStudent = {
                id: nanoid(),
                firstName: this.firstName,
                lastName: this.lastName,
                dateOfBirth: this.dateOfBirth,
                dateOfRegistration: this.setDate(),
                municipality: this.municipality
            }
            this.addStudent(newStudent)
        },
        editStudent(updatedStudent) {
            updatedStudent.id = this.id
            updatedStudent.firstName = this.firstName
            updatedStudent.lastName = this.lastName
            updatedStudent.dateOfBirth = this.dateOfBirth
            updatedStudent.municipality = this.municipality
            this.updateStudent(updatedStudent)
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
        },
        dismiss() {
            this.id = ''
            this.firstName = ''
            this.lastName = ''
            this.dateOfBirth = ''
            this.municipality = ''
            this.v$.$reset()
        }
    }
}
</script>

<style></style>