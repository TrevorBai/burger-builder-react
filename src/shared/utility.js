export const updateObject = (oldObject, updatedPropertiesObject) => {
  return {
    ...oldObject,
    ...updatedPropertiesObject
  }
}

export const checkValidatity = (value, rules) => {
  let isValid = true
  if (!rules) {  // Redundent double security
    return true
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid
  }

  return isValid
}