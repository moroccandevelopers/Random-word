window.addEventListener("load", () => {

    // select an element from the DOM
    // support all css selectors
    function get(selector) {
        var elements = document.querySelectorAll(selector);

        if (elements.length == 1 && selector.indexOf("#") == 0)
            return elements[0];

        return elements;
    }

    // select text in a container (div, section, span, ...)
    // src: https://stackoverflow.com/questions/1173194/select-all-div-text-with-single-mouse-click?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    function selectElementText(containerid) {
        var element = get(containerid);
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
            return true;
        }
        else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(element);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            return true;
        }

        return false;
    }

    // return an integer number x
    // min <= x < max
    function random(min, max) {
        return Math.floor(Math.random() * (max - min));
    }

    function generateRandomWord(charList, length) {
        var word = "";
        var index;

        for (var i = 1; i <= length; i++) {
            index = random(0, charList.length);
            word += charList[index];
        }

        return word;
    }

    // default char list
    var defaultCharList = "abcdefghijklmnopqrstuvwxyz";
    defaultCharList += defaultCharList.toLocaleUpperCase();
    defaultCharList += "0123456789 &'(-_)=^$*<>?./,;:!";

    var txtCharList = get("#txtCharList");
    var btnGenerate = get("#btnGenerate");
    var outWord = get("#outWord");
    var txtWordLength = get("#txtWordLength");
    var btnCopy = get("#btnCopy");

    btnGenerate.addEventListener("click", () => {
        var charList = txtCharList.value;
        var length = txtWordLength.value;

        if (charList.length == 0) {
            charList = defaultCharList;
        }

        outWord.innerHTML = "";
        outWord.appendChild(document.createTextNode(generateRandomWord(charList, length)));
    });

    btnCopy.addEventListener("click", () => {
        if(selectElementText("#" + outWord.id)) {
            document.execCommand("Copy");
        }
    });
});
