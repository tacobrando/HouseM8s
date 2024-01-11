export const registerInfo = {
  username: 'testuser', 
  email: 'testuser@example.com',
  password: 'password123', 
  confirmPassword: 'password123'
};

export const userInfo = {
  _id: '1',
  username: 'testuser',
  email: 'testuser@example.com',
  groups: [],
  image: 'default',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
}

export const memberInfo = {
  id: '2',
  username: 'testuser2',
  email: 'testuser2@example.com',
  groups: [],
  image: 'default',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
}


export const groupInfo = {
  id: '1',
  owner: userInfo._id,
  name: 'TestGroup',
  members: [
    {
      userId: userInfo._id,
      username: userInfo.username,
      image: 'default',
      joined: '2023-01-01T00:00:00.000Z'
    }
  ],
  chores: [],
  groceries: [],
  currency: '$',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
}

export const taskLayout = {
  user: {
    userId: userInfo._id,
    name: userInfo.username
  },
  item: '',
  price: '',
}

export const taskInfo = {
  user: {
    userId: userInfo._id,
    name: userInfo.username
  },
  groupId: groupInfo.id,
  item: 'Test task',
  price: '10.00',
  completed: {
    userId: null,
    name: null
  },
  createdAt: new Date(),
  updatedAt: new Date()
}