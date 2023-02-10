import { GRAPHQL_SERVER } from "./constants";

export const graphQLrequest = async ( payload,option = {}) => {
  const res = await fetch(GRAPHQL_SERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...option,
    },
    body: JSON.stringify(payload),
  });
  const { data } = await res.json();
  return data;
};
