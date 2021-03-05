import Vue from "vue";
import Vuex from "vuex";

import DBServices from '../services/DBServices.js'
import ClientServerJsonModel from '../services/ClientServerJsonModel.js'

Vue.use(Vuex);


export default new Vuex.Store({

   state: {

   /**
    * catalog.get(modelId) = model 
    */
     models : new Map(),

     dataAreloaded:false,
     currentNavPath: null,

     loggedUserInfo: null,

     keywordsObj: {},
     tagsObj: {},


   },


   getters: { // computed methods

      getModels: (state) => {
         return state.models;
      },

      getModelIds: (state) => {
         return state.models.keys();
      },


      getDataAreLoaded:(state) =>{
         return state.dataAreloaded
      },

      getLoggedUserEMail:(state) =>{
         return state.loggedUserInfo.email
      },
      
      getLoggedUserInfo:(state) =>{
         return state.loggedUserInfo
      },

      getKeywords:(state) =>{
         return Object.keys(state.keywordsObj)
      },

      getTags:(state) =>{
         return Object.keys(state.tagsObj)
      },

      getWordOptions:(state) =>{


         let allWords = Array.prototype.concat([],Object.keys(state.keywordsObj))
         

         for(let t in state.tagsObj){
            if(!(allWords.includes(t))){
               allWords.push(t)
            }
         }

         allWords.sort()

         return allWords;
      },

      getAlphabeticListOfModels:(state)=>{
         let modelIds = []
         for(let m of state.models.keys()){
            modelIds.push(m)
         }
         
         return modelIds.sort()
      }



   },

   mutations: { // synchronous  commit of changes of state

      setModels: (state, models) =>{
         state.models = models;
      },

      addModel: (state, model) => {
         const idValue = model.metaData.idValue
         state.models.set(idValue,model)

         for(let k of model.metaData.keywords){
            if(!(Object.prototype.hasOwnProperty.call(state.keywordsObj,k))){
               state.keywordsObj[k]=[]
            }
            state.keywordsObj[k].push(idValue)
         }


         for(let t of model.metaData.tags){
            
            if(!(Object.prototype.hasOwnProperty.call(state.tagsObj,t))){
               state.tagsObj[t]=[]
            }
            state.tagsObj[t].push(idValue)
         }
         
         
      },

      deleteModel: (state, model) => {
         const modelid = model.metaData.idValue
         state.models.delete(modelid)
      },


      setDataAreLoaded: (state, bool) =>{
         state.dataAreloaded =bool
      },
      
      setCurrentNavPath: (state,val) =>{
         state.currentNavPath=val;
      },

      setLoggedUserInfo:(state,val) =>{
         state.loggedUserInfo =val
      }


   },

   actions: { // assynchronous commit of changes

      async initModels({ state, commit }) {

         return new Promise((resolve, reject) => {
            
            try { 
               console.log('START initModels')

                 
               ClientServerJsonModel.findAllJsonModels().then(models =>{ 

                  for(const model of models){
                     commit('addModel', model)
                  }
                  commit('setDataAreLoaded',true)

                  console.log('state.models')
                  console.log(state.models)

                  console.log('END initModels')
                  resolve(state.models)
                  
               })

            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })
      },

      async reInitmodel({commit},modelid){
         return new Promise((resolve, reject) => {
            try { 
               console.log("START reInitmodel "+modelid)

               DBServices.getmodelById(modelid).then(savedmodel =>{ 
                  
                  if(savedmodel.model !== undefined){
                     console.log('savedmodel')
                     console.log(savedmodel)
                     commit('addmodel',savedmodel)
                  }

                  console.log("END reInitmodel "+modelid)
                  resolve(savedmodel)
               })

            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })
      },


      async savemodel({commit},model){

         console.log("START savemodel")
         console.log(model)

         const savedmodel = await DBServices.savemodel(model)

         if(savedmodel.model !== undefined){
            commit('addmodel',savedmodel)
         }
         

         console.log(savedmodel)
         console.log("END savemodel")

         return savedmodel;
      },

      async deletemodel({commit},model){

         console.log("START STORE deletemodel")
         

         const deletedmodel = await DBServices.deletemodelById(model.model.Attributs.modelid)

         console.log("deletedmodel")
         console.log(deletedmodel)

         if(deletedmodel.model !== undefined){
            commit('deletemodel',deletedmodel)
         }
         
         console.log(deletedmodel)

         console.log("END STORE deletemodel")

         return deletedmodel;
      },


      initKeywords({ state, commit }){

         return new Promise((resolve, reject) => {
            
            try { 
               console.log('START initKeywords')

               ClientServerJsonModel.findAllJsonModels().then(models =>{ 

                  for(const model of models){
                     commit('addModel', model)
                  }
                  commit('setDataAreLoaded',true)

                  console.log('state.models')
                  console.log(state.models)

                  console.log('END initKeywords')
                  resolve(state.models)
                  
               })

            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })

      },



      

   
   }
});

