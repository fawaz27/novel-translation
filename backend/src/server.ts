import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { AuthentificationController } from './controllers/authentification.controller';
import { EmailConfirmationController } from './controllers/emailConfirmation.controller';
import { ResetPasswordController } from './controllers/resetPassword.controller';
import { AppDataSource } from './database/AppDataSource';

(async () => {


    try {
      await AppDataSource.initialize();
      
      
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    
    const app = new App([
      new AuthentificationController(),
      new EmailConfirmationController(),
      new ResetPasswordController()
    ]);
    
    
    app.listen();
    app.get();
    
    
    
})();