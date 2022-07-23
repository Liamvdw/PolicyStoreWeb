export class Policy {
    id: any;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    policyNo: string;
    
    constructor(id: any, firstName: string, lastName: string, gender: string, dateOfBirth: string, policyNo: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.policyNo = policyNo;
    }
}