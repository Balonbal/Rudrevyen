/**
 * Created by Sly on 03.12.2015.
 */
function checkParenthesis(str) {
    var countStart = (str.match(/\(/g) || []).length;
    var countEnd = (str.match(/\)/g) || []).length;

    return (countStart - countEnd);
}

function findNum(str, target) {
    var x = 0;
    var j = 0;
    while (x != target) {
        x = checkParenthesis(str.substr(0, j));
        j++;
    }

    return j;
}

function calculateArea(string) {
    var dims = string.split("x");
    var s1 = dims[0]*dims[1];
    var s2 = dims[1]*dims[2];
    var s3 = dims[0]*dims[2];
    return (2*(s1 + s2 + s3) + Math.min(s1, s2, s3));
}

function calcRibbon(string) {
    var dims = string.split("x");
    var smallest = 0, middle = 0;
    for (var dim in dims) {
        if (parseInt(dims[dim]) < smallest || smallest == 0) {
            if (smallest < middle || middle == 0) middle = smallest;
            smallest = parseInt(dims[dim]);
        } else if (parseInt(dims[dim]) < middle || middle == 0) {
            middle = parseInt(dims[dim]);
        }
    }
    return (2*smallest + 2*middle + dims[0]*dims[1]*dims[2])

}

function getPaper(list) {
    var sheets = list.split(",");
    var x = 0;
    for (var sheet in sheets){
        x += calcRibbon(sheets[sheet]);
    }
    return x;
}
