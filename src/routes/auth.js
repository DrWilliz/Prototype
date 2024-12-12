app.get('/projects', sendPortainerToken, async (req, res) => {
  try {
    const response = await axios.get(`${url}/stacks`, {
      headers: {
        Authorization: `Bearer ${req.portainerToken}`,
      },
    })
    console.log('Projects:', response.data)
    res.json(response.data)
  } catch (error) {
    res.status(500).send('Error fetching stacks')
  }
})
