import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        hasSaveContent:false,
        searchKey:'',
        addFileSaveList:{
            lookFileParams: {
                userIds: "",
                fileId: "",
                operationStyleId: 1
              },
              updateFileParams: {
                userIds: "",
                operationStyleId: 1,
                fileId: ""
              },
              deleteFileParams: {
                userIds: "",
                operationStyleId: 1,
                fileId: ""
              },
            lookFilePower:[] ,
            editFilePower:[] ,
            delFilePower:[] ,
            addFileListParams:{
                title:'',
                fileStyle:'',
                fileStyleId:'',
                photoUrl:'',
                fileUrl:'',
                content:'',
                filesize:'',
                describle:'',
                fileType:''
            },
            fujainList:[],
            photoUrlList:[]
        }
    },
    mutations:{
        getSearchKey(state,val){
          state.searchKey=val;
        },
        setHasSaveContent(state,val){
            state.hasSaveContent=val;
        },
        getPhotoUrlList(state,powers){
            if(powers.length>0){
                state.addFileSaveList.photoUrlList=powers;
                console.log(state.addFileSaveList.photoUrlList)
            }
        },
        getlookFileParams(state,pramas){
            state.addFileSaveList.lookFileParams=pramas;
            console.log(state.addFileSaveList.lookFileParams)
        },
        getLookpower(state,powers){
            if(powers.length>0){           
                state.addFileSaveList.lookFilePower.push(powers[0]);
            }
        },
        getupdateFileParams(state,pramas){
            state.addFileSaveList.updateFileParams=pramas;
        },
        getEditpower(state,powers){
            if(powers.length>0){
                state.addFileSaveList.editFilePower.push(powers[0]);
            }
        },
        getdeleteFileParams(state,pramas){
            state.addFileSaveList.deleteFileParams=pramas;
        },
        getDelpower(state,powers){
            if(powers.length>0){          
                state.addFileSaveList.delFilePower.push(powers[0]);
            }
            console.log(powers)
            console.log(3,state.addFileSaveList.deleteFileParams)
        },
        getFujainList(state,list){
            state.addFileSaveList.fujainList=list;
            console.log(state.addFileSaveList.fujainList)
        },
        getTitle(state,val){
            state.addFileSaveList.addFileListParams.title=val;
            console.log(state.addFileSaveList.addFileListParams.title)
        },
        getFileStyle(state,val){
            state.addFileSaveList.addFileListParams.fileStyle=val;
            console.log(state.addFileSaveList.addFileListParams.fileStyle)
        },
        getFileStyleId(state,val){
            state.addFileSaveList.addFileListParams.fileStyleId=val;
            console.log(state.addFileSaveList.addFileListParams.fileStyleId)
        },
        getPhotoUrl(state,val){
            state.addFileSaveList.addFileListParams.photoUrl=val;
            console.log(state.addFileSaveList.addFileListParams.photoUrl)
        },
        getFileUrl(state,val){
            state.addFileSaveList.addFileListParams.fileUrl=val;
            console.log(state.addFileSaveList.addFileListParams.fileUrl)
        },
        getContent(state,val){
            state.addFileSaveList.addFileListParams.content=val;
            console.log(state.addFileSaveList.addFileListParams.content)
        },
        getFilesize(state,val){
            state.addFileSaveList.addFileListParams.filesize=val;
            console.log(state.addFileSaveList.addFileListParams.filesize)
        },
        getDescrible(state,val){
            state.addFileSaveList.addFileListParams.describle=val;
            console.log(state.addFileSaveList.addFileListParams.describle)
        },
        getFileType(state,val){
            state.addFileSaveList.addFileListParams.fileType=val;
            console.log(state.addFileSaveList.addFileListParams.fileType)
        }
    },
    actions:{
        add(context){
            context.commit('add');
        }
    }

});
export default store;
