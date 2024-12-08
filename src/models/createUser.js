app.post('/create-user', (req, res) => {
  console.log('Modtaget data:', req.body) // Log dataen, der modtages

  const { Email, Password, isAdmin, Name } = req.body

  if (!Email || !Password || !Name) {
    return res.status(400).json({ error: 'Alle felter (Email, Password, Name) er påkrævet' })
  }

  // Hash passwordet
  bcrypt.hash(Password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Fejl ved kryptering af password:', err)
      return res.status(500).json({ error: 'Fejl under kryptering af password' })
    }

    // SQL-forespørgsel for at indsætte en ny bruger
    const sql = 'INSERT INTO users (Email, Password, isAdmin, Name) VALUES (?, ?, ?, ?)'
    db.query(sql, [Email, hashedPassword, isAdmin || false, Name], (err, result) => {
      if (err) {
        console.error('Fejl ved oprettelse af bruger:', err)
        return res.status(500).json({ error: 'Fejl ved oprettelse af bruger' })
      }

      console.log('Bruger oprettet:', result)
      res.status(201).json({ success: 'Bruger oprettet' })
    })
  })
})
