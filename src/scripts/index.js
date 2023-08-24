window.addEventListener("DOMContentLoaded", () => {
	const text = document.querySelector("#text");
	const textAlert = document.querySelector("#alert_text");
	const textformat = document.querySelector("#format");
	const textCase = document.querySelector("#case");
	const textStyle = document.querySelectorAll("input[name='style[]']");
	const textResult = document.querySelector("#result");
	const btnClearText = document.querySelector("#clear_text");
	const btnFormatText = document.querySelector("#btn_format");
	const copyTextResult = document.querySelector("#copy_text_result");
	let currentFormat = "";

	if (btnClearText) {
		btnClearText.addEventListener("click", function (evt) {
			text.value = "";
			textAlert.innerHTML = "";
			textformat.value = "";
			textCase.value = "";
			currentFormat = "";
			textResult.innerHTML = "";
			clearStyles();
		});
	}

	if (btnFormatText) {
		btnFormatText.addEventListener("click", function (evt) {
			textAlert.innerHTML = "";
			currentFormat = text.value;

			if (text.value == "" || !text.value) {
				textAlert.innerHTML = "No text pasted. Paste your text above!";
				return;
			}

			const resultElem = createFormat();
			const styles = " " + Object.values(getStyles()).join(" ").trim();

			if (styles) resultElem.classList += styles;

			resultElem.textContent = currentFormat;
			textResult.innerHTML = "";
			textResult.appendChild(resultElem);
		});
	}

	if (copyTextResult) {
		copyTextResult.addEventListener("click", function () {
			// navigator.clipboard.writeText(textResult.innerHTML);
			const copy = document.querySelector("#copy_text_alert");

			const doc = document;
			let range;
			let selection;

			if (doc.body.createTextRange) {
				range = doc.body.createTextRange();
				range.moveToElement(textResult);
				range.select();
			} else if (window.getSelection) {
				selection = window.getSelection();

				range = doc.createRange();
				range.selectNodeContents(textResult);

				selection.removeAllRanges();
				selection.addRange(range);
			}

			document.execCommand("copy");
			window.getSelection().removeAllRanges();
			copy.textContent = "Content copied to clipboard!";

			setTimeout(() => (copy.textContent = ""), 3000);
		});
	}

	function createFormat() {
		const resultElem = document.createElement(textformat.value);

		if (textCase.value === "sentence")
			currentFormat = toSentenceCase(text.value);
		else {
			if (textCase.value != "normal") resultElem.classList = textCase.value;
		}

		return resultElem;
	}

	function getStyles() {
		let arr = {
			bold: "",
			italic: "",
			underline: "",
		};

		for (let index = 0; index < textStyle.length; index++) {
			const elem = textStyle[index];
			if (elem.checked) arr[elem.id] = elem.value;
		}

		return arr;
	}

	function clearStyles() {
		for (let index = 0; index < textStyle.length; index++) {
			const elem = textStyle[index];
			elem.checked = false;
		}
	}

	function toSentenceCase(str) {
		return (
			str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase()
		);
	}
});
