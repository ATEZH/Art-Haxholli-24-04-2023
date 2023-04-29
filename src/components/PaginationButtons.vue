<template>
    <div>
        <div class="pagination">
        <button class="btn btn-secondary" :disabled="currentPage === 1" @click="updateCurrentPage(1)">&ll;</button>
        <button class="btn btn-secondary" :disabled="currentPage === 1" @click="updateCurrentPage(currentPage - 1)">&lt;</button>
        <button class="btn btn-secondary" v-for="pageNumber in pageCount" :key="pageNumber" :class="{ active: pageNumber === currentPage }" @click="updateCurrentPage(pageNumber)">{{ pageNumber }}</button>
        <button class="btn btn-secondary" :disabled="currentPage === pageCount || pageCount === 1" @click="updateCurrentPage(currentPage + 1)">&gt;</button>
        <button class="btn btn-secondary" :disabled="currentPage === pageCount || pageCount === 1" @click="updateCurrentPage(pageCount)">&gg;</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationButton",
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            required: true
        },
        pageCount: {
            type: Number,
            required: true
        },
        updateCurrentPage: {
            type: Function,
            required: true
        }
    }
}
</script>