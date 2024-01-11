import { vi, describe, it, expect } from 'vitest'
import mocks from '@/mock/index'
import { createPinia, setActivePinia } from 'pinia';
import { useGroupStore } from '@/store/group';
import { groupInfo, memberInfo } from './utils/constants';

vi.mock('@/utils/Axios', () => ({
  default: {
    post: mocks.axios.post,
    get: mocks.axios.get,
    put: mocks.axios.put,
    delete: mocks.axios.delete
  }
}));
vi.mock('@/router/router', () => ({ router: mocks.router }));
vi.mock('@/composables/toast', () => ({ toast: mocks.toast }));

describe("Group Store", () => {
  let groupStore;
  const member = {
    userId: memberInfo.id,
    username: memberInfo.username,
    joined: new Date()
  };  

  beforeEach(() => {
    vi.resetAllMocks()
    setActivePinia(createPinia())
    groupStore = useGroupStore()
  })

  it("Group is created.", async () => {
    mocks.axios.post.mockResolvedValueOnce({
      data: groupInfo
    })

    const group = {
      owner: groupInfo.owner,
      name: groupInfo.name,
      members: groupInfo.members
    }

    await groupStore.addGroup(group)

    expect(mocks.axios.post).toHaveBeenCalledWith('/groups/add', group)
    expect(groupStore.groupList).toContainEqual(expect.objectContaining(groupInfo));
  })

  it("Group member is added.", async() => {
    groupStore.groupList.unshift(groupInfo)
    mocks.axios.put.mockResolvedValueOnce({
      data: member
    })
    await groupStore.addUser(groupInfo.id, memberInfo.id)
    expect(mocks.axios.put).toHaveBeenCalledWith(`/groups/${groupInfo.id}/add-user`, {
      memberId: memberInfo.id
    })
    const group = groupStore.groupList.find(group => group.id === groupInfo.id)
    expect(group.members).toContainEqual(expect.objectContaining(member));
    expect(mocks.toast.showSuccess).toHaveBeenCalledWith(`${member.username} added to ${group.name}!`)
  })

  it("Group member removed.", async() => {
    groupStore.groupList.unshift(groupInfo)
    mocks.axios.delete.mockResolvedValueOnce({
      data: {
        message: `${memberInfo.username} removed from ${groupInfo.name}`
      }
    })
    await groupStore.removeUser(groupInfo.id, memberInfo.id)
    expect(mocks.axios.delete).toHaveBeenCalledWith(`/groups/${groupInfo.id}/remove-user/${memberInfo.id}`)
    expect(groupInfo.members).not.toContainEqual(member)
    expect(mocks.toast.showSuccess).toHaveBeenCalledWith(`${memberInfo.username} removed from ${groupInfo.name}`)
  })

  it("Group removed from list.", async() => {
    groupStore.groupList.unshift(groupInfo)
    mocks.axios.delete.mockResolvedValueOnce({
      data: {
        message: 'Group deleted successfully.'
      }
    })
    await groupStore.deleteGroup(groupInfo.id)

    expect(mocks.axios.delete).toHaveBeenCalledWith(`/groups/${groupInfo.id}/delete`)
    expect(groupStore.groupList).not.toContainEqual(groupInfo)
    expect(mocks.toast.showSuccess).toHaveBeenCalledWith('Group deleted successfully.')
  })
})
