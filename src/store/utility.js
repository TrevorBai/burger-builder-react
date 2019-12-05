export const updateObject = (oldObject, updatedPropertiesObject) => {
  return {
    ...oldObject,
    ...updatedPropertiesObject
  }
}