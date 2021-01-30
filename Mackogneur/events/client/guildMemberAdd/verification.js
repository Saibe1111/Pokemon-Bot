const jsonQ = require("../../../config/questions.json");

class Verification {

    /**
     * List of cached Products, mapped by CodeCli
     * @type {Map<string, Verification>}
     */
    static list = new Map();

    /**
     * @param {number} ID
     * @param {string} Answer
     */
    constructor(ID, RandomNumber,member,number) {
        this.getID = () => {
            return ID;
        }

        this.getMember = () => {
            return member;
        }

        this.getNumber = () => {
            return number;
        }
        
        this.getAnswer = () => {

            let GoodAnswers = ''
            let lettreGoodAnswers = 'A';
            for (i in jsonQ.QUESTIONS[RandomNumber].ANSWERS) {
                if (jsonQ.QUESTIONS[RandomNumber].ANSWERS[i] == jsonQ.QUESTIONS[RandomNumber].GOODANSWER) {
                    GoodAnswers = lettreGoodAnswers;
                }
                lettreGoodAnswers = nextChar(lettreGoodAnswers);
            }
            return GoodAnswers;
        }

        Verification.list.set(ID, this);
    }

}

module.exports = Verification;

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}