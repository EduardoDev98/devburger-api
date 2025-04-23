//import * as Yup from 'yup';
//import User from '../models/User';

//class SessionController {
// async store(request, response) {
//   const schema = Yup.object({
//    email: Yup.string().email().required(),
//    password: Yup.string().min(6).required(),
//  });

//  const isValid = await schema.isValid(request.body);
// const emailOrPasswordIncorrect = () => {
//   response
//     .status(401).json({ error: 'Make sure your email or password are correct' });
// }


//if (!isValid) {
//   return emailOrPasswordIncorrect();
// }

// const { email, password } = request.body;
// const user = await User.findOne({
//   where: {
//     email,
//   },
// });
//  if (!isValid) {
//   return emailOrPasswordIncorrect();
//  }


// const isSamePassword = await user.checkPassword(password);



// if (!isSamePassword) {
//return emailOrPasswordIncorrect();
// }

// return response.status(201).json({
//  id: user.id,
//  name: user.name,
// email,
//  admin: user.admin,
// });
//}
//}
//export default new SessionController();


import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    // Verifica se os dados do corpo são válidos
    const isValid = await schema.isValid(request.body);
    if (!isValid) {
      return response.status(401).json({ error: 'Make sure your email or password are correct' });
    }

    const { email, password } = request.body;

    // Busca o usuário no banco de dados
    const user = await User.findOne({
      where: { email },
    });

    // Se o usuário não existir, retorna erro
    if (!user) {
      return response.status(401).json({ error: 'Make sure your email or password are correct' });
    }

    // Compara a senha usando `checkPassword()`
    const isSamePassword = await user.checkPassword(password);

    // Se a senha estiver errada, retorna erro
    if (!isSamePassword) {
      return response.status(401).json({ error: 'Make sure your email or password are correct' });
    }

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
    });
  }
}

export default new SessionController();