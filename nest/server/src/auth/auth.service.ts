import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService, private readonly JwtService: JwtService
  ){
    
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password)
    if (user && passwordIsMatch) {
     return user
    }
    throw new UnauthorizedException('Пароль не верный');
  }

  async login(user: IUser) {
   const {id, email} = user
   return {
    id, 
    email, 
    token: this.JwtService.sign({id:user.id, email: user.email}),
   }
  }

}
