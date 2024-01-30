export const enum IPCMainEvent {
  minimize = 'minimize',
  maximize = 'maximize',
  close = 'close',

  getSnippetList = 'getSnippetList',
  getSnippetDetail = 'getSnippetDetail',
  getSnippetStatusCount = 'getSnippetStatusCount',
  updateSnippetContent = 'updateSnippetContent',
  updateSnippetName = 'updateSnippetName',
  connectSnippetWithTag = 'connectSnippetWithTag',
  createSnippet = 'createSnippet',
  deleteSnippet = 'deleteSnippet',
  destroySnippet = 'destroySnippet',
  updateSnippetFavorite = 'updateSnippetFavorite',
  moveSnippetIntoFolder = 'moveSnippetIntoFolder',
  moveSnippetIntoInbox = 'moveSnippetIntoInbox',
  restoreSnippet = 'restoreSnippet',
  formatSnippetContent = 'formatSnippetContent',

  getTagList = 'getTagList',

  getFolderList = 'getFolderList'
}
