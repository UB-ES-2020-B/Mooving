<template>
  <div id="app" style="margin-top: 0">
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
            <b-nav-item><router-link :to="{path: '/motospagemechanic', query: { email: this.email } }">Motorbikes</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- Title of the page -->
    <h1> {{ name }} </h1>
    <!-- btn para añadir nuevas motos -->
    <div class="text-sm-center" style="margin-top: 10px; margin-right: 10px; margin-left: 10px; margin-bottom: 20px;">
        <button class="btn"
                id="AddButton"
                type="button"
                @click="motoForm()"
                style="margin-left: 20px;margin-right: 20px;border-radius: 12px;
                background-color: #343a40;color: #42b983; width: 150px">
          Add Motorbike
        </button>
    </div>
    <!-- Lista de motos para el mecanico-->
    <div class="list-group" v-if="is_mechanic">
      <!-- Mostrar cabecera y lista solo si hay elementos -->
      <div id="lista_motos_mechanic" v-if="motorbikes.length>0" class="center-screen">
        <button v-for="item in motorbikes" :key="item.license_plate" type="button" class="list-group-item list-group-item-action" @click="checkMoto(item.id)">
          <div class="row">
            <div class="col-sm" style="font-weight: bold;">{{item.license_plate}}</div>
            <div class="col-sm" style="font-weight: bold;">State: {{item.state}}</div>
            <div class="col-sm">Distance: {{item.distance}}m</div>
            <div class="col-sm">Type: {{item.type}}</div>
          </div>
        </button>
      </div>
      <!-- Mensaje si no hay motos que el mecanico necesite reparar -->
      <!-- Obs: inicialmente deberia ser motorbikes.items.length pero al recibir la llamada del axios es sin el items-->
      <div id="no_motos_mechanic" v-if="motorbikes.length===0" class="center-screen">
        <p>{{message_no_motos_mechanic_to_check}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: 'Motorbikes',
      email: '',
      motorbikes: {
        items: []
      },
      message_no_motos_mechanic_to_check: 'No motos to check',
      is_mechanic: true
    }
  },
  created () {
    this.getMotosToCheck() // Gets the motos that need to be checked by the mechanic
    this.email = this.$route.query.email
  },
  methods: {
    checkMoto (id) {
      // El mecanico accede a una pagina con mas info de la moto
      this.$router.push({ path: '/mechanicMoto', query: { id: id, email: this.email } })
    },
    getMotosToCheck () {
      const path = process.env.VUE_APP_CALL_PATH + '/mechanicMotos'
      axios.get(path)
        .then((res) => {
          this.motorbikes = res.data.motos
          console.log(res.data.motos)
        })
        .catch((error) => {
          console.error(error)
          alert(error)
        })
    },
    motoForm () {
      // El mecanico accede a un formulario para añadir una moto
      this.$router.push({ path: '/motoForm', query: { email: this.email } })
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
</style>

