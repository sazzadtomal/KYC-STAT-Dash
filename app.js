/*GENERAL CODE*/
let uploaded = false;
let workbook;
var out_sla;
var out_cdd;
let SLA_Array = [20, 80];
let CDD_Array = [160, 50];
let REJECTS_Array = [133, 60];

var sla_graph;
var cdd_graph;
var rejects_graph;
var overall_graph;

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
let month = months[date.getMonth()];
let day = date.getDate();
let year = date.getFullYear();
document.getElementById("day").textContent = day;
document.getElementById("month").textContent = month;
document.getElementById("year").textContent = year;
let dash_month = date.getMonth();
document.getElementById("select_month").value = date.getMonth() - 1;
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
  graph_initialization();
}
dom_workbook.addEventListener("change", handleFileAsync, false);

/*file-reading*/

/*Reading_SLA*/
function read_sla_chn() {
  SLA_Array[0] = out_sla[0].WSLA_CHN;
  SLA_Array[1] = out_sla[0].BSLA_CHN;
}
function read_sla_ekyc() {
  SLA_Array[0] = out_sla[0].WSLA_CHN;
  SLA_Array[1] = out_sla[0].BSLA_CHN;
}
function read_sla_pra() {
  SLA_Array[0] = out_sla[0].WSLA_CHN;
  SLA_Array[1] = out_sla[0].BSLA_CHN;
}
function read_sla_merchantp() {
  SLA_Array[0] = out_sla[0].WSLA_CHN;
  SLA_Array[1] = out_sla[0].BSLA_CHN;
}

/*Reading_CDD*/
function read_cdd_chn() {
  CDD_Array[0] = out_cdd[0].ACCEPT_CHN;
  CDD_Array[1] = out_cdd[0].REJECT_CHN;
}
function read_cdd_ekyc() {
  CDD_Array[0] = out_cdd[0].ACCEPT_CHN;
  CDD_Array[1] = out_cdd[0].REJECT_CHN;
}
function read_cdd_pra() {
  CDD_Array[0] = out_cdd[0].ACCEPT_CHN;
  CDD_Array[1] = out_cdd[0].REJECT_CHN;
}
function read_cdd_merchantp() {
  CDD_Array[0] = out_cdd[0].ACCEPT_CHN;
  CDD_Array[1] = out_cdd[0].REJECT_CHN;
}

/*graph-calls*/
let sla_mychart = document.getElementById("sla_myChart").getContext("2d");
let cdd_mychart = document.getElementById("cdd_myChart").getContext("2d");
let rejects_mychart = document
  .getElementById("rejects_myChart")
  .getContext("2d");
let overall_mychart = document
  .getElementById("overall_myChart")
  .getContext("2d");

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
          data: CDD_Array,
          backgroundColor: ["#E2136E", "#707070"],
        },
      ],
    },
  });

  overall_graph = new Chart(overall_mychart, {
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

/* Destroying Graph function*/

function destroy_graphs() {
  sla_graph.destroy();
  cdd_graph.destroy();
  rejects_graph.destroy();
  overall_graph.destroy();
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

/*button functions*/

function render_channel() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_chn();
  read_cdd_chn();
  graph_initialization();
}

function render_ekyc() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_ekyc();
  read_cdd_ekyc();
  graph_initialization();
}
function render_pra() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_pra();
  read_cdd_pra();
  graph_initialization();
}

function render_merchantp() {
  if (uploaded == false) return;
  destroy_graphs();
  read_sla_merchantp();
  read_cdd_merchantp();
  graph_initialization();
}
