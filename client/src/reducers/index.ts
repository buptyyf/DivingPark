import {combineReducers} from 'redux';
import topicListReducer from './topicListReducer';
import selectWebsiteReducer from './boardReducer'

export default combineReducers({
    selectWebsiteStore: selectWebsiteReducer,
    topicListStore: topicListReducer,
});