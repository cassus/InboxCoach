import {combineReducers} from 'redux';

import inboxItems from './inboxItems';
import activeItem from './activeItem';
import tracking from './tracking';
import currentTab from './currentTab';

export default combineReducers({
  inboxItems,
  activeItem,
  tracking,
  currentTab
});

//
// export default (state = {}, action) => {
//
//   return {
//     activeItem: activeItem(state.activeItem, action),
//     inboxItems: inboxItems(state.inboxItems, action),
//   }
// }
