import {sum} from './wkq'
import {describe, expect, test,it} from '@jest/globals'

it('sum get 3',()=>{
  expect(sum(1,2)).toBe(3)
})