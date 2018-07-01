<template>
  <div class="container" ref="container">

    <video v-show="showVideo" class="source" ref="video" :width="videoWH.width" :height="videoWH.height" muted preload="none" >
    </video>
         <canvas v-show="showPlay" ref="canvas"></canvas>
    <button class="btavancar" @click="test2">Toggle Video</button>
  <!--  <button @click="$emit('delete-row')">tetete</button>-->
   
    <!--<button v-show="showPlay" @click="run">Play!</button>-->
  </div>
</template>

<script>
import jsQR from "jsqr";
import {eventHub} from '@/main.js'
export default {
  name: "vue-qr-reader",
  props: {
    useBackCamera: {
      type: Boolean,
      default: true
    },
    stopOnScanned: {
      type: Boolean,
      default: true
    },
    drawOnFound: {
      type: Boolean,
      default: true
    },
    lineColor: {
      type: String,
      default: "#FF3B58"
    },
    lineWidth: {
      type: Number,
      default: 2
    },
    videoWidth: {
      type: Number,
      default: 320
    },
    videoHeight: {
      type: Number,
      default: 240
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        showVideo: false,
      showPlay: false,
      containerWidth: null,
      active: false
    };
  },
  computed: {
      
      
    videoWH() {
      if (this.containerWidth) {
        const width = this.containerWidth;
        const height = width * 0.75;
        return { width, height };
      }
     //return { width: 100%, height: 100% };
     return { width: this.videoWidth, height: this.videoHeight };
    }
  },
    events:{
        eve1: function(data){
            
            console.log(data);
        }
        
    },
  
  methods: {
      test2(){
          this.showVideo = !this.showVideo;
       this.setup();
          this.run();
          
      },
    drawLine(begin, end) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = this.lineWidth;
      this.canvas.strokeStyle = this.lineColor;
      this.canvas.stroke();
    },
    drawBox(l) {
      if (this.drawOnFound) {
        this.drawLine(l.topLeftCorner, l.topRightCorner);
        this.drawLine(l.topRightCorner, l.bottomRightCorner);
        this.drawLine(l.bottomRightCorner, l.bottomLeftCorner);
        this.drawLine(l.bottomLeftCorner, l.topLeftCorner);
      }
    },
    tick() {
      if (
        this.$refs.video &&
        this.$refs.video.readyState === this.$refs.video.HAVE_ENOUGH_DATA
      ) {
        this.$refs.canvas.height = this.videoWH.height;
        this.$refs.canvas.width = this.videoWH.width;
        this.canvas.drawImage(
          this.$refs.video,
          0,
          0, 
          this.$refs.canvas.width,
          this.$refs.canvas.height
        );
        const imageData = this.canvas.getImageData(
          0,
          0, 
          this.$refs.canvas.width,
          this.$refs.canvas.height
        );
        let code = false;
        try {
          code = jsQR(imageData.data, imageData.width, imageData.height);
        } catch (e) {
          // sometimes JSQR may fail, but we can carry on.
          console.error(e);
        }
        if (code) {
          this.drawBox(code.location);
          this.found(code.data);
        }
      }
      this.run();
    },
    setup() {
      if (this.responsive) {
        this.$nextTick(() => {
          this.containerWidth = this.$refs.container.clientWidth;
        });
      }
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.previousCode = null;
        this.parity = 0;
        this.active = true;
        this.canvas = this.$refs.canvas.getContext("2d");
        const facingMode = this.useBackCamera
          ? { exact: "environment" }
          : "user";
        const handleSuccess = stream => {
          this.$refs.video.srcObject = stream;
          const playPromise = this.$refs.video.play();
          playPromise.catch(() => (this.showPlay = true));
          playPromise.then(this.run);
        };
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode } })
          .then(handleSuccess)
          .catch(() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(handleSuccess);
          });
      }
    },
    run() {
      if (this.active) {
          
           // const playPromise = this.$refs.video.play();
         // playPromise.catch(() => (this.showPlay = true));
        window.requestAnimationFrame(this.tick);
          
         var playPromise = this.$refs.video.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }
           //this.showPlay = true;
      }
    },
    found(code) {
      if (this.previousCode !== code) {
        this.previousCode = code;
      } else if (this.previousCode === code) {
        this.parity += 1;
      }
      if (this.parity > 2) {
        this.active = this.stopOnScanned ? false : true;
        this.parity = 0;
        this.$emit("code-scanned", code);
          //this.$emit('imgOpen');
         // this.$refs.video.stop();
         // this.fullStop();
         // this.showPlay = false;
          //this.$refs.canvas.style.display = 'none';
          //this.$refs.video.style.display = 'none';
      }
    },
    fullStop() {
      if (this.$refs.video && this.$refs.video.srcObject) {
        this.$refs.video.srcObject.getTracks().forEach(t => t.stop())
      }
    }
  },
      created() {
          
        var ooo = this.showPlay;
        this.$watch('containerWidth', function(val){
                console.log(">>>>>>>>>>>>>>>>>   ->", val);
                
            });
        eventHub.$on('runn', function() {
         console.log(">>>", ooo);
          console.log('rummmmmmm');
          
      })
        
    },
  mounted() {
     var oooo = this.showPlay;
    //this.setup();
        eventHub.$on('eve', function() {
          console.log(oooo, '<><><><>');
      
          
      });
      
      
   /*setTimeout(function(){
        this.run();
   },2000);*/
  },
  beforeDestroy () {
    this.fullStop();
  },
  watch: {
    active: {
      immediate: true,
      handler(active) {
          if (!active) {
            this.fullStop();
          }
      }
    }
  }
};
</script>

<style scoped="true" lang="scss">
.container {
    padding: 1%;
  width: 100%;
  height: auto;
}
      button.btavancar {
             
        color: aliceblue;
        background-color: #000;
        font-size: .5em;
        width: 100px;
        padding: 1em 2em;
        margin: 1em;
        border: none !important;
        border-radius: 3px;
        box-shadow: none;
    }
</style>
