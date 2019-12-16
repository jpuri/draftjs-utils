import { RichUtils } from 'draft-js';
import {
  insertNewUnstyledBlock,
  removeSelectedBlocksStyle,
  addLineBreakRemovingSelection,
} from './block';
import { isListBlock, changeDepth } from './list';

/**
 * Function will handle followind keyPress scenarios when Shift key is not pressed.
 */
function handleHardNewlineEvent(editorState) {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    if (
      !isListBlock(block) &&
      block.getType() !== 'unstyled' &&
      block.getLength() === selection.getStartOffset()
    ) {
      return insertNewUnstyledBlock(editorState);
    }
    if (isListBlock(block) && block.getLength() === 0) {
      const depth = block.getDepth();
      if (depth === 0) {
        return removeSelectedBlocksStyle(editorState);
      }
      if (depth > 0) {
        return changeDepth(editorState, -1, depth);
      }
    }
  }
  return undefined;
}

/**
 * Function to check is event was soft-newline
 * taken from : https://github.com/facebook/draft-js/blob/master/src/component/utils/isSoftNewlineEvent.js
 */
function isSoftNewlineEvent(e) {
  return (
    e.which === 13 &&
    (e.getModifierState('Shift') ||
      e.getModifierState('Alt') ||
      e.getModifierState('Control'))
  );
}

/**
 * The function will handle keypress 'Enter' in editor. Following are the scenarios:
 *
 * 1. Shift+Enter, Selection Collapsed -> line break will be inserted.
 * 2. Shift+Enter, Selection not Collapsed ->
 *      selected text will be removed and line break will be inserted.
 * 3. Enter, Selection Collapsed ->
 *      if current block is of type list and length of block is 0
 *      a new list block of depth less that current one will be inserted.
 * 4. Enter, Selection Collapsed ->
 *      if current block not of type list, a new unstyled block will be inserted.
 */
export default function handleNewLine(editorState, event) {
  if (isSoftNewlineEvent(event)) {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return RichUtils.insertSoftNewline(editorState);
    }
    return addLineBreakRemovingSelection(editorState);
  }
  return handleHardNewlineEvent(editorState);
}
