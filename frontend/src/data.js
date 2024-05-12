const boards = [
  {
    _id: '1',
    name: 'Personal',
    tasks: [
      {
        _id: '1',
        title: 'Buy groceries',
        description: 'Get milk, eggs, and bread',
        dueDate: '2023-05-15',
        completed: false,
      },
      {
        _id: '2',
        title: 'Clean the house',
        description: 'Vacuum and mop the floors',
        dueDate: '2023-05-18',
        completed: true,
      },
    ],
  },
  {
    _id: '2',
    name: 'Work',
    tasks: [
      {
        _id: '3',
        title: 'Finish project proposal',
        description: 'Write the project scope and timeline',
        dueDate: '2023-05-20',
        completed: false,
      },
      {
        _id: '4',
        title: 'Send weekly report',
        description: 'Summarize the progress made this week',
        dueDate: '2023-05-22',
        completed: false,
      },
    ],
  },
];

export default boards;