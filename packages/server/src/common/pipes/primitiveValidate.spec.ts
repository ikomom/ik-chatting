import { PrimitiveValidatePipe } from './primitiveValidate.pipe'

describe('PrimitiveValidatePipe', () => {
  const defaultValue = 'default'
  const target = new PrimitiveValidatePipe(defaultValue)

  describe('transform', () => {
    it('should return original value if one was provided', () => {
      const value = 'value'
      const result = target.transform(value)
      expect(result).toEqual(value)
    })
  })
})
