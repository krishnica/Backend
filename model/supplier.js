const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const SupplierSchema = new mongoose.Schema({
    supplierId: { type: String, required: true, maxlength: 50 },
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, minlength: 5, maxlength: 255, unique: true },
    phoneNo: { type: String, required: true, minlength: 4, maxlength: 13, unique: false },
    password: { type: String, required: true, minlength: 5, maxlength: 1024, },
    address: { type: String, required: true, minlength: 5, maxlength: 255, unique: false },
    ownerId: { type: String, required: true, maxlength: 50 },
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

SupplierSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, 'jwtPrivateKey')
    return token;
}



function makeId(str) {
    let tmpId;
    let tmpDate = new Date();
    if (str == "null") {
        let date = '' + tmpDate.getDate();
        let month = '' + (tmpDate.getMonth() + 1);
        let year = '' + tmpDate.getFullYear();
        if (month.length < 2) {
            month = "0" + month
        }
        if (date.length < 2) {
            date = "0" + date
        }
        tmpId = "SUP" + year.substring(2) + month + date + "C001";
    } else {
        // SUPYYMMDDC111
        str = str.split("C")
        let idDate = str[0].substring(7, 9)   /* */
        let idMonth = str[0].substring(5, 7) /* */
        let idYear = str[0].substring(3, 5) /* */
        let Idcount = Number(str[1])

        let date = '' + tmpDate.getDate();
        let month = '' + (tmpDate.getMonth() + 1);
        let year = '' + tmpDate.getFullYear();
        if (month.length < 2) {
            month = "0" + month
        }
        if (date.length < 2) {
            date = "0" + date
        }
        year = year.substring(2)
        if (date == idDate && month == idMonth && year == idYear) {
            let tmp = '' + Number(Idcount + 1);
            if (tmp.length == 1) {
                tmp = "00" + tmp
            } else if (tmp.length == 2) {
                tmp = "0" + tmp
            }
            tmpId = "SUP" + idYear + idMonth + idDate + "C" + tmp;
        } else {
            if (date != idDate && month == idMonth && year == idYear) {
                tmpId = "SUP" + idYear + idMonth + date + "C001";
            }
            if (month != idMonth && year == idYear) {
                tmpId = "SUP" + idYear + month + date + "C001";
            }
            if (year != idYear) {
                tmpId = "SUP" + year + month + date + "C001";
            }
        }
    }
    return tmpId;
}


const Supplier = mongoose.model('suppplier', SupplierSchema)

exports.Supplier = Supplier;
exports.MakeId = makeId;