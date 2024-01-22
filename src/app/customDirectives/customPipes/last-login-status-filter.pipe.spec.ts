import { LastLoginStatusFilterPipe } from './last-login-status-filter.pipe';

describe('LastLoginStatusFilterPipe', () => {
  it('create an instance', () => {
    // @ts-ignore
    const pipe = new LastLoginStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
