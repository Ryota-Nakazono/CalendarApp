/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subscribeToEventComments = /* GraphQL */ `
  subscription SubscribeToEventComments($eventId: String!) {
    subscribeToEventComments(eventId: $eventId) {
      commentId
      content
      createdAt
      eventId
    }
  }
`;
