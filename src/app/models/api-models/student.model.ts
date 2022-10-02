import { Gender } from "../api-models/gender.model";
import { Address } from "../api-models/address.model";

export interface Student{
  id: string,
  firstName: string,
  lastName: string,
  genderId: string,
  gender: Gender,
  address: Address
}
