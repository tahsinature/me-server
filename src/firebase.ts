import admin from 'firebase-admin'

const adminSDK = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
})

class FCM {
  private adapter = adminSDK.messaging()

  public async sendToSpecificDevice(token: string, data: any) {
    const message = {
      notification: {
        title: '$FooCorp up 1.43% on the day',
        body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.',
      },
    }

    await this.adapter.send({ notification: message.notification, token })
  }

  public validateToken(token: string) {
    return this.adapter.send({ token }, true)
  }
}

export const fcm = new FCM()

export const closeFirebase = () => {
  return adminSDK.delete()
}
