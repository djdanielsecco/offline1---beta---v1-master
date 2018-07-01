<template>
  <div id="filters" class="container">
    <autocomplete :suggestions="suggestions"   v-model="selection"></autocomplete>
       <button class="btavancar" @click="avancar">AVANÇAR</button>
  </div>
</template>

<script>
     import Swiper from 'swiper'
import Autocomplete from '@/components/comps/Autocomplete'
 var postData = [];
    var opt1 = {};
    // console.log(conf.list);
import * as config from '@/assets/js/config.js'
 
export default {
  name: 'filters',
  components: {
    Autocomplete
  },
  data () {
    return {
      selection: '',
      suggestions: postData
    }
      
  },

    methods: {
         avancar () {
            
              var mySwiper = new Swiper('.swiper-container', {

});
        mySwiper.slideTo(3);
            
        }
        
    },
    mounted: function(){
      if (this.postData === undefined ) {       
fetch(config.urlTree)
    .then(function (response) {
        //console.log(response);
        return response.json();
    })
    .then(function (data) {
  
        window.furlf = data;
      
        //console.log('From web FETCH 1 >', data);
        var dataArray = [];
        var uio = [];
        for (var key in data) {
            dataArray.push(data[key]);
            uio.push(data[key]);
        
        }
        updateUI(dataArray);
      
        window.dados1 = uio;
        // console.log(uio.length + '<???>' + jhg);
        return window.dados1, window.furlf;
    }).catch(function (err) {
        console.log(err);
    });
 function updateUI(data) {
    for (var i = 0; i < data.length; i++) {
        writeData('trees', data[i]);
        //console.log(data);
    }
     
          
        
     
};   }
   
        readAllData('trees')
                    .then(function(data) {
       
                        for (var key in data) {
                           postData.push(data[key]);
                           
                        };
                       
                       window.opt1 =  postData ;
                  
                        console.log(postData);
         return postData;
                    });
    }
    }
    
  
</script>

<style scoped lang="scss">
#filters {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
    button.btavancar {
    color: aliceblue;
background-color: #000;
	font-size: 1em;
	padding: 1em 2em;
        margin: 1em;
	border: none !important;
	border-radius: 5em;
	box-shadow: none;
}
</style>