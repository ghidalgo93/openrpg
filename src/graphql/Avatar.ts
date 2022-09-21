import { objectType, extendType } from 'nexus';
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

export const AvatarQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('queryAvatars', {
      type: 'Avatar',
      resolve(parent, args, context, info) {
        return avatars;
      },
    });
  },
});
