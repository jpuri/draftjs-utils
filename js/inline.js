/* @flow */

import {
  Entity,
  EditorState,
} from 'draft-js';
import {
  getSelectedBlocksList,
  getSelectedBlock,
} from './block';

/**
* Function returns an object of inline styles currently applicable:
* {
*   BOLD: true,
*   ITALIC: true,
*   UNDERLINE: true,
* }
* Following rules are applicable:
* - styles are all false if editor is not focused
* - if focus is at beginning of the block and selection is collapsed
*     styles of first character in block is returned.
* - if focus id anywhere inside the block and selection is collapsed
*     style of a character before focus is returned.
*/
export function getSelectionInlineStyle(editorState: EditorState): Object {
  const currentSelection = editorState.getSelection();
  const start = currentSelection.getStartOffset();
  const end = currentSelection.getEndOffset();
  const selectedBlocks = getSelectedBlocksList(editorState);
  if (selectedBlocks.size > 0) {
    const inlineStyles = {
      BOLD: true,
      ITALIC: true,
      UNDERLINE: true,
    };
    for (let i = 0; i < selectedBlocks.size; i++) {
      let blockStart = i === 0 ? start : 0;
      let blockEnd =
        i === (selectedBlocks.size - 1) ? end : selectedBlocks.get(i).getText().length;
      if (blockStart === blockEnd && blockStart === 0) {
        blockStart = 1;
        blockEnd = 2;
      } else if (blockStart === blockEnd) {
        blockStart -= 1;
      }
      for (let j = blockStart; j < blockEnd; j++) {
        const inlineStylesAtOffset = selectedBlocks.get(i).getInlineStyleAt(j);
        inlineStyles.BOLD = inlineStyles.BOLD && inlineStylesAtOffset.get('BOLD') === 'BOLD';
        inlineStyles.ITALIC =
          inlineStyles.ITALIC && inlineStylesAtOffset.get('ITALIC') === 'ITALIC';
        inlineStyles.UNDERLINE =
          inlineStyles.UNDERLINE && inlineStylesAtOffset.get('UNDERLINE') === 'UNDERLINE';
      }
    }
    return inlineStyles;
  }
  return {
    BOLD: false,
    ITALIC: false,
    UNDERLINE: false,
  };
}

/**
* This function will return the entity applicable to whole of current selection.
* An entity can not span multiple blocks.
*/
export function getSelectionEntity(editorState: EditorState): Entity {
  let entity;
  const selection = editorState.getSelection();
  let start = selection.getStartOffset();
  let end = selection.getEndOffset();
  if (start === end && start === 0) {
    end = 1;
  } else if (start === end) {
    start -= 1;
  }
  const block = getSelectedBlock(editorState);

  for (let i = start; i < end; i++) {
    const currentEntity = block.getEntityAt(i);
    if (!currentEntity) {
      entity = undefined;
      break;
    }
    if (i === start) {
      entity = currentEntity;
    } else {
      if (entity !== currentEntity) {
        entity = undefined;
        break;
      }
    }
  }
  return entity;
}

/**
* The function returns the range of given entity inside the block.
* {
*   anchorOffset: undefined,
*   focusOffset: undefined,
*   text: undefined,
* }
*/
export function getEntityRange(editorState: EditorState, entityKey: string): any {
  const block = getSelectedBlock(editorState);
  let entityRange;
  block.findEntityRanges(
    (value) => value.get('entity') === entityKey,
    (start, end) => {
      entityRange = {
        start,
        end,
        text: block.get('text').slice(start, end),
      };
    }
  );
  return entityRange;
}
