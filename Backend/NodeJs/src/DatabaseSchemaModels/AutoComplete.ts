import * as mongoose from 'mongoose';


class AutoComplete {
    public AutoCompleteSchema = new mongoose.Schema({
        word: {
            type: String
        },
        displayname: {
            type: String
        },
        category: {
            type: String
        }
    });
}

let A = new AutoComplete();
export let autocomplete = mongoose.model("AutoComplete", A.AutoCompleteSchema);
