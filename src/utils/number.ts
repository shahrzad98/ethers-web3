/* eslint-disable prefer-const */
const validNumberRegex = new RegExp("^[0-9]+$");

const extractNumbers = (str: string): string[] => {
    const string = str + "";
    return string.match(/\d+/g) || [];
};
const parseValueToNumber = (value: string): string => {
    return value?.indexOf(",") >= 0 ? value?.replaceAll(",", "") : value;
};

const formatNumberWithCommas = (value: any = ""): string => {
    return value?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
const isValidNumber = (value: any): boolean => {
    let _value = value.toString();
    _value = _value?.indexOf(",") >= 0 ? _value?.replaceAll(",", "") : _value;

    _value = _value?.indexOf(".") >= 0 ? _value?.replace(".", "") : _value;

    const dotIndex = value?.toString()?.indexOf(".");
    const realDecimal = dotIndex > 0 ? value?.toString()?.substring(dotIndex + 1).length : 0;

    if (_value === "") {
        return true;
    } else if (realDecimal > 2) {
        return false;
    } else {
        return validNumberRegex.test(_value);
    }
};

export { extractNumbers, parseValueToNumber, formatNumberWithCommas, isValidNumber };
