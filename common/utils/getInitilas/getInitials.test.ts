import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('returns initials', () => {
    expect(getInitials('John Doe')).toEqual('JD');
  });
});
