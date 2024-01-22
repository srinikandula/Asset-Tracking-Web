import { ToCommasWithDecimalPipe } from './to-commas-with-decimal.pipe';

describe('ToCommasWithDecimalPipe', () => {
  it('create an instance', () => {
    const pipe = new ToCommasWithDecimalPipe();
    expect(pipe).toBeTruthy();
  });
});
