import { updateNameHandler } from './avatar_handlers';

const originalAvatar = {
  id: 1,
  name: 'foo',
  health: 2,
};

describe('updates', () => {
  describe('updateNameHandler', () => {
    it('should return an avatar with an updated name if different', () => {
      const newName = 'bar';
      const updatedAvatar = updateNameHandler(originalAvatar, newName);
      expect(updatedAvatar).toEqual({ ...originalAvatar, name: newName });
    });
    it('should throw error if the same name given', () => {
      const oldName = 'foo';
      const updatedAvatar = updateNameHandler(originalAvatar, oldName);
      expect(updatedAvatar).toThrow();
    });
  });
});
