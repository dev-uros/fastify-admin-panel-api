import { TSchema } from "@sinclair/typebox"

export const DateKind = Symbol('DateKind')
export interface TDate extends TSchema {
  type: 'string'
  $static: Date
  kind: typeof DateKind
}