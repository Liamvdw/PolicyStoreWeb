import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment"
import { Policy } from "../model/policy.model"
import { ResponseMessage } from "../model/responseMessage.model";

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {
    }

    getAllPolicies() {
        return this.http.get<Policy[]>(environment.webServiceUrl + 'GetPolicies/', { responseType: 'json' });
    }

    deletePolicy(row) {
        return this.http.delete<ResponseMessage>(environment.webServiceUrl + 'DeletePolicy/' + row.policyNo, { responseType: 'json' });
    }

    addPolicy(row) {
        return this.http.post<Policy>(environment.webServiceUrl + 'AddPolicy/', row, { responseType: 'json' });
    }

    updatePolicy(policyNo, row) {
        return this.http.put<Policy>(environment.webServiceUrl + 'UpdatePolicy/' + policyNo, row, { responseType: 'json' });
    }
}

