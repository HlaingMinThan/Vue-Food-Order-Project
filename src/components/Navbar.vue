<template>
    <div class="Navbar">
              <v-app-bar  app  color="pink" height="100">
                <v-app-bar-nav-icon v-if="user"  color="white" @click="sidebar=true" ></v-app-bar-nav-icon>
          
                <v-toolbar-title class="white--text">
                  <span class="font-weight-light ml-5">Thin Hlaing Aye </span>
                  <span class="yellow--text font-weight-bold">FOODSTUFF</span>
                  
                 
                </v-toolbar-title>
          
                <v-spacer></v-spacer>
          
                
              </v-app-bar>
          
              <v-navigation-drawer
              class="pink"
              app
              dark
             temporary
              v-model="sidebar"
            >
              
            <v-list v-if="customer.username">
              <router-link :to="{name:'UserProfile'}">
                
                <v-list-item
                    link
                  >
                    <v-list-item-icon>
                      <v-icon color="">mdi-account</v-icon>
                    </v-list-item-icon>
          
                    <v-list-item-content>
                      <v-list-item-title class="yellow--text">{{ customer.username }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
              </router-link>
              </v-list>
            <v-list v-if="admin">
              <router-link :to="{name:'Admin'}">
                
                <v-list-item
                    link
                  >
                    <v-list-item-icon>
                      <v-icon color="">mdi-account</v-icon>
                    </v-list-item-icon>
          
                    <v-list-item-content>
                      <v-list-item-title class="yellow--text">admin</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
              </router-link>
              </v-list>
              <v-list  v-for="item in items"
              :key="item.title">
              <router-link :to="item.route">

                <v-list-item
                    link
                  >
                    <v-list-item-icon>
                      <v-icon color="">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
          
                    <v-list-item-content>
                      <v-list-item-title class="yellow--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  
              </router-link>
              </v-list>
             
              
              <template v-slot:append>
                <div class="pa-2 mb-5">
                  
                  <v-btn block @click="logout" id="logout">Logout</v-btn>
                </div>
              </template>
            </v-navigation-drawer>
          
    </div>
</template>
<script>
  import {auth} from '../firebase/config'
  import {db} from '../firebase/config'
export default {
    name:"Navbar",
    data() {
      return {
        sidebar:false,
        items:[
          
          {title:'Home',route:'/home/',icon:'mdi-food'},
          {title:'Contact',route:'/contact',icon:'mdi-account-box'}
        ],
        user:{},
        customer:{},
        admin:false
       
      }
    },
    methods: {
      logout(){
          this.$loading(true);
         
            auth.signOut().then(()=>{
              this.$router.push({name:'UserSetUp'})
            })
          
       
      },
      
    },
    computed: {
      
    },
    created(){
      
      auth.onAuthStateChanged((user) =>{
        if (user) {
          if(user.email=="saeda2011@gmail.com"){
            this.admin=true,
            this.items[0].route='/home/admin';
          }else{
            this.admin=false;
          db.collection('users').doc(user.uid).get().then(doc=>{
            if(doc.data()){
                this.customer=doc.data();
                this.items[0].route='/home/';
                this.items[0].route+=doc.data().username;
              }
          })  
          }
        // this.$loading(false);
        
          this.user=user
        } else {
          // No user is signed in.
          this.user=null
          this.$loading(false);
        }
      });
      
     
    },
   
}
</script>

<style scoped>
  .v-toolbar__title span{
    margin:5px;
  }
  a{
    text-decoration: none;
  }
  #logout{
    /* color:red; */
    margin-bottom: 35px;
  }
</style>