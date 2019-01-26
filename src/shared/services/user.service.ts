import { Injectable } from '@angular/core';
import { UserDto } from '../models/UserDto';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private users : Array<UserDto>;

  constructor(private _http: HttpClient) {  }

  /**
   * Return all users
   *
   * @returns {Promise<Array<UserDto>>}
   * @memberof UserService
   */
  public async getAll(skip: number=0, take: number=30): Promise<Array<UserDto>>{

    /*return new Promise<Array<UserDto>>( (resolve, reject) => {
      try {
        resolve(this.users);
      } catch (error) {
        reject(error);
      }
    });*/

    //chiamata alle REST API
    return this._http.get<Array<UserDto>>(environment.API_URL + `User/Find?skip=${skip}&take=${take}`)
                     .toPromise();

  }


  /**
   * Return user by id
   *
   * @param {number} id
   * @returns {Promise<UserDto>}
   * @memberof UserService
   */
  public async getById(id: number): Promise<UserDto>{

    /*return new Promise<UserDto>( (resolve, reject) => {
      try {
        let user = this.users.find( xx => xx.id == id ) || new UserDto();
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });*/

    //chiamata alle REST API
    return this._http.get<UserDto>(environment.API_URL + `User/FindById/${id}`)
    .toPromise();


  }


  /**
   * update a user
   *
   * @param {UserDto} user
   * @returns {Promise<UserDto>}
   * @memberof UserService
   */
  public async update(user: UserDto): Promise<UserDto>{

        //chiamata PUT alle REST API
        return this._http.put<UserDto>(environment.API_URL + `User/Find`, user)
        .toPromise();

      }


  /**
   * Insert a new user
   *
   * @param {UserDto} user
   * @returns {Array<UserDto>}
   * @memberof UserService
   */
  public insert(user:UserDto): Array<UserDto>{
    this.users.push(user);
    return this.users;
  }




}
