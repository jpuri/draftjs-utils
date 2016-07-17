/* @flow */

import {
  colors,
  fontSizes,
  fontFamilies,
  customStyleMap,
  getEntityRange,
  toggleInlineStyle,
  getSelectionEntity,
  getSelectionInlineStyle,
  getSelectionCustomInlineStyle,
} from './inline';
import {
  getSelectedBlocksMap,
  getSelectedBlocksList,
  getSelectedBlock,
  getAllBlocks,
  getSelectedBlocksType,
  removeSelectedBlocksStyle,
  getSelectionText,
  addLineBreakRemovingSelection,
  insertNewUnstyledBlock,
  clearEditorContent,
} from './block';
import {
  handleNewLine,
} from './keyPress';
import {
  isListBlock,
  changeDepth,
} from './list';

module.exports = {
  // Functions related to blocks
  getSelectedBlocksMap,
  getSelectedBlocksList,
  getSelectedBlock,
  getAllBlocks,
  getSelectedBlocksType,
  removeSelectedBlocksStyle,
  getSelectionText,
  addLineBreakRemovingSelection,
  insertNewUnstyledBlock,
  clearEditorContent,
  // Functions related to inline styles
  colors,
  fontSizes,
  fontFamilies,
  customStyleMap,
  getEntityRange,
  toggleInlineStyle,
  getSelectionEntity,
  getSelectionInlineStyle,
  getSelectionCustomInlineStyle,
  // KeyPress related Functions
  handleNewLine,
  // Lists related Functions
  isListBlock,
  changeDepth,
};
