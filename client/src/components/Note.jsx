import React, { useEffect, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData } from "react-router-dom";
export default function Note() {
  const { note } = useLoaderData();

  const [editorState, setEditState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = useState(note.content);

  const handleOnChange = (e) => {
    setEditState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      convertFromHTML.entityMap
    );

    setEditState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something"
    ></Editor>
  );
}
