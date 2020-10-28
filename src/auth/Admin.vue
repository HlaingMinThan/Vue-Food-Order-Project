<template>
    <div class="Admin">
        <v-container>
            <h2 class="font-weight-light pink--text ma-4">Add Food</h2>
        <v-form
        ref="form"
    >
    <v-text-field
      v-model="food_name"
     
      label="Food Name"
      required
    ></v-text-field>
    <input type="file" style="display: none;" ref="fileInputRef" @change="getImageData" accept="image/*">    
     <v-btn depressed color="orange" @click="targetFile" >add image</v-btn><br>
     <img :src="showSelectImg" width="200px" height="200px" class="ma-3">
    <v-text-field
        label="item1(required)"
        v-model='detail[0].item1'
        >
    </v-text-field>
    <v-text-field
        label="item1 price(required)"
        v-model='detail[0].item1Price'
        >
    </v-text-field>
    <v-text-field
        label="item2"
        v-model='detail[1].item2'
        >
    </v-text-field>
    <v-text-field
        label="item2 price"
        v-model='detail[1].item2Price'
        >
    </v-text-field>
    <p>{{err}}</p>
    <v-spacer></v-spacer>
    <v-btn class="pink white--text mt-4" :loading="loading" @click="addData">Add</v-btn>
    </v-form>
</v-container>
    </div>
</template>
<script>
    import {store,db} from '../firebase/config'
export default {
    name:'admin',
    data() {
        return {
            food_name:'',
            detail:[
                {item1:null,item1Price:null},
                {item2:null,item2Price:null}
            ],
            loading:false,
            err:'',
            imgName:null,
            imgFile:null,
            showSelectImg:''
        }
    },
    methods:{
       addData(){
            // console.log(this.detail);
            this.loading=true
            if(this.food_name && this.detail && this.imgFile){
                

                store.ref('foods/'+this.imgName).put(this.imgFile)
               .then((snapshot)=>{
                return snapshot.ref.getDownloadURL();
               }).then(url=>{
                  return  db.collection('foods').doc(this.food_name).set({
                            details:this.detail,
                            imgUrl:url
                            })
               })
               .then(()=>{
                    // console.log('done')
                    this.loading=false
                    this.$router.push({name:"Home",params:{name:"admin"}});
                })
            }else{
                this.loading=false;
                this.err="please fill all form to continue"
            }
       },
       targetFile(){
           this.$refs.fileInputRef.click();
        //    alert('hi')
       },
       getImageData(e){
            let imgFile=e.target.files[0];
            let filename=imgFile.name;
            // console.log(filename);
            this.imgName=filename;
            this.imgFile=imgFile;
            const fileReader=new FileReader();
            fileReader.readAsDataURL(imgFile);
            fileReader.addEventListener('load',()=>{
                this.showSelectImg=fileReader.result;
              
            })
            
        }
    },
    created() {
        this.$loading(false);
    }
    
}
</script>
<style scoped>
    p{
        text-align: center;
        color: red;
    }
</style>