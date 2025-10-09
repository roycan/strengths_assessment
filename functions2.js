// functions2.js

// --- Exports & Copy ---
function download(filename, content, mimeType){
  const blob = new Blob([content], {type:mimeType});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; 
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

elBtnDownloadJSON.addEventListener("click",()=>{
  const data = {
    metadata: {
      version: STATE.version,
      startedAt: STATE.startedAt,
      completedAt: STATE.completedAt,
      totalQuestions: QUESTIONS.length,
      timeouts: STATE.timeouts,
      timeLimitSeconds: 20,
      scoringModel: "5-point ipsative scale"
    },
    scores: STATE.scores,
    ranking: Object.entries(STATE.scores).sort((a,b)=> b[1]-a[1]),
    responses: STATE.responses
  };
  download("scholars_compass_results.json", JSON.stringify(data,null,2), "application/json");
  showToast("✔️ JSON file downloaded","success");
});

elBtnDownloadCSV.addEventListener("click",()=>{
  const header = ["id","selection","aStrength","bStrength","aPoints","bPoints","timeTakenMs","timeout","at"].join(",");
  const rows = STATE.responses.map(r=>[
    r.id,
    r.selection===null?"":r.selection,
    `"${r.aStrength}"`,
    `"${r.bStrength}"`,
    r.aPoints.toFixed(2),
    r.bPoints.toFixed(2),
    r.timeTakenMs,
    r.timeout,
    `"${r.at}"`
  ].join(","));
  const csv = [header, ...rows].join("\n");
  download("scholars_compass_responses.csv", csv, "text/csv");
  showToast("✔️ CSV file downloaded","success");
});

if (typeof elBtnCopyTop5 !== 'undefined' && elBtnCopyTop5) {
  elBtnCopyTop5.addEventListener("click",()=>{
    const ranking = Object.entries(STATE.scores).sort((a,b)=> b[1]-a[1]);
    const top5 = ranking.slice(0,5).map(([s])=>s).join(", ");
    navigator.clipboard.writeText(top5).then(()=>{
      showToast("✔️ Top 5 strengths copied","success");
    }).catch(()=>{
      showToast("⚠️ Copy failed","danger");
    });
  });
}

elBtnRestart.addEventListener("click",()=>{
  clearState();
  STATE = initialState();
  saveState();
  showAssessment();
  renderQuestion();
  startTimer();
  showToast("ℹ️ Assessment restarted","info");
});

// --- Toast system ---
function showToast(message, type="info") {
  const toast = document.getElementById("toast");

  // Choose icon + color
  let bg;
  switch(type){
    case "success": bg = "#23d160"; break; // green
    case "danger":  bg = "#f14668"; break; // red
    case "info":    bg = "#3273dc"; break; // blue
    case "primary": bg = "#485fc7"; break; // neutral
    default:        bg = "#3273dc";
  }

  toast.style.backgroundColor = bg;
  toast.innerHTML = `<span>${message}</span>`;

  toast.className = "show";
  setTimeout(()=>{ toast.className = toast.className.replace("show",""); }, 3000);
}
