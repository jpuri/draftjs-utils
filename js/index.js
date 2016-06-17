/* @flow */

import {
  getSelectionInlineStyle,
  getSelectionEntity,
  getEntityRange,
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
  getSelectionInlineStyle,
  getSelectionEntity,
  getEntityRange,
  // KeyPress related Functions
  handleNewLine,
  // Lists related Functions
  isListBlock,
  changeDepth,
};
