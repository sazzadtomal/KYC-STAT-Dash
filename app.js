/*GENERAL CODE*/
let uploaded = false;
let workbook;
var out_sla;
var out_cdd;
let sla_total = 0;
let cdd_total = 0;
let SLA_Array = [20, 80];
let CDD_Array = [160, 50];
let REJECTS_Array = [133, 60];
let registration = [10, 15, 20, 17, 89, 63, 65, 487, 21, 187, 45, 78];
let reject = [145, 115, 420, 117, 149, 92, 11, 10, 114, 841, 145, 780];
let accept = [156, 123, 147, 117, 890, 831, 650, 411, 111, 17, 74, 92];

var sla_graph;
var cdd_graph;
var rejects_graph;
var overall_graph;
var line_graph;

/*Getting the date*/

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let m = date.getMonth();
let year = date.getFullYear();
document.getElementById("month").textContent = months[m - 1];
document.getElementById("year").textContent = year;
document.getElementById("select_month").value = m - 1;
change_month();

/*file-initialization*/

async function handleFileAsync(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer Sazzad Tomal*/
  workbook = XLSX.readFile(data);
  const worksheet_sla = workbook.Sheets["SLA"];
  const worksheet_cdd = workbook.Sheets["CDD"];
  out_sla = XLSX.utils.sheet_to_json(worksheet_sla);
  out_cdd = XLSX.utils.sheet_to_json(worksheet_cdd);
  uploaded = true;
  document.getElementById("overview_btn").focus();
  read_sla_overview();
  read_cdd_overview();
  graph_initialization();
  update_values();
}
dom_workbook.addEventListener("change", handleFileAsync, false);

/*file-reading*/

/*Reading_SLA*/
function read_sla_chn() {
  SLA_Array[0] = out_sla[m].WSLA_CHN;
  SLA_Array[1] = out_sla[m].BSLA_CHN;
  sla_total = out_sla[m].TOTAL_CHN;
  console.log(SLA_Array);
}
function read_sla_ekyc() {
  SLA_Array[0] = out_sla[m].WSLA_KYC;
  SLA_Array[1] = out_sla[m].BSLA_KYC;
  sla_total = out_sla[m].TOTAL_KYC;
}
function read_sla_pra() {
  SLA_Array[0] = out_sla[m].WSLA_PRA;
  SLA_Array[1] = out_sla[m].BSLA_PRA;
  sla_total = out_sla[m].TOTAL_PRA;
}
function read_sla_merchantp() {
  SLA_Array[0] = out_sla[m].WSLA_MPLUS;
  SLA_Array[1] = out_sla[m].BSLA_MPLUS;
  sla_total = out_sla[m].TOTAL_MPLUS;
}
function read_sla_overview() {
  SLA_Array[0] = out_sla[m].WSLA;
  SLA_Array[1] = out_sla[m].BSLA;
  sla_total = out_sla[m].TOTAL;
}

/*Reading_CDD*/
function read_cdd_chn() {
  CDD_Array[0] = out_cdd[m].ACCEPT_CHN;
  CDD_Array[1] = out_cdd[m].REJECT_CHN;
  cdd_total = out_cdd[m].TOTAL_CHN;
}
function read_cdd_ekyc() {
  CDD_Array[0] = out_cdd[m].ACCEPT_KYC;
  CDD_Array[1] = out_cdd[m].REJECT_KYC;
  cdd_total = out_cdd[m].TOTAL_KYC;
}
function read_cdd_pra() {
  CDD_Array[0] = out_cdd[m].ACCEPT_PRA;
  CDD_Array[1] = out_cdd[m].REJECT_PRA;
  cdd_total = out_cdd[m].TOTAL_PRA;
}
function read_cdd_merchantp() {
  CDD_Array[0] = out_cdd[m].ACCEPT_MPLUS;
  CDD_Array[1] = out_cdd[m].REJECT_MPLUS;
  cdd_total = out_cdd[m].TOTAL_MPLUS;
}
function read_cdd_overview() {
  CDD_Array[0] = out_cdd[m].ACCEPT;
  CDD_Array[1] = out_cdd[m].REJECT;
  cdd_total = out_cdd[m].TOTAL_CHN;
}

/*Reading_Rejects*/
function read_rejects_chn() {
  REJECTS_Array[0] = out_cdd[m].ACCEPT_CHN;
  REJECTS_Array[1] = out_cdd[m].REJECT_CHN;
}
function read_rejects_ekyc() {
  REJECTS_Array[0] = out_cdd[m].ACCEPT_CHN;
  REJECTS_Array[1] = out_cdd[m].REJECT_CHN;
}
function read_rejects_pra() {
  REJECTS_Array[0] = out_cdd[m].ACCEPT_CHN;
  REJECTS_Array[1] = out_cdd[m].REJECT_CHN;
}
function read_rejects_merchantp() {
  REJECTS_Array[0] = out_cdd[m].ACCEPT_CHN;
  REJECTS_Array[1] = out_cdd[m].REJECT_CHN;
}
function read_rejects_overview() {
  REJECTS_Array[0] = out_cdd[m].ACCEPT_CHN;
  REJECTS_Array[1] = out_cdd[m].REJECT_CHN;
}

/*Changes_text Values*/
function update_values() {
  document.getElementById("sla_w").textContent = SLA_Array[0];
  document.getElementById("sla_b").textContent = SLA_Array[1];
  document.getElementById("sla").textContent = sla_total;
  document.getElementById("cdd").textContent = cdd_total;
  document.getElementById("cdd_act").textContent = CDD_Array[0];
  document.getElementById("cdd_rej").textContent = CDD_Array[1];
  document.getElementById("accept").textContent = REJECTS_Array[0];
  document.getElementById("reject").textContent = REJECTS_Array[1];
}

/*graph-calls*/
let sla_mychart = document.getElementById("sla_myChart").getContext("2d");
let cdd_mychart = document.getElementById("cdd_myChart").getContext("2d");
let rejects_mychart = document
  .getElementById("rejects_myChart")
  .getContext("2d");
let line_chart = document.getElementById("line_chart").getContext("2d");

/*initial_RENDER sazzadalamtomal00786@gmail.com*/
graph_initialization();

/*Rendering*/
function graph_initialization() {
  if (uploaded == false) return;
  sla_graph = new Chart(sla_mychart, {
    type: "doughnut",
    data: {
      labels: ["Accepted", "Rejected"],
      datasets: [
        {
          data: SLA_Array,
          backgroundColor: ["#E2136E", "#707070"],
        },
      ],
    },
  });

  cdd_graph = new Chart(cdd_mychart, {
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

  rejects_graph = new Chart(rejects_mychart, {
    type: "doughnut",
    data: {
      labels: ["Accepted", "Rejected"],
      datasets: [
        {
          data: REJECTS_Array,
          backgroundColor: ["#E2136E", "#707070"],
        },
      ],
    },
  });

  line_graph = new Chart(line_chart, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Registered",
          data: registration,

          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "Rejects",
          data: reject,
          borderColor: "#D6D6D6",
          tension: 0.1,
        },
        {
          label: "Accept",
          data: accept,
          borderColor: "#E2136E",
          tension: 0.1,
        },
      ],
    },
  });
}

/* Destroying Graph function*/

function destroy_graphs() {
  sla_graph.destroy();
  cdd_graph.destroy();
  rejects_graph.destroy();
  line_graph.destroy();
}

/*button_Click Actions*/

document
  .getElementById("channel_btn")
  .addEventListener("click", render_channel);
document.getElementById("pra_btn").addEventListener("click", render_pra);
document.getElementById("e_kyc_btn").addEventListener("click", render_ekyc);
document
  .getElementById("merchant_btn")
  .addEventListener("click", render_merchantp);
document
  .getElementById("overview_btn")
  .addEventListener("click", render_overview);

document
  .getElementById("select_month")
  .addEventListener("change", change_month);

/*button functions*/

function render_channel() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_chn();
  read_cdd_chn();
  read_rejects_chn();
  update_values();
  graph_initialization();
}

function render_ekyc() {
  if (uploaded == false) return;
  destroy_graphs();
  update_values();
  read_sla_ekyc();
  read_cdd_ekyc();
  read_rejects_ekyc();
  update_values();
  graph_initialization();
}
function render_pra() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_pra();
  read_cdd_pra();
  read_rejects_pra();
  update_values();
  graph_initialization();
}

function render_merchantp() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_merchantp();
  read_cdd_merchantp();
  read_rejects_merchantp();
  update_values();
  graph_initialization();
}

function render_overview() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_overview();
  read_cdd_overview();
  read_rejects_overview();
  update_values();
  graph_initialization();
}

function change_month() {
  m = document.getElementById("select_month").value;
  document.getElementById("month").textContent = months[m];
  document.getElementById("overview_btn").focus();
  if (uploaded == false) return;
  render_overview();
}
