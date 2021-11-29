import Vue from "vue";
import Vuex from "vuex";

import ModelServices from '../services/ModelServices.js'

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
   },


   getters: { // computed methods

      getModels: (state) => {
         return state.models;
      },

      getModelByIdAndVersion: (state) => (treeNodeData, version) => {
         let isUnitModel = false
         let mainModel = null
         let compoModel = null
         let unitModel = null
         if(treeNodeData.parent == null){
            mainModel = state.models.get(treeNodeData.id)
            compoModel = mainModel.versions.find(m => m.Attributs.version == version) //TODO : change
         } else {
            isUnitModel = true
            mainModel = state.models.get(treeNodeData.parent)
            compoModel = mainModel.versions.find(m => m.Attributs.version == version) //TODO : change
            unitModel = compoModel.Composition.Model.find(m => m.Attributs.id == treeNodeData.id).ModelContent
         }

         return [isUnitModel, mainModel, compoModel, unitModel]
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

      getWordOptions:(state) =>{
         let allWords = Array.prototype.concat([],Object.keys(state.keywordsObj))
         allWords.sort()
         return allWords;
      },

      getAlphabeticListOfModels:(state)=>{
         let modelIds = []
         for(let m of state.models.keys()){
            modelIds.push(m)
         }
         
         return modelIds.sort()
      },

      getListOfPersonalModels:(state)=>{
         let models = []
         if (typeof state.loggedUserInfo.associatedModels === "undefined")
            return models
            
         for(let m of state.models.keys()){
            let index = state.loggedUserInfo.associatedModels.findIndex(mod => mod.modelId == m)
            if (index != -1)
               models.push(state.loggedUserInfo.associatedModels[index])
         }
         
         return models.sort((a,b) => (a.modelId > b.modelId) ? 1 : ((b.modelId > a.modelId) ? -1 : 0))
      },
   },

   mutations: { // synchronous  commit of changes of state

      setModels: (state, models) =>{
         state.models = models;
      },

      addModel: (state, model) => {
         state.models.set(model.id,model)

         for(let k of model.versions[0].metaData.keywords){
            if(!(Object.prototype.hasOwnProperty.call(state.keywordsObj,k))){
               state.keywordsObj[k]=[]
            }
            state.keywordsObj[k].push(model.id)
         }
      },

      deleteModel: (state, model) => {
         state.models.delete(model.id)
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
               ModelServices.getAllModels().then(models =>{ 
                  for(const model of models){
                     commit('addModel', model)
                  }
                  commit('setDataAreLoaded',true)
                  resolve(state.models)
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
               ModelServices.getModelById(modelid).then(savedmodel =>{ 
                  if(savedmodel.model !== undefined){
                     commit('addmodel',savedmodel)
                  }
                  resolve(savedmodel)
               })
            } catch (err) { 
               console.error(err);
               reject(err);
            }
         })
      },

      async saveModel({commit},model){
         const savedmodel = await ModelServices.savemodel(model)
         if(savedmodel.model !== undefined){
            commit('addmodel',savedmodel)
         }
         return savedmodel;
      },

      async deleteModel({commit},model){
         const deletedmodel = await ModelServices.deleteModelById(model.model.Attributs.modelid)
         if(deletedmodel.model !== undefined){
            commit('deletemodel',deletedmodel)
         }
         return deletedmodel;
      },
   }
});

