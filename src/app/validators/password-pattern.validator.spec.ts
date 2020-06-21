import { CustomvalidationService } from './password-pattern.validator';

describe('CustomvalidationService', () => {
  it('should create an instance', () => {
    const validator = new CustomvalidationService();
    expect(validator).toBeTruthy();
  });
});
