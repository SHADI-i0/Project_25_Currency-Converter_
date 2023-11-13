let apiKey = prompt("create Api Key : /https://app.exchangerate-api.com/dashboard/", "ba96062c5982fa7b17b32d24")
const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
console.log(fromCurrency, toCurrency);
const button = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_list) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "SYP" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].innerHTML += optionTag;
    }
    dropList[i].addEventListener("change", (e) => {
        loadFlag(e.target)
    })
}

function loadFlag(element) {
    for (code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
        }
    }
}

window.onload = function () {
    getExchangeRate()
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate()
})


function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    if (amount.value == "" || amount.value == "0") {
        amount.value = 1;
    }
    exchangeRateTxt.innerHTML = "Getting Exchange Rate...";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (+amount.value * exchangeRate).toFixed(2);
            exchangeRateTxt.innerHTML = `${amount.value} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        }).catch(() => {
            exchangeRateTxt.innerHTML = "SomeThing Went Wrong"
        })
}