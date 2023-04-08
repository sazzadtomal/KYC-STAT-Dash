let previous_month;
let SLA_Array = [];
let CDD_Array = [];
calculate_previous_month();
/*GENERAL CODE*/
function calculate_previous_month() {
  const current = new Date();
  if (current.getMonth != 0) {
    previous_month = current.getMonth() - 1;
  } else {
    previous_month = current.getMonth;
  }

  console.log(previous_month);
}

let workbook;
async function handleFileAsync(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  workbook = XLSX.read(data);
  const worksheet_sla = workbook.Sheets["SLA"];
  const worksheet_cdd = workbook.Sheets["CDD"];
  const out_sla = XLSX.utils.sheet_to_json(worksheet_sla);
  const out_cdd = XLSX.utils.sheet_to_json(worksheet_cdd);

  /*sla*/

  let wsla = out_sla[previous_month].WSLA;
  let bsla = out_sla[previous_month].BSLA;
  let sla = out_sla[previous_month].SLA;
  sla = sla.toFixed(2);
  SLA_Array.push(wsla);
  SLA_Array.push(bsla);

  console.log(SLA_Array);
  document.getElementById("sla_w").textContent = wsla;
  document.getElementById("sla_b").textContent = bsla;
  document.getElementById("sla").textContent = sla + " %";

  /*CDD*/
  let total = out_cdd[previous_month].TOTAL;
  let accept = out_cdd[previous_month].ACCEPT;
  let reject = out_cdd[previous_month].REJECT;
  let cdd = out_cdd[previous_month].CDD;
  cdd = cdd.toFixed(2);
  CDD_Array.push(accept);
  CDD_Array.push(reject);

  document.getElementById("cdd_total").textContent = total;
  document.getElementById("cdd_act").textContent = accept;
  document.getElementById("cdd_rej").textContent = reject;

  sla_chart();
  cdd_chart();

  /* DO SOMETHING WITH workbook HERE */
}
dom_workbook.addEventListener("change", handleFileAsync, false);

/*SLA CODE*/
function sla_chart() {
  let sla_mychart = document.getElementById("sla_myChart").getContext("2d");
  let service_assurance = new Chart(sla_mychart, {
    type: "doughnut",
    data: {
      labels: ["Within", "Beyond"],
      datasets: [
        {
          data: SLA_Array,
          backgroundColor: ["#E2136E", "#707070"],
        },
      ],
    },
  });
}

function cdd_chart() {
  let cdd_mychart = document.getElementById("cdd_myChart").getContext("2d");
  let due_deligence = new Chart(cdd_mychart, {
    type: "doughnut",
    data: {
      labels: ["Accepted", "Rejected"],
      datasets: [
        {
          data: CDD_Array,
          backgroundColor: ["#E2136E", "#707070"],
        },
      ],
    },
  });
}
