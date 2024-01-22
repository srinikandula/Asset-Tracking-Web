import { AmountWordsPipe } from './amount-words.pipe';

describe('AmountWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new AmountWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
