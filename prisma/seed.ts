import { PrismaClient } from '@prisma/client';
import { formatISO } from 'date-fns';

const johnId = 'e437ee57-18c8-4410-a809-219144c0aadf';
const bobId = '7e54133d-0ea2-4f27-b880-d2e64e10f5c7';
const bobPosts = [
  {
    id: '5a2fedfc-7809-4453-93c1-ee0722c7579c',
    body: 'The reservoir water level continued to lower while we enjoyed our long shower.',
    createdAt: formatISO(new Date()),
    latitude: 39.33282104790148,
    longitude: -84.22315780081247,
  },
  {
    id: 'ecbcadaa-cd28-4a35-8985-2c5d3a3c3a07',
    body: 'The three-year-old girl ran down the beach as the kite flew behind her.',
    createdAt: formatISO(new Date()),
    latitude: 39.33282104790148,
    longitude: -84.22315780081247,
  },
  {
    id: '62b1002e-5997-4535-aef4-71ac7334dbdc',
    body: 'Andy loved to sleep on a bed of nails.',
    createdAt: formatISO(new Date()),
    latitude: 39.33282104790148,
    longitude: -84.22315780081247,
  },
  {
    id: '713cb4bd-643f-4793-9b96-35977c74d635',
    body: 'As you consider all the possible ways to improve yourself and the world, you notice John Travolta seems fairly unhappy.',
    createdAt: formatISO(new Date()),
    latitude: 39.33282104790148,
    longitude: -84.22315780081247,
  },
];
const johnPosts = [
  {
    id: 'dee1e133-1c33-4a4f-94e8-675b56a9664e',
    body: `It would have been a better night if the guys next to us weren't in the splash zone.`,
    createdAt: formatISO(new Date()),
    latitude: 39.33282104790148,
    longitude: -84.22315780081247,
  },
  {
    id: '0202fec1-3714-4085-8212-334a417cdee7',
    body: `I'll have you know I've written over fifty novels`,
    createdAt: formatISO(new Date()),
    latitude: 39.33282104790148,
    longitude: -84.22315780081247,
  },
];
const prisma = new PrismaClient();
async function main() {
  await createUsers();
  await createVotes();
  await createComments();
}

async function createUsers() {
  const bob = await prisma.user.upsert({
    where: {
      id: bobId,
    },
    create: {
      id: bobId,
      phoneNumber: '1234567890',
      createdAt: formatISO(new Date()),
      name: 'Bob',
      posts: {
        createMany: {
          data: bobPosts,
        },
      },
    },
    include: {
      posts: true,
    },
    update: {},
  });

  const john = await prisma.user.upsert({
    where: {
      id: johnId,
    },
    create: {
      id: johnId,
      phoneNumber: '1234567891',
      createdAt: formatISO(new Date()),
      name: 'John',
      posts: {
        createMany: {
          data: johnPosts,
        },
      },
    },
    include: {
      posts: true,
    },
    update: {},
  });
}

async function createVotes() {
  bobPosts.forEach(async ({ id: postId }) => {
    await prisma.vote.upsert({
      where: {
        postId_userId: { postId, userId: bobId },
      },
      create: {
        postId,
        userId: bobId,
        downvoted: false,
        upvoted: true,
      },
      update: {},
    });
  });

  // bob votes on all john posts
  johnPosts.forEach(async ({ id: postId }) => {
    await prisma.vote.upsert({
      where: {
        postId_userId: { postId, userId: bobId },
      },
      create: {
        postId,
        userId: bobId,
        downvoted: false,
        upvoted: true,
      },
      update: {},
    });
  });

  johnPosts.forEach(async ({ id: postId }) => {
    await prisma.vote.upsert({
      where: {
        postId_userId: { postId, userId: johnId },
      },
      create: {
        postId,
        userId: johnId,
        downvoted: false,
        upvoted: true,
      },
      update: {},
    });
  });
}

async function createComments() {
  const input = [
    {
      id: '9cb4dc80-7601-4081-93a9-6617abf2732c',
      authorId: bobId,
      postId: bobPosts[0].id,
      parentId: null,
      body: "It turns out you don't need all that stuff you insisted you did.",
    },
    {
      id: 'a0d67a45-bacf-47fa-9573-a8d7b82af6f8',
      authorId: bobId,
      postId: bobPosts[1].id,
      parentId: null,
      body: 'He learned the hardest lesson of his life and had the scars, both physical and mental, to prove it.',
    },
    {
      id: '28303515-5e2a-40d2-bfb8-92ef4d465125',
      authorId: bobId,
      postId: bobPosts[1].id,
      parentId: 'a0d67a45-bacf-47fa-9573-a8d7b82af6f8',
      body: 'He learned the hardest lesson of his life and had the scars, both physical and mental, to prove it.',
    },
  ];
  input.forEach(async ({ id, authorId, postId, parentId, body }) => {
    await prisma.comment.upsert({
      where: {
        id,
      },
      create: {
        id,
        body,
        createdAt: formatISO(new Date()),
        authorId,
        postId,
        parentId,
      },
      update: {},
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
