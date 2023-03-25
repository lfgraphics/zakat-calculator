function language() {
    let language = document.getElementById("lang").value;

    if (language == "u") {
        window.open('/zakat-calculator', '_self');
    } else if (language == "e") {
        window.open('/zakat-calculator/e.htm', '_self')
    } else if (language == "ru") {
        window.open('/zakat-calculator/r-urdu.htm', '_self')
    } else {
        window.open('/zakat-calculator/hi.htm', '_self');
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

    let zimmedariyan = Number(zimmadar).toFixed(2);
    let kul_maal = Number(maliyat).toFixed(2)
    let final_milkiyat = kul_maal - zimmedariyan

    document.getElementById('zimmedariyan').innerText = zimmedariyan;
    document.getElementById('milkiyat').innerText = kul_maal;

    document.getElementById("total").innerText = final_milkiyat.toFixed(2);

    if ((final_milkiyat - final_milkiyat * 97.5 / 100).toFixed(2) < 0) {
        document.getElementById("zakat").innerText = 0
    } else {
        document.getElementById("zakat").innerText = (final_milkiyat - final_milkiyat * 97.5 / 100).toFixed(2);
    }
}
// percentage(Number(maliyat) - Number(zimmadar), 2.5).toFixed(2)
// ----------- calculator-input --------------

$(document).ready(function () {
    // window.open('https://wafaqulmasajid-github-io.translate.goog/zakat-calculator/?_x_tr_sl=en&_x_tr_tl=ur&_x_tr_hl=en&_x_tr_pto=wapp')

    // Add input event listener to all input fields with class "calculator-input"
    $('.calculator-input').on('change', function calculator() {
        // Get the input value
        let inputVal = $(this).val();
        // Check if the input contains any non-mathematical characters
        if (/[^\d()+\-*/.\s]/.test(inputVal)) {
            // Clear the input field if there are any non-mathematical characters
            $(this).val('');
            return;
        }
        // Evaluate the input as a mathematical expression
        try {
            let result = eval(inputVal);
            // Set the input field value to the result of the calculation
            $(this).val(result);
        } catch (error) {
            // If there is an error in the calculation, clear the input field
            $(this).val('');
        }
        if (document.getElementById("result").style.display == "block") {
            return calculate()
        }
    });
    // $('.gold').on('change', function () {
    //     let mainGold = Number(document.getElementById("01").value);
    //     this.value = mainGold - mainGold * 20 / 100;
    // })
});