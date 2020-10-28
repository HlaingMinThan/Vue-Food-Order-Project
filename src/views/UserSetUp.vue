<template>
    <div class="UserSetUp">
      <v-card>
        <h2 Class="font-weight-light pink--text ma-5">Register for using app</h2>
        <v-container>
            <v-form>
                <v-text-field
                    v-model="name"
                    label="Name"
                >
    
                </v-text-field>
                <vue-tel-input-vuetify v-model="phone" @country-changed="countryChanged"></vue-tel-input-vuetify>
                <p class="red--text" v-if="error">{{error}}</p>
                <v-btn small class="orange" @click="getVerificationNum">send code</v-btn>
                <v-text-field
                    label=" Enter Verification Number"
                    v-model="code"
                    
                >
                </v-text-field>
                <div id="recaptcha-container"></div>
                
                <router-link :to="{name:'Admin'}" class="pink--text">Admin Panel</router-link><br>
                <v-btn class="pink white--text mt-5" @click="register">Register Now</v-btn>
                <p class="red--text" v-if="err">{{err}}</p>
            </v-form>
        </v-container>
      </v-card>
    </div>
  </template>
  <script>
    import {auth} from '../firebase/config'
    import {db} from '../firebase/config'
    import firebase from 'firebase'
  export default {
    name:"UserSetUp",
    data() {
        return {
            name:'',
            phone:'',
            code:'',
            appVerifier:'',
            country:'',
            error:'',
            err:'',
            usersPhone:[],
            same:false
        }
    },
    methods: {
        countryChanged(country) {
            this.country = country.dialCode
            this.phone+=`+${this.country}`;
        },
        getVerificationNum(){
            let appVerifier = this.appVerifier
          
            auth.signInWithPhoneNumber(this.phone, appVerifier)
              .then(function (confirmationResult) {
                //   this.code=confirmationResult;
                window.confirmationResult = confirmationResult;
                // console.log(confirmationResult);
  
                alert('SMS sent')
              }).catch(err=> {
                // console.log(err.message);
                this.error=err.message;
            });
        },
        register(){
          if(window.confirmationResult && this.name && this.phone && this.code){
              this.err="";
              // user input code
            let code = this.code
              // check user's phone num
            db.collection('users').doc(auth.currentUser.uid).get()
                  .then(doc=>{
                
                      this.usersPhone.push(doc.data().phoneNum);
                
                    })
            window.confirmationResult.confirm(code).then((snapshot)=> {

              this.$loading(true);
             this.usersPhone.forEach(phone=>{
               if(phone==this.phone){
                 this.same=true;
               }
             })
             if(this.same){
              this.$router.push({name:'Home',params:{name:this.name}});
             }else{
              // adding new user
              db.collection('users').doc(snapshot.user.uid).set({
                username:this.name,
                phoneNum:this.phone
              }).then(()=>{

                this.$router.push({name:'Home',params:{name:this.name}});
              })
              //

             }
            }).catch( (err)=> {
                console.log(err);
            });
          }else{
              this.err="please fill all the field"
          }
        }
       
    },
    created() {
      this.$loading(false);
        // *** start init recaptha app verifier for phone authenication***
        //***** for getting this appverfier **
        setTimeout(()=>{
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
              'size': 'invisible',
              'callback': function() {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
              },
              'expired-callback': function() {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
              }
            });
            
            // this app verifier will use in the signInWithPhoneNumber method
            this.appVerifier =  window.recaptchaVerifier
          },1000);
         
          // check user is login or not
          auth.onAuthStateChanged(user=>{
            if(user){
              if(user.uid=="gbbzhv4AV7b8gT6EONgbu8Dd4AA2"){
                   this.$router.push({name:'Home',params:{name:'admin'}});
              }else{

              this.$loading(true);
              db.collection('users').doc(user.uid).get().then(doc=>{
                

                this.$router.push({name:'Home',params:{name:doc.data().username}});
                
                 });
              }
              
            }else{
              this.$router.push({name:'UserSetUp'});
            }
             
             
          })
              
           
           
         
              
    },

  }
  </script>
  <style scoped>
      .container{
          padding:40px
      }
  </style>


