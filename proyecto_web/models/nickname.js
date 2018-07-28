const User = require("./user");

let getNickname  = function () {
    const adjetive = ["Classic","Perfect","Darken","Obscure","Main"];
    const object = ["Youth","Doggy","Star","Perk","Lord"];

    return `${adjetive[Math.floor(Math.random()*5)]}${object[Math.floor(Math.random()*5)]}${Math.floor(Math.random()*50)}${Math.floor(Math.random()*50)}`

};

let nick = getNickname();
let name = false;

while (name = false) {
    User.findOne({nickname: nick})
        .then(user => {
            if (!user) {
                return name = true;
            } else {
                nick = getNickname();
            }
        });
}


module.exports = nick;