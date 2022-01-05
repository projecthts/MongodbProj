import {tempusers} from "../../src/DatabaseSchemaModels/TempUsers"

export class Fix{
    public static deletereguser(){
        return tempusers.deleteOne({email: "nutumalhotra@gmail.com"});
    }
}

export let fix = new Fix();