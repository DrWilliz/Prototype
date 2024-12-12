export const sendPortainerToken = (req, res, next) => {
  // Ensure the token is being set in the session
  if (req.session && req.session.portainerToken) {
    req.portainerToken = req.session.portainerToken
    next()
  } else {
    console.error('No Portainer token found in session')
    res.status(401).json({ message: 'No authentication token available' })
  }
}
