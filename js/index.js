export { isListBlock, changeDepth } from './list';

export { default as handleNewLine } from './keyPress';

export {
  getEntityRange,
  getCustomStyleMap,
  toggleCustomInlineStyle,
  getSelectionEntity,
  extractInlineStyle,
  removeAllInlineStyles,
  getSelectionInlineStyle,
  getSelectionCustomInlineStyle,
} from './inline';

export {
  getSelectedBlocksMap,
  getSelectedBlocksList,
  getSelectedBlock,
  getBlockBeforeSelectedBlock,
  getAllBlocks,
  getSelectedBlocksType,
  removeSelectedBlocksStyle,
  getSelectionText,
  addLineBreakRemovingSelection,
  insertNewUnstyledBlock,
  clearEditorContent,
  setBlockData,
  getSelectedBlocksMetadata,
  blockRenderMap,
} from './block';
