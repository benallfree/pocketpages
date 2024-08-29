/// <reference path="../types.d.ts" />

routerAdd('POST', '/api/otp/auth', (c) => {
  const dao = $app.dao()
  const parsed = (() => {
    const rawBody = readerToString(c.request().body)
    try {
      const parsed = JSON.parse(rawBody)
      return parsed
    } catch (e) {
      throw new BadRequestError(
        `Error parsing payload. You call this JSON? ${rawBody}`,
        e,
      )
    }
  })()
  const email = parsed.email?.trim()
  const returnUrl = parsed.returnUrl?.trim()

  console.log(`email: ${email}  `)
  console.log(`returnUrl: ${returnUrl}  `)

  const code = $security.randomStringWithAlphabet(6, `0123456789`)
  console.log(`otp: ${code}`)

  // Delete if exists
  try {
    const record = dao.findFirstRecordByData('otp', `email`, email)
    dao.deleteRecord(record)
  } catch (e) {
    console.error(`Error deleting record: ${e}`)
  }

  // Save the code

  try {
    const collection = dao.findCollectionByNameOrId('otp')
    const record = new Record(collection, {
      email,
      code,
    })
    dao.saveRecord(record)
    console.log(`*** otp record saved: ${record.id}`)
  } catch (e) {
    console.error(`Error saving otp: ${e}`)
    throw new BadRequestError(`Error saving otp: ${e}`)
  }

  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: email }],
    subject: `Your login link`,
    text: `Your login code is: ${code}\n\nPlease enter this code in the app to continue. If you can't find it, hit 'login' again and then 'I have a code'.\n\nIf you didn't request this code, please ignore this email.`,
  })

  $app.newMailClient().send(message)

  return c.json(200, {
    message: `Please check your email for your 6-digit code.`,
  })
})

routerAdd('POST', '/api/otp/verify', (c) => {
  const dao = $app.dao()
  const parsed = (() => {
    const rawBody = readerToString(c.request().body)
    try {
      const parsed = JSON.parse(rawBody)
      return parsed
    } catch (e) {
      throw new BadRequestError(
        `Error parsing payload. You call this JSON? ${rawBody}`,
        e,
      )
    }
  })()
  console.log(`***${JSON.stringify(parsed)}`)
  const email = parsed.email.trim()
  const code = parsed.code

  console.log(`***email: ${email} , code: ${code}`)

  try {
    const record = dao.findFirstRecordByData('otp', 'email', email)
    const storedCode = record.getString(`code`)
    if (storedCode !== code) {
      throw new BadRequestError(`Invalid code`)
    }
    const created = record.created.time().unixMilli()
    const now = Date.now()
    console.log(`***now:${now}  created:${created}`)
    if (now - created > 10 * 60 * 1000) {
      // 10 minutes
      throw new BadRequestError(`Code expired`)
    }
    dao.deleteRecord(record)
  } catch (e) {
    console.error(`Error confirming otp: ${e}`)
    throw e
  }

  const userRecord = (() => {
    try {
      return dao.findFirstRecordByData('users', 'email', email)
    } catch (e) {
      console.error(`Error finding user: ${e}`)
      const usersCollection = dao.findCollectionByNameOrId('users')
      const user = new Record(usersCollection)
      try {
        const username = $app
          .dao()
          .suggestUniqueAuthRecordUsername(
            'users',
            'user' + $security.randomStringWithAlphabet(5, '123456789'),
          )
        user.set('username', username)
        user.set('email', email)
        user.set('subscription', 'free')
        user.setPassword($security.randomString(20)) // Fake password (not used)
        dao.saveRecord(user)
      } catch (e) {
        throw BadRequestError(`Could not create user: ${e}`)
      }
    }
  })()

  return $apis.recordAuthResponse($app, c, userRecord)
})
