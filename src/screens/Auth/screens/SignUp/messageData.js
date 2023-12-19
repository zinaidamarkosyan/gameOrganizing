import Consent from '@/assets/imgs/Consent'

const messageDefault = {
  hello: {
    text: 'Здравствуйте и добро пожаловать! Вас приветствует платформа «Играем»!',
    type: 'TEXT',
    position: 'left',
  },
  hello2: {
    text: 'Пожалуйста пройдите регистрацию!',
    type: 'TEXT',
    position: 'left',
  },
  name: {
    text: 'Напишите Ваше имя',
    type: 'TEXT',
    position: 'left',
  },
  surname: {
    text: 'Напишите Вашу фамилию',
    type: 'TEXT',
    position: 'left',
  },
  email: {
    text: 'Укажите Вашу электронную почту',
    type: 'TEXT',
    position: 'left',
  },
  validEmail: {
    text: 'Некорректный адрес',
    type: 'TEXT',
    position: 'left',
    error: true,
  },
  usedEmail: {
    text: 'Адрес электронной почты уже зарегистрирован',
    type: 'TEXT',
    position: 'left',
    error: true,
  },
  emailCode: {
    text:
      'Вам на электронную почту поступило письмо от платформы «Играем» с кодом подтверждения, укажите его',
    type: 'TEXT',
    position: 'left',
  },
  validEmailPassword: {
    text: 'Некорректный код',
    type: 'TEXT',
    position: 'left',
    error: true,
  },
  createPassword: {
    text: 'Создайте пароль',
    type: 'TEXT',
    position: 'left',
  },
  validPassword: {
    text: 'Некорректный пароль!',
    type: 'TEXT',
    position: 'left',
    error: true,
  },
  verifyPassword: {
    text: 'Подтвердите пароль',
    type: 'TEXT',
    position: 'left',
  },
  validVerifyPassword: {
    text: 'Пароль не совпадает',
    type: 'TEXT',
    position: 'left',
    error: true,
  },
  consent: {
    text: 'Согласие на\n обработку данных',
    type: 'FILE',
    svg: <Consent />,
    position: 'left',
  },
  consent2: {
    text: 'Лицензионное\n соглашение',
    type: 'FILE',
    svg: <Consent />,
    position: 'left',
  },
  iAgree: {
    text: 'Я согласен',
    type: 'TEXT',
    position: 'right',
  },

  validConsent: {
    text: 'Вы должны дать согласие на обработку данных госуслуги. Нажатие кнопку на верху',
    type: 'TEXT',
    position: 'left',
  },

  finished: {
    text: 'Поздравляем! Вы успешно зарегистрировались',
    type: 'TEXT',
    position: 'left',
  },
}

export default messageDefault
