import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
var store = new Vuex.Store({
    strict: true,
    state:{
      count:1,
      list:[{
        name:'sss',
        sex:'male',
      },{
        name:'ttt',
        sex:'male'
      },{
        name:'yy',
        sex:'female'
      }]
    },
    getters:{
      getCount(state){
        return state.count
      },
      male(state){
          return state.list.filter((item)=>{return item.sex=='male'})
      },
      female(state){
        return state.list.filter((item)=>{return item.sex='female'})
    }
    },
    //用来管理mutations
    actions:{
      add({commit,state},payload){
        commit('add',payload);
      },
      reduce({commit,state},payload){
        commit('reduce',payload);
      } 
    },
    mutations:{
      add(state,payload){
        state.count += payload.step;
      },
      reduce(state,payload){
        state.count -= payload.step;
      }
    }
  });

  export default store;