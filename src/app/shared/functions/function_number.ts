
class FunctionNumber {

    defaultDecimal(number: string): number{
        var value;
        value = number.replace(/\./g, '');
        value = value.replace(/\,/g, '.');
        return Number(number);
    }

}

export default new FunctionNumber();