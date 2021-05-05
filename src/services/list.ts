import { repositories } from '@src/repositories'
import faker from 'faker'

const d = [
  {
    _id: faker.random.uuid(),
    title: 'gRPC',
    description: `I like gRPC transport mechanism for request/response as non-persistent streaming protocol.`,
    image: `https://s.appbrain.com/static/202003041452037/blob/sdk-logos/grpc.png`,
    display: true,
    url: 'https://grpc.io/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Google Cloud Pub/Sub',
    description: `GC Pub/Sub became my favt tool for event driven architecture and a good alternative to Kafka as it is backed by Google and because of it's less complexity`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fgoogle-pub-sub.png?alt=media&token=114864ba-6c9f-4ee4-bb33-305049f5cb32`,
    display: true,
    url: 'https://cloud.google.com/pubsub',
  },
  {
    _id: faker.random.uuid(),
    title: 'Socket.IO',
    description: 'I am using Socket.IO for bi-directional communication for quite a long now.',
    image: 'https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fsocket-io-logo.svg?alt=media&token=8c692e6c-a53e-4054-b19c-6d99c5d1e643',
    url: 'https://socket.io/',
  },
  {
    _id: faker.random.uuid(),
    title: 'FCM',
    description: `Using Firebase Cloud Messaging (FCM) since 2019, as it's powered by Google, feels pretty consistant and reliable.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Ffirebase_logo.png?alt=media&token=c1230b32-e464-48f0-8d3f-b49fe600f71b`,
    url: 'https://firebase.google.com/docs/cloud-messaging',
  },
  {
    _id: faker.random.uuid(),
    title: 'Docker',
    description: `Everyday's tool. In fact if I create a new repo now, I put it on docker first.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fdocker-logo.png?alt=media&token=531f83a7-ace5-4a31-b825-822dbc1aa6c5`,
    display: true,
    url: 'https://www.docker.com/',
  },
  // {
  //   title: 'Kubernetes',
  //   description: 'It's basically for DevOps. But sometimes we as backend engineer, need to ',
  //   image: "It's basically for DevOps. But sometimes we as backend engineer, need to ",
  // },
  {
    _id: faker.random.uuid(),
    title: 'Jest',
    description: `Previously I was using Jasmine for testing. Now using Jest since 2019.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fjest-logo.jpg?alt=media&token=a97a9453-7782-4a0f-bde4-915274ebbff9`,
    display: true,
    url: 'https://jestjs.io/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Jasmine',
    description: `Before I started to use Jest, I was using Jesmine continuously as a testing framework for JavaScript`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fjasmine-logo.png?alt=media&token=e6ae2173-a0b5-4c74-be00-af037aa7a23c`,
    url: 'https://jasmine.github.io/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Redux',
    description: `If I use React or React Native apps, redux will take place there for sure.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fredux-logo.png?alt=media&token=2868fad7-92b8-46d3-be0c-fa1b6039b1d1`,
    url: 'https://redux.js.org/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Redux Saga',
    description: `I use it to handle side effects of react or, react-native apps.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fredux-saga-logo.png?alt=media&token=ae773577-05bb-44b2-aaed-e7408447c9a3`,
    url: 'https://redux-saga.js.org/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Sass',
    description: `Whenever I say I am writting CSS, it means I am writting Sass. I mean literally`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fsass-logo.png?alt=media&token=5302045a-468b-4ea4-8c99-421330500513`,
    url: 'https://sass-lang.com/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Gulp',
    description: `I use gulp mostly when I don't use a framework. Great tool as a task-runner`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fgulp-logo.jpg?alt=media&token=516b0e41-67b7-4410-9828-23819c2b0f85`,
    url: 'https://gulpjs.com/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Git',
    description: `Of course you can say, "Every minute I use Git on GitHub and GitLab". Literally.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fgit-logo.png?alt=media&token=48901fa3-44ad-43c3-8f1f-88fa5074f7e5`,
    url: 'https://git-scm.com/',
  },
  {
    _id: faker.random.uuid(),
    title: 'ORM / ODM',
    description: `I use Mongoose, Sequelize & TypeORM to deal with the databases I work on day-to-day.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fops_manager_backup-k53o3agwfc.png?alt=media&token=483ca954-f87a-4b4e-a73e-fb8d82b52869`,
  },
  {
    _id: faker.random.uuid(),
    title: 'Redis',
    description: `I've been using Redis for caching & scheduling. I love it for those purposes.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fredis-logo.png?alt=media&token=f39a4fde-2be6-407d-8e87-7f97e7c1c2dd`,
    url: 'https://redis.io/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Databases',
    description: `So far I've worked with Postgres, MongoDB & MySQL.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fdatabases-logo.png?alt=media&token=5e140a2a-ff2f-45e0-a934-a83b0d6491fd`,
  },
  {
    _id: faker.random.uuid(),
    title: 'Firebase',
    description: `I love this platform. I feel so comfortable and confident as it's backed by Google`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Ffirebase_logo.png?alt=media&token=c1230b32-e464-48f0-8d3f-b49fe600f71b`,
    url: 'https://firebase.google.com/',
  },
  {
    _id: faker.random.uuid(),
    title: 'SonarQube',
    description: `I use Sonar to inspect my code quality, detect bugs, code smells and security vulnerabilities. Really helps when I work in a team.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fsonarqube-logo.png?alt=media&token=c75b584c-77d4-4341-8c5b-71616300830d`,
    display: true,
    url: 'https://www.sonarqube.org/',
  },
  {
    _id: faker.random.uuid(),
    title: 'HashiCorp Vault',
    description: `It's a single source of truth to manage credentials. I use it for storing application API keys, passwords, certificates and other sensitive data.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fhashicorp-vault-logo.png?alt=media&token=950f4c59-a5b0-4eaf-8b1b-683c8889e4c4`,
    display: true,
    url: 'https://www.vaultproject.io/',
  },
  {
    _id: faker.random.uuid(),
    title: 'Selenium',
    description: `I use it to automate browser related stuffs as well as to write e2e test.`,
    image: `https://firebasestorage.googleapis.com/v0/b/global-daf32.appspot.com/o/me%2Fselenium%20logo.png?alt=media&token=150ada39-5351-4636-8365-52064190df68`,
    display: true,
    url: 'https://www.selenium.dev/',
  },
]

class Service {
  async getList(type: 'writings' | 'tools') {
    if (type === 'writings') {
      const data = await repositories.markdown.getAll()
      return {
        title: 'My Writings',
        list: data.map(ele => ({
          _id: ele._id,
          image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          title: ele.title,
          description: ele.description,
        })),
      }
    } else if (type === 'tools') {
      return {
        title: `Tools I'm using nowadays`,
        list: d.map(ele => ({
          _id: ele._id,
          image: ele.image,
          title: ele.title,
          description: ele.description,
        })),
      }
    }
  }
}

export default new Service()
