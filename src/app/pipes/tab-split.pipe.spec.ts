import { TabSplitPipe } from './tab-split.pipe';

describe('TabSplitPipe', () => {
  it('create an instance', () => {
    const pipe = new TabSplitPipe();
    expect(pipe).toBeTruthy();
  });

  it('should test a valid string for formatting', () => {
    const pipe = new TabSplitPipe();
    expect(pipe.transform('1111222233334444')).toEqual('1111\t2222\t3333\t4444');
  });
});
