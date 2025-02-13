let qrCode;

        function generateQR() {
            const text = document.getElementById("text-input").value;
            const qrColorType = document.querySelector('input[name="qrColorType"]:checked').value;
            const bgColorType = document.querySelector('input[name="bgColorType"]:checked').value;
            const qrColor = document.getElementById("qrColor").value;
            const bgColor = document.getElementById("bgColor").value;
            const gradStartColor = document.getElementById("gradStartColor").value;
            const gradEndColor = document.getElementById("gradEndColor").value;
            const gradientType = document.getElementById("gradientType").value;
            const qrSize = parseInt(document.getElementById("qrSize").value);
            const dotStyle = document.getElementById("dotStyle").value;
            const cornerSquareStyle = document.getElementById("cornerSquareStyle").value;
            const cornerDotStyle = document.getElementById("cornerDotStyle").value;
            const bgGradStart = document.getElementById("bgGradStart").value;
            const bgGradEnd = document.getElementById("bgGradEnd").value;

            if (!text) {
                alert("Please enter text!");
                return;
            }

            const options = {
                width: qrSize,
                height: qrSize,
                data: text,
                image: "icon.png",
                qrOptions: {
                    typeNumber: 0,
                    mode: "Byte",
                    errorCorrectionLevel: "H"
                },
                dotsOptions: {
                    type: dotStyle,
                    gradient: qrColorType === "gradient" ? {
                        type: gradientType,
                        colorStops: [
                            { offset: 0, color: gradStartColor },
                            { offset: 1, color: gradEndColor }
                        ]
                    } : null,
                    color: qrColorType === "solid" ? qrColor : null
                },
                cornersSquareOptions: {
                    type: cornerSquareStyle,
                    color: gradStartColor
                },
                cornersDotOptions: {
                    type: cornerDotStyle,
                    color: gradEndColor
                },
                backgroundOptions: {
                    gradient: bgColorType === "gradient" ? {
                        type: gradientType,
                        colorStops: [
                            { offset: 0, color: bgGradStart },
                            { offset: 1, color: bgGradEnd }
                        ]
                    } : null,
                    color: bgColorType === "solid" ? bgColor : null
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 10
                }
            };

            if (qrCode) {
                qrCode.update(options);
            } else {
                qrCode = new QRCodeStyling(options);
                document.getElementById("qrcode-container").innerHTML = "";
                qrCode.append(document.getElementById("qrcode-container"));
            }
        }

        function downloadQR() {
            if (qrCode) {
                const format = document.getElementById("downloadFormat").value;
                qrCode.download({ name: "qr_code", extension: format });
            } else {
                alert("Please generate a QR code first!");
            }
        }