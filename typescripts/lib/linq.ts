
Array.prototype.swapValues = function (firstIndex, secondIndex) {
    if (this.length < (firstIndex > secondIndex ? firstIndex : secondIndex))
        throw new Error("[swap function] Array length must be greater than passed indexes.");
    var temp = this[firstIndex];
    this[firstIndex] = this[secondIndex];
    this[secondIndex] = temp;
    return this;
};
Array.prototype.isInitializedWithData = function () {
    if (this.length < 1)
        return false;
    else
        return true;
};
Array.prototype.where = function (filter) {
    if (this.isInitializedWithData() !== true)
        return this;
    isAFunction(filter);
    var returnedList = [];
    for (var c = 0; c < this.length; c++) {
        var filterResult = filter(this[c]);
        if (typeof filterResult !== "boolean")
            throw new Error("where clause accepts only a function that returns boolean value");
        if (filter(this[c]) === true)
            returnedList.push(this[c]);
    }
    return returnedList;
};
Array.prototype.select = function (selector) {
    if (this.isInitializedWithData() !== true)
        return this;
    isAFunction(selector);
    var returnedList = [];
    for (var c = 0; c < this.length; c++) {
        returnedList.push(selector(this[c]));
    }
    return returnedList;
};
Array.prototype.firstOrDefault = function (filter) {
    if (filter === undefined || filter === null) {
        if (this.isInitializedWithData())
            return this[0];
        else
            return null;
    }
    else if (typeof filter !== "function")
        throw new Error("[firstOrNull function] [filter parameter] must be of type function that returns boolean, null or undefined.");
    else {
        for (var c = 0; c < this.length; c++) {
            var filterResult = filter(this[c]);
            if (typeof filterResult !== "boolean")
                throw new Error("[firstOrNull function] [filter parameter] must be of type function that returns boolean, null or undefined.");
            if (filterResult === true)
                return this[c];
        }
        return null;
    }
};
Array.prototype.lastOrDefault = function (filter) {
    if (filter === undefined || filter === null) {
        if (this.isInitializedWithData())
            return this[this.length - 1];
        else
            return null;
    }
    else if (typeof filter !== "function")
        throw new Error("[lastOrDefault function] [filter parameter] must be of type function that returns boolean, null or undefined.");
    else {
        for (var c = this.length - 1; c >= 0; c--) {
            var filterResult = filter(this[c]);
            if (typeof filterResult !== "boolean")
                throw new Error("[lastOrDefault function] [filter parameter] must be of type function that returns boolean, null or undefined.");
            if (filterResult === true)
                return this[c];
        }
        return null;
    }
};
Array.prototype.take = function (number) {
    if (this.isInitializedWithData() !== true || number > this.length)
        return this;
    if (number === undefined || number === null || typeof number !== "number" || number < 1)
        throw new Error("[take function] [number parameter] must be of type number and greater than 0.");
    var returnedList = [];
    for (var c = 0; c < number; c++) {
        returnedList.push(this[c]);
    }
    return returnedList;
};
Array.prototype.takeWhile = function (filter) {
    if (this.isInitializedWithData() !== true)
        return this;
    isAFunction(filter);
    var returnedList = [];
    for (var c = 0; c < this.length; c++) {
        var filterResult = filter(this[c]);
        if (typeof filterResult !== "boolean")
            throw new Error("where clause accepts only a function that returns boolean value");
        if (filter(this[c]) === true)
            returnedList.push(this[c]);
        else
            break;
    }
    return returnedList;
};
Array.prototype.skip = function (number) {
    if (this.isInitializedWithData() !== true)
        return this;
    if (number === undefined || number === null || typeof number !== "number" || number < 1)
        throw new Error("[skip function] [number parameter] must be of type number and greater than 0.");
    if (number >= this.length)
        return [];
    var returnedList = [];
    for (var c = (number); c < this.length; c++) {
        returnedList.push(this[c]);
    }
    return returnedList;
};
Array.prototype.skipWhile = function (filter) {
    if (this.isInitializedWithData() !== true)
        return this;
    isAFunction(filter);
    var returnedList = [];
    var isSkipped = false;
    for (var c = 0; c < this.length; c++) {
        if (isSkipped === false) {
            var filterResult = filter(this[c]);
            if (typeof filterResult !== "boolean")
                throw new Error("[skipWhile function] [filter parameter] must be a function that returns boolean value");
            isSkipped = !filterResult;
        }
        if (isSkipped === true)
            returnedList.push(this[c]);
    }
    return returnedList;
};
Array.prototype.orderBy = function (filter) {
    if (this.isInitializedWithData() !== true)
        return this;
    if (filter === undefined && (typeof this[0] == "boolean" || typeof this[0] == "number" || typeof this[0] == "string"))
        return orderPrimitivesArray(this, false);
    else
        return orderObjectsArray(this, filter, false);
};
Array.prototype.orderByDesc = function (filter) {
    if (this.isInitializedWithData() !== true)
        return this;
    if (filter === undefined && (typeof this[0] == "boolean" || typeof this[0] == "number" || typeof this[0] == "string"))
        return orderPrimitivesArray(this, true);
    else
        return orderObjectsArray(this, filter, true);
};
Array.prototype.groupBy = function (filter) {
    if (this.isInitializedWithData() !== true)
        return this;
    var filterType = typeof filter;
    if (filterType !== "string" && filterType !== "function")
        throw new Error("[groupBy function] [filter] must be of type string that represent a property name which should be exists in each of array elements. Or a function that return the value to sort.");
    var groupedList = [];
    for (var c = 0; c < this.length; c++) {
        var keyValue = filterType == "string" ? eval("this[c]." + filter) : filter(this[c]);
        if (keyValue && keyValue.constructor === Array)
            throw new Error("[groupBy function] key value can't be of type Array.");
        var keyFound = false;
        for (var j = 0; j < groupedList.length; j++) {
            if (deepCompare(groupedList[j].key, keyValue)) {
                groupedList[j].value.push(this[c]);
                keyFound = true;
                break;
            }
        }
        if (!keyFound)
            groupedList.push({ key: keyValue, value: [this[c]] });
    }
    return groupedList;
};
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
    return this;
};
Array.prototype.any = function (filter) {
    if (filter !== undefined && (typeof filter !== "function" || filter.length !== 1))
        throw new Error("[filter parameter] must be a function that expect an array element as a parameter and returns boolean.");
    if (this.isInitializedWithData() !== true)
        return false;
    if (!filter)
        return true;
    for (var c = 0; c < this.length; c++) {
        var predicate = filter(this[c]);
        if (typeof predicate !== "boolean")
            throw new Error("[filter parameter] must be a function that returns boolean.");
        if (predicate === true)
            return true;
    }
    return false;
};
Array.prototype.all = function (filter) {
    if (filter === undefined || typeof filter !== "function" || filter.length !== 1)
        throw new Error("[filter parameter] must be a function that expect an array element as a parameter and returns boolean.");
    if (this.isInitializedWithData() !== true)
        throw new Error("Array must be initialized before using [all function].");
    for (var c = 0; c < this.length; c++) {
        var predicate = filter(this[c]);
        if (typeof predicate !== "boolean")
            throw new Error("[filter parameter] must be a function that returns boolean.");
        if (predicate === false)
            return false;
    }
    return true;
};
Array.prototype.max = function (selector) {
    if (this.isInitializedWithData() !== true)
        throw new Error("Array contains no elements.");
    if (selector && (typeof selector !== "function" || selector.length !== 1))
        throw new Error("[selector parameter] must be a function that expect an array element as parameter and returns a number.");
    var max;
    for (var c = 0; c < this.length; c++) {
        var valueToCompare;
        valueToCompare = (selector ? selector(this[c]) : this[c]);
        if (typeof valueToCompare !== "number")
            throw new Error("[max function] can operate only on numbers");
        if (!max)
            max = valueToCompare;
        else if (max < valueToCompare)
            max = valueToCompare;
    }
    return max;
};
Array.prototype.min = function (selector) {
    if (this.isInitializedWithData() !== true)
        throw new Error("Array contains no elements.");
    if (selector && (typeof selector !== "function" || selector.length !== 1))
        throw new Error("[selector parameter] must be a function that expect an array element as parameter and returns a number.");
    var min;
    for (var c = 0; c < this.length; c++) {
        var valueToCompare;
        valueToCompare = (selector ? selector(this[c]) : this[c]);
        if (typeof valueToCompare !== "number")
            throw new Error("[min function] can operate only on numbers");
        if (!min)
            min = valueToCompare;
        else if (min > valueToCompare)
            min = valueToCompare;
    }
    return min;
};
Array.prototype.average = function (selector) {
    if (this.isInitializedWithData() !== true)
        throw new Error("Array contains no elements.");
    if (selector && (typeof selector !== "function" || selector.length !== 1))
        throw new Error("[selector parameter] must be a function that expect an array element as parameter and returns a number.");
    var data = 0;
    for (var c = 0; c < this.length; c++) {
        var valueToCompare = (selector ? selector(this[c]) : this[c]);
        if (typeof valueToCompare !== "number")
            throw new Error("[avg function] can operate only on numbers");
        data += valueToCompare;
    }
    return data / this.length;
};
function orderObjectsArray(array, filter, isDescending) {
    if (isDescending === void 0) { isDescending = false; }
    var filterType = typeof (filter);
    if (filterType !== "string" && filterType !== "function")
        throw new Error("[orderBy function] [filter] must be of type string that represent a property name which should be exists in each of array elements. Or a function that return the value to sort.");
    var orderingType;
    var isNotOrderedYet = false;
    var ignoredFromSortingList = [];
    for (var c = 0; c < array.length; c++) {
        if (c === (array.length - 1)) {
            if (isNotOrderedYet === false)
                break;
            else {
                c = -1;
                isNotOrderedYet = false;
                continue;
            }
        }
        var firstValue = filterType === "string" ? eval("array[c]." + filter) : filter(array[c]);
        var secondValue = filterType === "string" ? eval("array[c + 1]." + filter) : filter(array[c + 1]);
        var isFirstItemRemoved = false;
        var isSecondItemRemoved = false;
        if (firstValue === undefined || firstValue === null) {
            isFirstItemRemoved = true;
            ignoredFromSortingList.push(array[c]);
            array.splice(c, 1);
        }
        if (secondValue === undefined || secondValue === null) {
            isSecondItemRemoved = true;
            ignoredFromSortingList.push(array[c + 1]);
            array.splice(c + 1, 1);
        }
        if (isFirstItemRemoved === true || isSecondItemRemoved === true) {
            isNotOrderedYet = true;
            c--;
            continue;
        }
        if (orderingType === undefined || orderingType === null)
            orderingType = typeof firstValue;
        if (typeof firstValue !== orderingType || typeof secondValue !== orderingType)
            throw new Error("[orderBy function] All elements must having " + filter + " property of the same type, null or undefined.");
        if (orderValues(array, firstValue, secondValue, c, c + 1, isDescending === true) === true)
            isNotOrderedYet = true;
    }
    return array.concat(ignoredFromSortingList);
}
function orderPrimitivesArray(array, isDescending) {
    if (isDescending === void 0) { isDescending = false; }
    var typeToCompare = typeof array[0];
    var isNotOrderedYet = false;
    for (var c = 0; c < array.length; c++) {
        if (c === (array.length - 1)) {
            if (isNotOrderedYet === false)
                break;
            else {
                c = -1;
                isNotOrderedYet = false;
                continue;
            }
        }
        if (typeof array[c] !== typeToCompare || typeof array[c + 1] !== typeToCompare)
            throw new Error("[orderBy function] All elements must be of the same type.");
        if (orderValues(array, array[c], array[c + 1], c, c + 1, isDescending) === true)
            isNotOrderedYet = true;
    }
    return array;
}
function orderValues(array, firstValue, secondValue, firstIndex, secondIndex, isDescending) {
    if (typeof firstValue === "string") {
        var comparisonResult = firstValue.localeCompare(secondValue);
        if (isDescending === true) {
            if (comparisonResult < 0) {
                array.swapValues(firstIndex, secondIndex);
                return true;
            }
        }
        else {
            if (comparisonResult > 0) {
                array.swapValues(firstIndex, secondIndex);
                return true;
            }
        }
    }
    else {
        if (typeof firstValue === "number" && isNaN(firstValue) && !isNaN(secondValue)) {
            array.swapValues(firstIndex, secondIndex);
            return true;
        }
        if (isDescending === true) {
            if (secondValue > firstValue) {
                array.swapValues(firstIndex, secondIndex);
                return true;
            }
        }
        else {
            if (secondValue < firstValue) {
                array.swapValues(firstIndex, secondIndex);
                return true;
            }
        }
    }
    return false;
}
function isAFunction(func) {
    if (func === undefined || func === null || typeof func !== "function")
        throw new Error("[filter parameter] must be of type function that returns boolean.");
}
function deepCompare(firstObject, secondObject) {
    var typeToCompare = typeof firstObject;
    if (typeToCompare !== typeof secondObject)
        return false;
    if (typeToCompare === "undefined")
        return true;
    if (firstObject.constructor !== secondObject.constructor)
        return false;
    if (typeToCompare === "boolean" || typeToCompare === "function" || typeToCompare === "number" || typeToCompare === "string" || firstObject instanceof Date || firstObject instanceof RegExp)
        return firstObject.toString() === secondObject.toString();
    if (firstObject.constructor === Array) {
        return deepCompareArray(firstObject, secondObject);
    }
    if (firstObject === null && secondObject === null)
        return true;
    if (firstObject === null || secondObject === null)
        return false;
    if (!hasSameNumberOfProperties(firstObject, secondObject))
        return false;
    for (var key in firstObject) {
        if (firstObject[key] !== secondObject[key])
            return false;
    }
    return true;
}
function hasSameNumberOfProperties(firstObject, secondObject) {
    var firstObjectPropertiesCount = 0;
    var secondObjectPropertiesCount = 0;
    for (var item in firstObject)
        firstObjectPropertiesCount++;
    for (var item in secondObject)
        secondObjectPropertiesCount++;
    return firstObjectPropertiesCount === secondObjectPropertiesCount;
}
function deepCompareArray(firstArray, secondArray) {
    if (firstArray.constructor !== Array || secondArray.constructor !== Array)
        throw new Error("[deepCompareArray] function parameters must be an arrays.");
    if (firstArray.length !== secondArray.length)
        return false;
    for (var item in firstArray) {
        if (deepCompare(firstArray[item], secondArray[item]) === false)
            return false;
    }
    return true;
}
function joinMatchedObjects(firstObject, secondObject) {
    var returnedObject = {};
    var skippedKeys = [];
    for (var key in firstObject) {
        var isOfTypeString = typeof firstObject[key] === "string";
        eval("returnedObject." + key + " = " + (isOfTypeString ? "'" + firstObject[key] + "'" : firstObject[key]));
        if (secondObject[key] !== undefined)
            skippedKeys.push(key);
    }
    for (var key in secondObject) {
        var isOfTypeString = typeof secondObject[key] === typeof "string";
        if (skippedKeys.firstOrDefault(function (o) { return o === key; }) === null)
            eval("returnedObject." + key + " = " + (isOfTypeString ? "'" + secondObject[key] + "'" : secondObject[key]));
        else {
            var indexToUse = 1;
            while (true) {
                var isAvailable = firstObject[key + indexToUse] === undefined;
                if (isAvailable === true)
                    break;
                indexToUse++;
            }
            eval("returnedObject." + key + indexToUse + " = " + (isOfTypeString ? "'" + secondObject[key] + "'" : secondObject[key]));
        }
    }
    return returnedObject;
}