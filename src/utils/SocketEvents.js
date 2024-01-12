export const SocketEvent = Object.freeze({
  CHORE: {
    ADDED: 'chore_added',
    UPDATED: 'chore_updated',
    DELETE: 'chore_delete',
  },
  GROCERY: {
    ADDED: 'grocery_added',
    UPDATED: 'grocery_updated',
    DELETE: 'grocery_delete',
  },
  GROUP_ADDED: 'group_added',
  GROUP_DELETED: 'group_deleted',
  MEMBER_ADDED: 'member_added',
  MEMBER_REMOVED: 'member_removed',
  JOIN_GROUP: 'join_group'
});