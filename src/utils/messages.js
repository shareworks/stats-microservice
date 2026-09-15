export default (errors) => {
  // Extract message from an error
  const message = (key) => errors[key].message

  // Remove dot at the end of message to be consistent with Ackee errors
  const normalize = (message) =>
    message.slice(-1) === '.' ? message.slice(0, Math.max(0, message.length - 1)) : message

  return Object.keys(errors).map(message).map(normalize).join('\n')
}
