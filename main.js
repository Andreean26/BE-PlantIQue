const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));

let responseMessage = "";

app.post('/sensor', (req, res) => {
  // Handle request from ESP8266
  const nddi = req.body.status;
  console.log(' ',  nddi);


  if (nddi <= 10.00) {
    statusValue = "KERING SEKALI";
  } else if (nddi >= 10.00 && nddi <= 30.00) {
    statusValue = "KERING BERAT";
  } else if (nddi >= 30.00 && nddi <= 40.00) {
    statusValue = "KERING RINGAN";
  } else if (nddi <= 50.00 && nddi >= 40.00) {
    statusValue = "NORMAL";
  } else if (nddi > 50.00) {
    statusValue = "AIR";
  }

  responseMessage = statusValue;

  // switch (nddiValue) {
  //   case "AIR":
  //     responseMessage = "AIR";
  //     break;
  //   case "NORMAL":
  //     responseMessage = "NORMAL";
  //     break;
  //   case "KERING RINGAN":
  //     responseMessage = "KERING RINGAN";
  //     break;
  //   case "KERING SEDANG":
  //     responseMessage = "KERING SEDANG";
  //     break;
  //   case "KERING BERAT":
  //     responseMessage = "KERING BERAT";
  //     break;
  //   case "KERING SEKALI":
  //     responseMessage = "KERING SEKALI";
  //     break;
  // }
  

  lastNddiValue = nddi; // Simpan nilai terakhir

  console.log(' ', responseMessage);

  res.send(responseMessage);
});

// Tambahkan endpoint GET untuk mendapatkan nilai terakhir
app.get('/sensor', (req, res) => {
  // console.log('Get last NDDI value:', lastNddiValue);
  res.json({
    nddiValue: lastNddiValue,
    responseMessage: responseMessage,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
