/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      comments {
        items {
          commentId
          content
          createdAt
          eventId
        }
        nextToken
      }
      description
      id
      name
      when
      where
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: TableEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        comments {
          nextToken
        }
        description
        id
        name
        when
        where
      }
      nextToken
    }
  }
`;
