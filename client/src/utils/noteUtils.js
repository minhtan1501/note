import { graphQLrequest } from "./request";
export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String) {
          folder(folderId: $folderId) {
            name
            id
            notes {
              id
              content
            }
          }
        }`;
  const data = await graphQLrequest({
    query,
    variables: {
      folderId: folderId,
    },
  });
  // const res = await fetch("http://localhost:4000/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables: {
  //       folderId: folderId,
  //     },
  //   }),
  // });
  // const { data } = await res.json();
  return data || [];
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Folder($noteId: String) {
        note(noteId: $noteId) {
          content
          id
        }
      }`;

  const data = await graphQLrequest({
    query,
    variables: {
      noteId: noteId,
    },
  });
  // const res = await fetch("http://localhost:4000/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     query,
  //     variables: {
  //         noteId: noteId,
  //     },
  //   }),
  // });
  // const { data } = await res.json();
  return data || {};
};
