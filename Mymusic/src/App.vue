<template>
  <div id="app">
    
    <router-view/>
    <!--<router-link to="/play">-->
    <Play class='play'/>
    <!--</router-link>-->
    <div class="playbottom"></div>
  </div>
</template>

<script>
	import Play from '@/components/play'
export default {
	
  name: 'App',
  components:{
			Play
		},
  created() {
    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("store",JSON.stringify(this.$store.state))
    })
	}
}

</script>

<style>
*{margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-text-size-adjust:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}
img{border:none;max-width:100%;vertical-align:middle;}
body,p,form,input,button,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6{margin:0;padding:0;list-style:none;overflow-x:hidden}
h1,h2,h3,h4,h5,h6{font-size:100%;}
input,textarea{-webkit-user-select:text;-ms-user-select:text;user-select:text;-webkit-appearance:none;font-size:1em;line-height:1.5em;}
table{border-collapse:collapse;}
input,select,textarea{outline:none;border:none;background:none;}
a{outline:0;cursor:pointer;*star:expression(this.onbanner=this.blur());}
a:link,a:active{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{color:#f00;text-decoration:none;}
a{text-decoration:none;-webkit-touch-callout:none;}
em,i{font-style:normal;}
li,ol{list-style:none;font-size: 14px;}
html{font-size:16px;}
.clear{clear:both;height:0;font-size:0;line-height:0;visibility:hidden; overflow:hidden;}
.fl{float:left;}
.fr{float:right;}
body{ margin:0 auto;max-width:670px; min-width:320px;color:#000;background:#f1f1f1;height:100%;}
a{color: #222;text-decoration: none}

	.playbottom{
		width: 100%;
		height: 60px;
	}
</style>
