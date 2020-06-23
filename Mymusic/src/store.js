import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 5,
    playlistid:'',
    songid:'',
    oldsongid:'',
    songlist:[],
   	timehistory:''
  },
  mutations: {
     sendurl(state,playlistid) {
      state.playlistid = playlistid
    },
    setsongid(state,songid){
    	state.songid = songid
    },
    setoldsongid(state,oldsongid){
    	state.oldsongid = oldsongid
    },
    setsonglist(state,songlist){
    	state.songlist = songlist
    },
    settimehistory(state,timehistory){
    	state.timehistory = timehistory
    }
  }
})