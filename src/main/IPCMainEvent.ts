export const enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList',
  getSnippetDetail = 'getSnippetDetail',
  getSnippetStatusCount = 'getSnippetStatusCount',
  updateSnippetContent = 'updateSnippetContent',
  updateSnippetName = 'updateSnippetName',
  updateSnippetTags = 'updateSnippetTags',
  createSnippet = 'createSnippet',
  deleteSnippet = 'deleteSnippet',
  destroySnippet = 'destroySnippet',
  updateSnippetFavorite = 'updateSnippetFavorite',
  moveSnippetIntoFolder = 'moveSnippetIntoFolder',
  moveSnippetIntoInbox = 'moveSnippetIntoInbox',
  restoreSnippet = 'restoreSnippet',
  formatSnippetContent = 'formatSnippetContent',
  emptySnippet = 'emptySnippet',

  getTagList = 'getTagList',

  getFolderList = 'getFolderList',
  createFolder = 'createFolder',
  deleteFolder = 'deleteFolder',
  updateFolderName = 'updateFolderName'
}
