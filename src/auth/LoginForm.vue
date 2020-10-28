<template>
    <div class="Login_Form">
        <v-container>
            <h2 class="ma-3 pink--text font-weight-light">Admin Control</h2>

            <v-form>
                <v-text-field
                    label="Email"
                    v-model="email"
                    required
                ></v-text-field>
                <v-text-field
                    required
                    label="password"
                    type="password"
                    v-model="password"
                ></v-text-field>
                <p class="red--text">{{err}}</p>
                <v-btn color="pink white--text ml-3" class="ml-3" @click="login">
                    Login
                </v-btn>
                <v-btn color="orange white--text ml-3" @click="backRegister">
                    back
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>
<script>
    import {auth} from '../firebase/config'
export default {
    name:'Loginin_Form',
    data() {
        return {
            email:'',
            password:'',
            err:''
        }
    },
    methods: {
        login(){
                this.$loading(true);
          if(this.email=='saeda2011@gmail.com'){
            auth.signInWithEmailAndPassword(this.email,this.password)
            .then(()=>{
                this.$router.push({name:'Admin'})
            })
            .catch((err)=>{
                this.err=err.message;
                this.$loading(false);
            })
          }else{
              this.err="You Are Not Admin"
              this.$loading(false);
          }
        },
        backRegister(){
            this.$router.push({name:"UserSetUp"})
        }
    },
    created(){
        this.$loading(false);
    }
}
</script>