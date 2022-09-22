import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus';
import { NexusGenObjects } from '../../nexus-typegen';

export const Avatar = objectType({
  name: 'Avatar',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.int('health');
  },
});

const avatars: NexusGenObjects['Avatar'][] = [
  {
    id: 1,
    name: 'foo',
    health: 3,
  },
  {
    id: 2,
    name: 'bar',
    health: 2,
  },
];

export const queryAvatars = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('avatars', {
      type: 'Avatar',
      resolve(parent, args, context, info) {
        return avatars;
      },
    });
  },
});

export const queryAvatar = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('avatar', {
      type: 'Avatar',
      args: {
        id: nonNull(intArg()),
      },
      resolve(source, args, context, info) {
        const { id } = args;
        return avatars[id - 1];
      },
    });
  },
});

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('create', {
      type: 'Avatar',
      args: {
        name: nonNull(stringArg()),
        health: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { name, health } = args;

        const idCount = avatars.length + 1;
        const avatar = {
          id: idCount,
          name,
          health,
        };
        avatars.push(avatar);
        return avatar;
      },
    });
  },
});
