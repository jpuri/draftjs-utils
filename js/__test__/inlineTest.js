import {
  Entity,
  RichUtils,
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import {
  getSelectionInlineStyle,
  getSelectionEntity,
  getEntityRange,
} from '../inline';
import { assert } from 'chai';

describe('getSelectionInlineStyle test suite', () => {
  it('should correctly get color of selection', () => {
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li></ul>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection
    );
    editorState = RichUtils.toggleInlineStyle(
      editorState,
      'BOLD'
    );
    assert.equal(getSelectionInlineStyle(editorState).BOLD, true);
  });
});

describe('getSelectionEntity, getEntityRange test suite', () => {
  it('should return entity of selection', () => {
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: 'www.testing.com' });
    editorState = RichUtils.toggleLink(editorState, updatedSelection, entityKey);
    assert.equal(getSelectionEntity(editorState), entityKey);
    const entityRange = getEntityRange(editorState, entityKey);
    assert.equal(entityRange.start, 0);
    assert.equal(entityRange.end, 10);
    assert.equal(entityRange.text, 'aaaaaaaaaa');
  });

  it('should return undefined if entity is not applicable to whole seelction', () => {
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    let updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 5,
    });
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: 'www.testing.com' });
    editorState = RichUtils.toggleLink(editorState, updatedSelection, entityKey);
    updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection
    );
    assert.isUndefined(getSelectionEntity(editorState));
    const entityRange = getEntityRange(editorState, entityKey);
    assert.equal(entityRange.start, 0);
    assert.equal(entityRange.end, 5);
    assert.equal(entityRange.text, 'aaaaa');
  });
});
