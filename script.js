function language() {
    let language = document.getElementById("lang").value;

    if (language == "u") {
        window.open('/zakat-calculator', '_self');
    } else {
        window.open('r-urdu.htm', '_self');
    }
}


function calculate() {
    let maliyat = [
        Number(document.getElementById("01").value) +
        Number(document.getElementById("02").value) +
        Number(document.getElementById("03").value) +
        Number(document.getElementById("04").value) +
        Number(document.getElementById("05").value) +
        Number(document.getElementById("06").value) +
        Number(document.getElementById("07").value) +
        Number(document.getElementById("08").value) +
        Number(document.getElementById("09").value) +
        Number(document.getElementById("010").value) +
        Number(document.getElementById("011").value) +
        Number(document.getElementById("012").value)
    ];

    let zimmadar = [
        Number(document.getElementById("1").value) +
        Number(document.getElementById("2").value) +
        Number(document.getElementById("3").value) +
        Number(document.getElementById("4").value) +
        Number(document.getElementById("5").value) +
        Number(document.getElementById("6").value) +
        Number(document.getElementById("7").value) +
        Number(document.getElementById("8").value) +
        Number(document.getElementById("9").value) +
        Number(document.getElementById("10").value) +
        Number(document.getElementById("11").value)
    ];

    document.getElementById("result").style.display = "block";
    document.getElementById('zimmedariyan').innerText = Number(zimmadar).toFixed(2);
    document.getElementById('milkiyat').innerText = Number(maliyat).toFixed(2);

    document.getElementById("total").innerText = Number(maliyat).toFixed(2) - Number(zimmadar).toFixed(2);

    function percentage(num, per) {
        return (num / 100) * per;
    }

    if (percentage(Number(maliyat) - Number(zimmadar), 2.5).toFixed(2) < 0) {
        document.getElementById("zakat").innerText = 0
    } else {
        document.getElementById("zakat").innerText = percentage(Number(maliyat) - Number(zimmadar), 2.5).toFixed(2);
    }
}

// ----------- calculator-input --------------

$(document).ready(function () {
    // Add input event listener to all input fields with class "calculator-input"
    $('.calculator-input').on('change', function () {
        // Get the input value
        var inputVal = $(this).val();
        // Check if the input contains any non-mathematical characters
        if (/[^\d()+\-*/.\s]/.test(inputVal)) {
            // Clear the input field if there are any non-mathematical characters
            $(this).val('');
            return;
        }
        // Evaluate the input as a mathematical expression
        try {
            var result = eval(inputVal);
            // Set the input field value to the result of the calculation
            $(this).val(result);
        } catch (error) {
            // If there is an error in the calculation, clear the input field
            $(this).val('');
        }
    });
});