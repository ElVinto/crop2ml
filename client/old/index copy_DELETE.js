import Vue from "vue";
import Vuex from "vuex";

import DBServices from './DBServices_DELETE.js'

Vue.use(Vuex);


export default new Vuex.Store({

   state: {

   /**
    * catalog.get(modelId) = model documents
    */

     modelUnits : new Map(),
     modelCompositions : new Map(),

     dataAreloaded:false,
     currentNavPath: null

   },


   getters: { // computed methods

      getModels: (state) => {
         return state.modelUnits;
      },

      getModelIds: (state) => {
         const mus= state.modelUnits;
         return mus.keys();
      },

      getModelCompositions: (state) =>{
         return state.modelCompositions
      },

      getDataAreLoaded:(state) =>{
         return state.dataAreloaded
      }

      

   },

   mutations: { // synchronous  commit of changes of state

      setModels: (state, modelUnits) =>{
         state.modelUnits = modelUnits;
      },

      addModel: (state, jsonObj) => {
         const modelid = jsonObj.Model.Attributs.modelid
         state.modelUnits.set(modelid,jsonObj)
      },

      deleteModel: (state, jsonObj) => {
         const modelid = jsonObj.Model.Attributs.modelid
         state.modelUnits.delete(modelid)
      },

      setModelCompositions : (state, modelCompositions) =>{
         state.modelCompositions =modelCompositions
      },

      addModelCompositions: (state, jsonObj) => {
         const modelid = jsonObj.ModelComposition.Attributs.modelid
         state.modelcomposition.set(modelid,jsonObj)
      },


      setDataAreLoaded: (state, bool) =>{
         state.dataAreloaded =bool
      },
      
      setCurrentNavPath: (state,val) =>{
         state.currentNavPath=val;
      },


   },

   actions: { // assynchronous commit of changes

      async initModels({ state, commit }) {

         return new Promise((resolve, reject) => {
            
            try { 
               console.log('START initModels')

                 
               DBServices.getModels().then(modelUnits =>{ 

                  for(const modelUnit of modelUnits){
                     commit('addModel', modelUnit)
                  }
                  commit('setDataAreLoaded',true)

                  console.log('state.modelUnits')
                  console.log(state.modelUnits)

                  console.log('END initModels')
                  resolve(state.modelUnits)

                  
               })

            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })
      },

      async reInitModel({commit},modelid){
         return new Promise((resolve, reject) => {
            try { 
               console.log("START reInitModel "+modelid)

               DBServices.getModelById(modelid).then(savedModel =>{ 
                  
                  if(savedModel.Model !== undefined){
                     console.log('savedModel')
                     console.log(savedModel)
                     commit('addModel',savedModel)
                  }

                  console.log("END reInitModel "+modelid)
                  resolve(savedModel)
               })

            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })
      },


      async saveModel({commit},modelUnit){

         console.log("START saveModel")
         console.log(modelUnit)

         const savedModel = await DBServices.saveModel(modelUnit)

         if(savedModel.Model !== undefined){
            commit('addModel',savedModel)
         }
         

         console.log(savedModel)
         console.log("END saveModel")

         return savedModel;
      },

      async deleteModel({commit},modelUnit){

         console.log("START STORE deleteModel")
         

         const deletedModel = await DBServices.deleteModelById(modelUnit.Model.Attributs.modelid)

         console.log("deletedModel")
         console.log(deletedModel)

         if(deletedModel.Model !== undefined){
            commit('deleteModel',deletedModel)
         }
         
         console.log(deletedModel)

         console.log("END STORE deleteModel")

         return deletedModel;
      }
   
   }
});

