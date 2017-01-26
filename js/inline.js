/* @flow */

import {
  Entity,
  Modifier,
  RichUtils,
  EditorState,
  ContentBlock,
} from 'draft-js';
import {
  getSelectedBlocksList,
  getSelectedBlock,
} from './block';

/**
* Function returns an object of inline styles currently applicable.
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
      STRIKETHROUGH: true,
      CODE: true,
      SUPERSCRIPT: true,
      SUBSCRIPT: true,
    };
    for (let i = 0; i < selectedBlocks.size; i += 1) {
      let blockStart = i === 0 ? start : 0;
      let blockEnd =
        i === (selectedBlocks.size - 1) ? end : selectedBlocks.get(i).getText().length;
      if (blockStart === blockEnd && blockStart === 0) {
        blockStart = 1;
        blockEnd = 2;
      } else if (blockStart === blockEnd) {
        blockStart -= 1;
      }
      for (let j = blockStart; j < blockEnd; j += 1) {
        const inlineStylesAtOffset = selectedBlocks.get(i).getInlineStyleAt(j);
        ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE', 'SUPERSCRIPT', 'SUBSCRIPT'].forEach((style) => {
          inlineStyles[style] = inlineStyles[style] && inlineStylesAtOffset.get(style) === style;
        });
      }
    }
    return inlineStyles;
  }
  return {};
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

  for (let i = start; i < end; i += 1) {
    const currentEntity = block.getEntityAt(i);
    if (!currentEntity) {
      entity = undefined;
      break;
    }
    if (i === start) {
      entity = currentEntity;
    } else if (entity !== currentEntity) {
      entity = undefined;
      break;
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
    value => value.get('entity') === entityKey,
    (start, end) => {
      entityRange = {
        start,
        end,
        text: block.get('text').slice(start, end),
      };
    },
  );
  return entityRange;
}

/**
* Collection of all custom inline styles.
*/
export const customInlineStylesMap =
  {
    color: {},
    bgcolor: {},
    fontSize: {},
    fontFamily: {},
    SUPERSCRIPT: {
      fontSize: 11,
      position: 'relative',
      top: -8,
      display: 'inline-flex',
    },
    SUBSCRIPT: {
      fontSize: 11,
      position: 'relative',
      bottom: -8,
      display: 'inline-flex',
    },
  };

/**
* Set colors.
*/
export const setColors = (colors: Array<string>) => {
  colors.forEach((color) => {
    customInlineStylesMap.color[`color-${color}`] = {
      color,
    };
    customInlineStylesMap.bgcolor[`bgcolor-${color}`] = {
      backgroundColor: color,
    };
  });
};

/**
* Set font families.
*/
export const setFontSizes = (fontSizes: Array<number>) => {
  fontSizes.forEach((size) => {
    customInlineStylesMap.fontSize[`fontsize-${size}`] = {
      fontSize: size,
    };
  });
};

/**
* Set font families.
*/
export const setFontFamilies = (fontFamilies: Array<string>) => {
  fontFamilies.forEach((family) => {
    customInlineStylesMap.fontFamily[`fontfamily-${family}`] = {
      fontFamily: family,
    };
  });
};

/**
* Combined map of all custon inline styles used to initialize editor.
*/
export const getCustomStyleMap = () => { // eslint-disable-line
  return {
    ...customInlineStylesMap.color,
    ...customInlineStylesMap.bgcolor,
    ...customInlineStylesMap.fontSize,
    ...customInlineStylesMap.fontFamily,
    SUPERSCRIPT: customInlineStylesMap.SUPERSCRIPT,
    SUBSCRIPT: customInlineStylesMap.SUBSCRIPT,
  };
};

/**
* Function to toggle a custom inline style in current selection current selection.
*/
export function toggleCustomInlineStyle(
  editorState: EditorState,
  styleType: string,
  style: string,
): EditorState {
  const selection = editorState.getSelection();
  const nextContentState = Object.keys(customInlineStylesMap[styleType])
    .reduce((contentState, s) => Modifier.removeInlineStyle(contentState, selection, s),
      editorState.getCurrentContent());
  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    'changeinline-style',
  );
  const currentStyle = editorState.getCurrentInlineStyle();
  if (selection.isCollapsed()) {
    nextEditorState = currentStyle
      .reduce((state, s) => RichUtils.toggleInlineStyle(state, s),
      nextEditorState);
  }
  if (!currentStyle.has(style)) {
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      style,
    );
  }
  return nextEditorState;
}

/**
* Function returns size at a offset.
*/
function getStyleAtOffset(block: ContentBlock, stylePrefix: string, offset: number): any {
  const styles = block.getInlineStyleAt(offset).toList();
  const style = styles.filter(s => s.startsWith(stylePrefix.toLowerCase()));
  if (style && style.size > 0) {
    return style.get(0);
  }
  return undefined;
}

/**
* Function returns an object of custom inline styles currently applicable.
*/
export function getSelectionCustomInlineStyle(
  editorState: EditorState,
  styles: Array<string>,
): Object {
  if (editorState && styles && styles.length > 0) {
    const currentSelection = editorState.getSelection();
    const start = currentSelection.getStartOffset();
    const end = currentSelection.getEndOffset();
    const selectedBlocks = getSelectedBlocksList(editorState);
    if (selectedBlocks.size > 0) {
      const inlineStyles = {};
      for (let i = 0; i < selectedBlocks.size; i += 1) {
        let blockStart = i === 0 ? start : 0;
        let blockEnd =
          i === (selectedBlocks.size - 1) ? end : selectedBlocks.get(i).getText().length;
        if (blockStart === blockEnd && blockStart === 0) {
          blockStart = 1;
          blockEnd = 2;
        } else if (blockStart === blockEnd) {
          blockStart -= 1;
        }
        for (let j = blockStart; j < blockEnd; j += 1) {
          if (j === blockStart) {
            styles.forEach((s) => {
              inlineStyles[s] = getStyleAtOffset(selectedBlocks.get(i), s, j);
            });
          } else {
            styles.forEach((s) => {
              if (inlineStyles[s] &&
                inlineStyles[s] !== getStyleAtOffset(selectedBlocks.get(i), s, j)) {
                inlineStyles[s] = undefined;
              }
            });
          }
        }
      }
      return inlineStyles;
    }
  }
  return {};
}

/**
* Function to remove all inline styles applied to the selection.
*/
export function removeAllInlineStyles(editorState: EditorState): void {
  const currentStyles = editorState.getCurrentInlineStyle();
  let contentState = editorState.getCurrentContent();
  currentStyles.forEach((style) => {
    contentState = Modifier.removeInlineStyle(
      contentState,
      editorState.getSelection(),
      style,
    );
  });
  return EditorState.push(editorState, contentState, 'change-inline-style');
}


// todo: add unit test cases.
