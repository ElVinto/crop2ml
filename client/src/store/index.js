import Vue from "vue";
import Vuex from "vuex";

import DBServices from '../services/DBServices.js'

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

      getModelUnits: (state) => {
         return state.modelUnits;
      },

      getModelUnitIds: (state) => {
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

      setModelUnits: (state, modelUnits) =>{
         state.modelUnits = modelUnits;
      },

      addModelUnit: (state, jsonObj) => {
         const modelid = jsonObj.ModelUnit.Attributs.modelid
         state.modelUnits.set(modelid,jsonObj)
      },

      deleteModelUnit: (state, jsonObj) => {
         const modelid = jsonObj.ModelUnit.Attributs.modelid
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

      async initModelUnits({ state, commit }) {

         return new Promise((resolve, reject) => {
            
            try { 
               console.log('START initModelUnits')

                 
               DBServices.getModelUnits().then(modelUnits =>{ 

                  for(const modelUnit of modelUnits){
                     commit('addModelUnit', modelUnit)
                  }
                  commit('setDataAreLoaded',true)

                  console.log('state.modelUnits')
                  console.log(state.modelUnits)

                  console.log('END initModelUnits')
                  resolve(state.modelUnits)

                  
               })

            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })
      },

      async reInitModelUnit({commit},modelid){
         return new Promise((resolve, reject) => {
            try { 
               console.log("START reInitModelUnit "+modelid)

               DBServices.getModelUnitById(modelid).then(savedModelUnit =>{ 
                  
                  if(savedModelUnit.ModelUnit !== undefined){
                     console.log('savedModelUnit')
                     console.log(savedModelUnit)
                     commit('addModelUnit',savedModelUnit)
                  }

                  console.log("END reInitModelUnit "+modelid)
                  resolve(savedModelUnit)
               })

            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })
      },


      async saveModelUnit({commit},modelUnit){

         console.log("START saveModelUnit")
         console.log(modelUnit)

         const savedModelUnit = await DBServices.saveModelUnit(modelUnit)

         if(savedModelUnit.ModelUnit !== undefined){
            commit('addModelUnit',savedModelUnit)
         }
         

         console.log(savedModelUnit)
         console.log("END saveModelUnit")

         return savedModelUnit;
      },

      async deleteModelUnit({commit},modelUnit){

         console.log("START STORE deleteModelUnit")
         

         const deletedModelUnit = await DBServices.deleteModelUnitById(modelUnit.ModelUnit.Attributs.modelid)

         console.log("deletedModelUnit")
         console.log(deletedModelUnit)

         if(deletedModelUnit.ModelUnit !== undefined){
            commit('deleteModelUnit',deletedModelUnit)
         }
         
         console.log(deletedModelUnit)

         console.log("END STORE deleteModelUnit")

         return deletedModelUnit;
      }
   
   }
});

