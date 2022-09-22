import {
  objectType,
  nonNull,
  stringArg,
  intArg,
  queryField,
  list,
  mutationField,
} from 'nexus';
import { NexusGenObjects } from '../../nexus-typegen';

interface Avatar {
  id: number;
  name: string;
  health: number;
}

interface queryArgs {
  id: Number;
}

let avatars: NexusGenObjects['Avatar'][] = [
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

export const Avatar = objectType({
  name: 'Avatar',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.int('health');
  },
});

export const queryAvatars = queryField('avatars', {
  type: nonNull(list(nonNull('Avatar'))),
  resolve() {
    return avatars;
  },
});

export const queryAvatar = queryField('avatar', {
  type: 'Avatar',
  args: {
    id: nonNull(intArg()),
  },
  resolve(source, args: queryArgs, info) {
    const { id } = args;
    const foundAvatar = avatars.find(avatar => avatar.id === id);
    if (!foundAvatar) return null;
    return foundAvatar;
  },
});

export const createAvatar = mutationField('createAvatar', {
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

export const updatedAvatar = mutationField('updatedAvatar', {
  type: 'Avatar',
  args: {
    id: nonNull(intArg()),
    name: stringArg(),
    health: intArg(),
  },
  resolve(args) {
    const { id, name, health } = args;
    const updatedAvatar = avatars[id];
  },
});

// export const updateAvatar = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('update', {
//       type: 'Avatar',
//       args: {
//         id: nonNull(intArg()),
//         name: stringArg(),
//         health: intArg(),
//       },
//       resolve(args) {
//         const { id, name, health } = args;
//         const updatedAvatar = avatars[id];
//         const updatedAvatars = avatars.map(avatar => {
//           if (avatar.id === id) {
//             return { ...avatar, name, health };
//           }
//         });
//         avatars = updatedAvatars;
//         return updated;
//       },
//     });
//   },
// });

export const deleteAvatar = mutationField('deleteAvatar', {
  type: 'Avatar',
  args: {
    id: nonNull(intArg()),
  },
  resolve(source, args, context, info) {
    const { id } = args;
    const deletedAvatar = avatars.find(avatar => avatar.id === id);
    if (!deletedAvatar) return null;
    const filteredAvatars = avatars.filter(avatar => avatar.id !== id);
    avatars = filteredAvatars;
    return deletedAvatar;
  },
});
