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
    document.getElementById('zimmedariyan').innerText = zimmadar;
    document.getElementById('milkiyat').innerText = maliyat;

    document.getElementById("total").innerText = maliyat - zimmadar

    function percentage(num, per) {
        return (num / 100) * per;
    }

    document.getElementById("zakat").innerText = percentage(maliyat - zimmadar, 2.5).toFixed(2)
}
