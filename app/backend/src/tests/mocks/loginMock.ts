const hashedPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

const userBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const noEmptyEmail = {
  email: '',
  password: 'secret_admin',

}

const noEmptyPassword = {
  email: '',
  password: 'secret_admin',
}

const existingUser = { 
  id: 1, 
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: hashedPassword,
};

export default {
  existingUser,
  userBody,
  noEmptyEmail,
  noEmptyPassword,
}