import Lesson from '../lesson.entity';

const mockedLessons: Lesson[] = [
  {
    id: 2,
    name: 'Музыка',
    code: 'music',
    evaluations: [
      {
        id: 3,
        score: 56,
        user: {
          id: 1,
          name: 'Джонни',
          email: 'silverhand@cyber.punk',
          password: 'hash',
          evaluations: [],
        },
        createdAt: undefined,
        lesson: undefined,
      },
      {
        id: 7,
        score: 0,
        user: {
          id: 2,
          name: 'Билл',
          email: 'bill@cyber.punk',
          password: 'hash',
          evaluations: [],
        },
        createdAt: undefined,
        lesson: undefined,
      },
    ],
  },
];

export default mockedLessons;
