<template>
  <div>
    <div>
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand href="#">
          <img src="./Images/moovingLogoBlanco.png" alt= "Logo" style= "width:100px;">
        </b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item style="text-align: center"><router-link :to="{path: '/motospagemechanic', query: { email: this.email } }">Motorbikes</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="row text-center" style="margin-top: 20px; margin-left: 10px; margin-right: 10px">
        <div class="col-sm-6 sm-4">
          <img class="rounded z-depth-2" alt="100x200" src="./Images/iconPremium.png"
               data-holder-rendered="true" v-if="this.moto.type === 'premium'">
          <img class="rounded z-depth-2" alt="100x200" src="./Images/iconNormal.png"
               data-holder-rendered="true" v-else-if="this.moto.type === 'basic'">
          <b-button disabled size="lg" style="margin-left: 60px;">ID: #{{this.id}}</b-button>
        </div>
      </div>
      <div id="prof" style="margin-top: 20px;">
        <div class="col-sm-8">
          <div class="card sm-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0"><strong>License Plate</strong></h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <strong>{{ this.moto.matricula }}</strong>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0"><strong>State</strong></h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <strong>{{ this.moto.state }}</strong>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Time since last revision</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.time_since_last_check }} days
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Km since last revision</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.km_since_last_check }} km
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Total km</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.km_total }} km
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Total time</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.time_total }} days
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Type</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.type }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Battery</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.km_restantes }} km
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Distance</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.distance }} m
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Street<b-icon icon="geo-alt-fill"></b-icon></h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ this.moto.address }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 20px;margin-bottom: 20px; margin-left: 16px; margin-right: 15px">
        <!-- Boton para eliminar la moto -->
        <div style="margin-left: 0px; margin-right: 10px">
          <button class="btn"
                  id="deleteButton"
                  :disabled="is_active||is_reserved"
                  type="button"
                  @click="deleteMotorbike()"
                  style="border-radius: 12px;
                background-color: #ff6961;color: #ffffff; width: 150px">
            Delete
          </button>
        </div>
        <!-- btn para modificar la moto -->
        <div style="margin-right: 0px; margin-left: 18px">
          <button class="btn"
                  id="modifyButton"
                  :disabled=deshabilitar
                  type="button"
                  @click="modifyMotorbikeForm()"
                  style="border-radius: 12px;
                background-color: #343a40;color: #42b983; width: 150px">
            Modify
          </button>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      id: 0,
      deshabilitar: false,
      moto: {
        matricula: '',
        state: '',
        time_since_last_check: 0,
        km_since_last_check: 0,
        km_total: 0,
        time_total: 0,
        type: '',
        km_restantes: 0.0,
        address: ''
      },
      is_active: false,
      is_reserved: false
    }
  },
  created () {
    this.email = this.$route.query.email
    this.id = this.$route.query.id
    this.getMotoInfo()
  },
  methods: {
    getMotoInfo () {
      const path = process.env.VUE_APP_CALL_PATH + '/mechanicMoto' + '/' + this.id
      console.log(process.env.VUE_APP_CALL_PATH + '/mechanicMoto' + '/' + this.id)
      axios.get(path)
        .then((res) => {
          this.moto.matricula = res.data.mechanic_moto.matricula
          this.moto.state = res.data.mechanic_moto.state
          this.moto.time_since_last_check = res.data.mechanic_moto.time_since_last_check
          this.moto.km_since_last_check = res.data.mechanic_moto.km_since_last_check
          this.moto.km_total = res.data.mechanic_moto.km_total
          this.moto.time_total = res.data.mechanic_moto.time_total
          this.moto.type = res.data.mechanic_moto.type
          this.moto.km_restantes = res.data.mechanic_moto.km_restantes
          this.moto.distance = res.data.mechanic_moto.distance
          this.moto.address = res.data.mechanic_moto.address
          this.deshabilitar = (this.moto.state === 'ACTIVE') || (this.moto.state === 'RESERVED')
          console.log(res.data.mechanic_moto)
          if (this.moto.state === 'ACTIVE') {
            this.is_active = true
          } else if (this.moto.state === 'RESERVED') {
            this.is_reserved = true
          }
        })
        .catch((error) => {
          console.error(error)
          alert(error)
        })
    },
    modifyMotorbikeForm () {
      // El mecanico accede a un formulario para modificar la moto
      this.$router.push({ path: '/modifyMotoForm', query: { email: this.email, id: this.id } })
    },
    deleteMotorbike () {
      // Llamada a la API para eliminar la moto
      const path = process.env.VUE_APP_CALL_PATH + '/moto' + '/' + this.id
      console.log(process.env.VUE_APP_CALL_PATH + '/moto' + '/' + this.id)
      axios.delete(path)
        .then((res) => {
          // Si hay exito, routear a la pagina de lista de motos
          console.log(res.data.message)
          this.$router.push({ path: '/motospagemechanic', query: { email: this.email } })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#prof {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 50px;
}
</style>
