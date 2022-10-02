import { Address } from "../ui-models/address.model";
import { Gender } from "../ui-models/gender.model";

export interface Student{
  id: string,
  firstName: string,
  lastName: string,
  genderId: string,
  gender: Gender,
  address: Address
}
