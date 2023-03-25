// XLSX is a global from the standalone script
let workbook;
async function handleFileAsync(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  workbook = XLSX.read(data);
  const wsname = workbook.Sheets["result"];
  const out = XLSX.utils.sheet_to_json(wsname);
  var total = out[0].Total;
  var merchant = out[0].Merchant;
  var lite_b = out[0].Lite_B;
  var agent = out[0].Agent;

  console.log(total);
  console.log(merchant);
  console.log(lite_b);
  console.log(agent);

  document.getElementById("total").textContent = total;
  document.getElementById("agent").textContent = agent;
  document.getElementById("merchant").textContent = merchant;
  document.getElementById("lite_b").textContent = lite_b;

  /* DO SOMETHING WITH workbook HERE */
}
dom_workbook.addEventListener("change", handleFileAsync, false);
