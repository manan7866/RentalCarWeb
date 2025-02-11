import { type SchemaTypeDefinition } from 'sanity'
import { Cars } from './Cars'
import { Rating } from './rating'
import { carupdates } from './carupdates'
import { Checkcar } from './Checkcar'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Cars , Rating , carupdates ,Checkcar ],
}
