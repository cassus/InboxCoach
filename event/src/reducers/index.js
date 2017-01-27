import {combineReducers} from 'redux';

import inboxItems from './inboxItems';
import activeItem from './activeItem';
import tracking from './tracking';
import currentTab from './currentTab';
import settings from './settings';

export default combineReducers({
  inboxItems,
  activeItem,
  tracking,
  currentTab,
  settings,
});