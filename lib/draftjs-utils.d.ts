import {
  BlockMap,
  ContentBlock,
  DraftBlockType,
  DraftInlineStyle,
  EditorState,
  Entity
} from "draft-js";

declare module "draftjs-utils" {
  export function getSelectedBlocksMap(state: EditorState): BlockMap;
  export function getSelectedBlocksList(
    state: EditorState
  ): Array<ContentBlock>;
  export function getSelectedBlock(state: EditorState): ContentBlock;
  export function getBlockBeforeSelectedBlock(state: EditorState): ContentBlock;
  export function getAllBlocks(state: EditorState): List<ContentBlock>;
  export function getSelectedBlocksType(state: EditorState): string | undefined;
  export function removeSelectedBlocksStyle(state: EditorState): EditorState;
  export function getSelectionText(state: EditorState): string;
  export function addLineBreakRemovingSelection(
    state: EditorState
  ): EditorState;
  export function insertNewUnstyledBlock(state: EditorState): EditorState;
  export function clearEditorContent(state: EditorState): EditorState;
  export function getSelectionInlineStyle(state: EditorState): DraftInlineStyle;
  export function setBlockData(state: EditorState, data: any): EditorState;
  export function getSelectedBlocksMetadata(
    state: EditorState
  ): Map<string, any>;
  export function blockRenderMap(): Map<DraftBlockType, string>;
  export function getSelectionEntity(state: EditorState): Entity;
  export function getEntityRange(state: EditorState, entityKey: string): object;
  export function handleNewLine(state: EditorState, event: Event): EditorState;
  export function isListBlock(block: ContentBlock): boolean;
  export function changeDepth(
    state: EditorState,
    adjustment: number,
    maxDepth: number
  ): EditorState;
  export function getSelectionCustomInlineStyle(
    state: EditorState,
    styles: string[]
  ): object;
  export function toggleCustomInlineStyle(
    state: EditorState,
    styleType: string,
    styleValue: string
  ): EditorState;
  export function removeAllInlineStyles(state: EditorState): EditorState;
}
