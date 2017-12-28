import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hasSaveContent: false,
    lastestUrl: '',
    searchKey: '',
    addFileSaveList: {
      powerTreeEditList: [],
      powerTreeLookList: [],
      powerTreeDelList: [],
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
      addFileListParams: {
        title: '',
        fileStyle: '',
        fileStyleId: '',
        photoUrl: '',
        fileUrl: '',
        content: '',
        filesize: '',
        describle: '',
        fileType: ''
      },
      fujainList: [],
      photoUrlList: []
    }
  },
  mutations: {
    GET_LATEEST(state, val) {
      state.lastestUrl = val
    },
    getSearchKey(state, val) {
      state.searchKey = val;
    },
    setHasSaveContent(state, val) {
      state.hasSaveContent = val;
    },
    getPhotoUrlList(state, powers) {
      if (powers.length > 0) {
        state.addFileSaveList.photoUrlList = powers;
      }
    },
    getlookFileParams(state, pramas) {
      state.addFileSaveList.lookFileParams = pramas;
    },
    getupdateFileParams(state, pramas) {
      state.addFileSaveList.updateFileParams = pramas;
    },
    getdeleteFileParams(state, pramas) {
      state.addFileSaveList.deleteFileParams = pramas;
    },
    getLookTreeList(state, list) {
      state.addFileSaveList.powerTreeLookList = list;
    },
    getEditTreeList(state, list) {
      state.addFileSaveList.powerTreeEditList = list;
    },
    getDelTreeList(state, list) {
      state.addFileSaveList.powerTreeDelList = list;
    },
    getFujainList(state, list) {
      state.addFileSaveList.fujainList = list;
    },
    getTitle(state, val) {
      state.addFileSaveList.addFileListParams.title = val;
    },
    getFileStyle(state, val) {
      state.addFileSaveList.addFileListParams.fileStyle = val;
    },
    getFileStyleId(state, val) {
      state.addFileSaveList.addFileListParams.fileStyleId = val;
    },
    getPhotoUrl(state, val) {
      state.addFileSaveList.addFileListParams.photoUrl = val;
    },
    getFileUrl(state, val) {
      state.addFileSaveList.addFileListParams.fileUrl = val;
    },
    getContent(state, val) {
      state.addFileSaveList.addFileListParams.content = val;
    },
    getFilesize(state, val) {
      state.addFileSaveList.addFileListParams.filesize = val;
    },
    getDescrible(state, val) {
      state.addFileSaveList.addFileListParams.describle = val;
    },
    getFileType(state, val) {
      state.addFileSaveList.addFileListParams.fileType = val;
    }
  },
  actions: {
    add(context) {
      context.commit('add');
    }
  }

});
export default store;
