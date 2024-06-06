
export class User {
	name: string;
	surName: string;
	age: string;
	gender: string;
	EmailID: string | number;
	password:number| string;
	phone: number;
	
	constructor(
	name: string,
	surName: string,
	age: string,
	gender: string ,
	EmailID: string,
	password: string|number,
	phone: number,
){

	this.name = name;
	this.surName = surName;
	this.age = age; 
	this.gender = gender;
	this.EmailID = EmailID;
	this.password = password;
	this.phone = phone
	
}
}