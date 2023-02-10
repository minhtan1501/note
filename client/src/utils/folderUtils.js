import { graphQLrequest } from "./request";

export const folderUtils = async () => {
  const query = `query Folders {
      folders {
        id
        name
        createdAt
      }
    }`;

const data = await graphQLrequest({query},)

  return data || [];
};
