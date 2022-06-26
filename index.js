const URL_BASE = "https://rooftop-career-switch.herokuapp.com";
const EMAIL = "jayrojesuskusalazar@gmail.com";

const mockToken = "0ec7703e-4d5c-4bd9-9ec9-17409fc316e4";
const mockBlocks = [
  "Lb6ijvnZBuc48M8tZRc6lY4OIUjWoluNpiDTtVeVpHkkQyyFYoI31FnUJbLIly7XXLrDKi29wpRUIMfQyHhacpCAhY1M1vRSKb2P",
  "0KmcBLDoA2tD5HIr6eNj446uEc4a4lWPBPoT5A98f17OtuPo3w4Fx72rozz1tOkcbq6QLHLOXhlflxlkNp2aIbzOBrkBvRxIzWFA",
  "mjJyq7b4R8CQ9jTKtLSY8XSdkcx8e3E54lFEFW73i2TarfyJWcuz0kQYmovflT6XbSLUSpA2McfReoJmaS1ZR8SoEDvovTumD75P",
  "bzmf68QLuxfyO7xRNBx8DbUqDSCxmDEaWXxl0kHSiIoBNsn7sGRNFRySczOPdfzlOiqFbQQkxDGFBmugUxXY6nSlP99O0AdwYSsY",
  "7VLwTz7VTByzmqRq9kGDnlPOEPaGs7ecYZf0icMJZ2jq5HfOyrpOBJ3VqVtwz3XegH2G7zFea2FNITJinDJt38rkRXC4RfE68Cbg",
  "tDOWUsUwvwzwGKqcnOuwAmA9XuzdFyc26EuUt0YKb89QVIq9YZhFNaXCcZD4y3t2kZi5jXMsJbA7EdBYOD9IxzCWkQUVwO7AKi13",
  "tXvGJe95wxnVjhZLJ8WOqvT0R24WFNfk5QlejQsLWlm3JXy4l3kd8sHu402hokSEoDgE7WLTb6ocpxnF27cgeVvoHVAnDxNtTQeh",
  "G0aT2yOX75f8F3xDlcMZDM8QPwhxa28ECvr4ZESU8D8T0glnjGldnDAkdvG0JcDrru9RADmKSSOScnLjSPRq2iqFwka2aLZ4nhks",
  "eXfqzIRXKqctGxtrpDVcGuAwwPXLvGs8B7v39VavX5Hg2532uI6czuSjPPG8i8hF3UN5hUCP1LRcK2zYTom7mq1DLgJBZ9RpdtlD",
];
const mockFirstBlock =
  "Lb6ijvnZBuc48M8tZRc6lY4OIUjWoluNpiDTtVeVpHkkQyyFYoI31FnUJbLIly7XXLrDKi29wpRUIMfQyHhacpCAhY1M1vRSKb2P";

async function getToken() {
  fetch(`${URL_BASE}/token?email=${EMAIL}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.token);
      return data.token;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getAllBlocks(token) {
  fetch(`${URL_BASE}/blocks?token=${token}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
}

function guessNextBlock(blockArray, prevBlock, token) {
  let nextBlock = "";
  blockArray.forEach((block) => {
    fetch(`${URL_BASE}/check?token=${token}`, {
      method: "POST",
      body: JSON.stringify({
        blocks: [prevBlock, block],
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          console.log("nextBlock", block);
          nextBlock = block;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
  console.log("nextBlock", nextBlock);
  return nextBlock;
}

//guessNextBlock(mockBlocks, mockFirstBlock, mockToken);

async function getHash() {
  let newBlockArray = [];
  try {
    const token = await getToken();
    if (token) {
      console.log("newToken", token);
    }
  } catch (err) {
    console.error(err);
  }
}

getHash();
