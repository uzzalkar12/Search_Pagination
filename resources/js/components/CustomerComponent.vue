<template>
    <div id="customer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Customers</h4>
                        <div class="card-tools" style="position: absolute; right: 1rem; top: .5rem;">
                            <button type="button" class="btn btn-primary" @click="reload">Reload <i
                                class="fas fa-sync"></i></button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-2">
                                    <strong>Search By: </strong>
                                </div>
                                <div class="col-md-3">
                                    <select v-model="queryField" class="form-control" id="fields">
                                        <option value="name">Name</option>
                                        <option value="email">Email</option>
                                        <option value="phone">Phone</option>
                                        <option value="address">Address</option>
                                        <option value="total">Total</option>
                                    </select>
                                </div>
                                <div class="col-md-7">
                                    <!--<div class="input-group mb-3">-->
                                    <!--<input type="text" v-model="query"  class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2">-->
                                    <!--<div class="input-group-append">-->
                                    <!--<span type="button" @click="searchData" class="btn input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <input v-model="query" type="text" class="form-control" placeholder="Search">
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Total</th>
                                    <th class="text-center">Action</th>
                                </tr>
                                <tr v-show="customers.length" v-for="(customer, index) in customers" :key="customer.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ customer.name }}</td>
                                    <td>{{ customer.email }}</td>
                                    <td>{{ customer.phone }}</td>
                                    <td>{{ customer.total }}</td>
                                    <td class="text-center">
                                        <button type="button" class="btn btn-info btn-sm"><i class="fas fa-eye"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i>
                                        </button>
                                        <button type="button" class="btn btn-danger btn-sm"><i
                                            class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-show="!customers.length">
                                    <td colspan="6">
                                        <strong>Sorry! No data Found</strong>
                                    </td>
                                </tr>
                            </table>
                            <pagination
                                v-if="pagination.last_page > 1"
                                :pagination="pagination"
                                :offset="5"
                                @paginate="query === '' ? getData() : searchData()">
                            </pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                query: '',
                queryField: 'name',
                customers: [],
                pagination: {
                    current_page: 1,

                }
            }
        },

        watch: {
            query: function (newQ, oldQ) {
                if (newQ === '') {
                    this.getData();
                } else {
                    this.searchData();
                }
            }
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                this.$Progress.start();
                axios.get('/api/customers?page=' + this.pagination.current_page)
                    .then(response => {
                        this.customers = response.data.data;
                        this.pagination = response.data.meta;
                        this.$Progress.finish();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$Progress.fail()
                    });
            },

            searchData(e) {
                this.$Progress.start();
                axios.get('/api/search/customers/' + this.queryField + '/' + this.query + '?page=' + this.pagination.current_page)
                    .then(response => {
                        this.customers = response.data.data;
                        this.pagination = response.data.meta;
                        this.$Progress.finish();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$Progress.fail()
                    })
            },

            reload() {
                this.getData();
                this.query = '';
                this.queryField = 'name';

            }
        }
    }
</script>
