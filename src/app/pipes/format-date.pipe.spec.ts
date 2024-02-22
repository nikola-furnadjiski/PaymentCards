import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the value as is on faulty input', () => {
    const pipe = new FormatDatePipe();
    expect(pipe.transform(123)).toEqual(123);
  });

  it('should transform a valid date input in mm/yy format', () => {
    const pipe = new FormatDatePipe();
    expect(pipe.transform(new Date(2024,3))).toEqual('04/24');
  });

  it('should transform a valid date input containing also days, hours and minutes in mm/yy format', () => {
    const pipe = new FormatDatePipe();
    expect(pipe.transform(new Date(2023,8, 20, 5, 30))).toEqual('09/23');
  });
});
