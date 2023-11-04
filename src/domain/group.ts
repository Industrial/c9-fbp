import { Group } from '#/schemas/messages/shared/Group.ts'

export const areGroupsEqual = (a: Group) => {
  return (b: Group) => {
    return a.name === b.name
  }
}

export const areGroupsNotEqual = (a: Group) => {
  return (b: Group) => {
    return !areGroupsEqual(a)(b)
  }
}
