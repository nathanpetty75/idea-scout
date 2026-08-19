const IDEAS = [{"id":"honest-mrr","title":"Honest MRR (past-due stripped)","niche":"B2B / indie SaaS","signal":"@marclou: Stripe counts past-due as MRR; TrustMRR excludes it.","why_10k":"200 founders × $49 or 100 agencies × $99.","spend":"none","ship_days":5,"score":8,"status":"watch","next":"Paste-a-CSV landing page."},{"id":"photo-calorie","title":"Photo → calorie / macros app","niche":"Consumer iOS","signal":"Cal AI $30k month 1 → $50M/yr. Copycats can hit $10k–$100k then ceiling.","why_10k":"Proven. Needs paid social.","spend":"ads","ship_days":14,"score":5,"status":"blocked-spend","next":"Skip until ads are allowed or organic is real."},{"id":"lazy-simple-app","title":"One-job simple app (Will-style)","niche":"Consumer mobile","signal":"Two lazy apps > $10k/mo. Native TikTok, scale winners 20%/3 days.","why_10k":"Works with ads.","spend":"ads","ship_days":10,"score":5,"status":"blocked-spend","next":"Park."},{"id":"boring-utils","title":"Boring SEO utility cluster","niche":"Google long-tail","signal":"Calculators, PDF, JSON, compressors. Claim $8–12k by month 6.","why_10k":"SEO slow. Vercel static is $0.","spend":"none","ship_days":2,"score":7,"status":"queue","next":"10-tool microsite after Scout has a week of data."},{"id":"ai-repurpose","title":"One post → ten assets","niche":"Creators","signal":"Every 2026 list. Finn already here (Creator Buddy).","why_10k":"Need a thin ICP. 334 × $29.","spend":"none","ship_days":7,"score":6,"status":"watch","next":"Only a slice the big tools ignore."},{"id":"chrome-nitpick","title":"Tiny Chrome nitpicker","niche":"Writers / founders","signal":"ByeByeAI $4k MRR in 3 weeks (Marc Lou).","why_10k":"One painful check. 400 × $25.","spend":"none","ship_days":4,"score":7,"status":"queue","next":"Find the screaming search query."},{"id":"vertical-crm-tiny","title":"Tiny CRM for one trade","niche":"B2B vertical","signal":"Kitchen appliance CRM $6.7k MRR at $75 × 89.","why_10k":"134 × $75. Must reach the trade without ads.","spend":"none","ship_days":10,"score":7,"status":"watch","next":"Hunt the community first."},{"id":"directory","title":"Niche directory + listings","niche":"SEO / lead-gen","signal":"levelsio directories print quietly.","why_10k":"100 × $99 featured, or SEO + affiliate.","spend":"none","ship_days":3,"score":6,"status":"queue","next":"Need a desperate keyword."},{"id":"agent-ceo-pack","title":"Opinionated Grok agent pack","niche":"Grok Bot operators","signal":"Finn 11-tip Grok Bot post, huge bookmarks.","why_10k":"200 × $49. Package this lab loop, do not clone Finn.","spend":"none","ship_days":3,"score":6,"status":"watch","next":"The experiment loop as a pack."},{"id":"idea-scout","title":"Idea Scout (this product)","niche":"Indie operators","signal":"Starter Story sells databases. This is a live keep/kill lab.","why_10k":"345 × $29 digest, or 101 × $99.","spend":"none","ship_days":1,"score":9,"status":"active","next":"Kill in 14 days if nobody returns."},{"id":"shopify-profit","title":"Shopify profit / ads truth","niche":"ecom","signal":"Profit AI ~$30k app + ~$40k services.","why_10k":"Crowded, heavy.","spend":"none","ship_days":21,"score":4,"status":"killed","next":"Too heavy for this iMac."},{"id":"dunning","title":"Failed-payment recovery","niche":"SaaS billing","signal":"~9% MRR lost to involuntary churn.","why_10k":"Trust and support heavy.","spend":"none","ship_days":21,"score":3,"status":"killed","next":"Not experiment #1."}];
const EXP = { active: { name: "Idea Scout public board", hypothesis: "Free keep/kill lab → waitlist → $29/mo digest. 345 subs = $10k.", started: "2026-08-19", ends: "2026-09-02", metric: "waitlist clicks + 7-day return visits", kill_if: "No waitlist and no returns after 14 days" }, queue: ["boring-utils", "chrome-nitpick", "honest-mrr"], killed: [{ id: "shopify-profit", reason: "Too heavy / crowded." }, { id: "dunning", reason: "Trust/support load." }] };
document.getElementById("updated").textContent = "Board snapshot 2026-08-19 · sources: X @starter_story @AlexFinn @marclou @levelsio + public web";
let filter = "all";
function tagSpend(s) { return s === "ads" ? "tag ads" : "tag"; }
function render(list) {
  document.getElementById("list").innerHTML = list.map(i => "<article class=\"card\"><span class=\"score\">" + i.score + "/10</span><h3>" + i.title + "</h3><div class=\"meta\">" + i.niche + " · ship ~" + i.ship_days + "d</div><div><span class=\"" + tagSpend(i.spend) + "\">" + (i.spend === "ads" ? "needs ads" : "no spend") + "</span><span class=\"tag " + (i.status === "active" ? "live" : i.status === "killed" ? "kill" : "") + "\">" + i.status + "</span></div><p><b>Signal.</b> " + i.signal + "</p><p><b>$10k math.</b> " + i.why_10k + "</p><p><b>Next.</b> " + i.next + "</p></article>").join("");
}
function apply() {
  render(IDEAS.filter(i => {
    if (filter === "all") return true;
    if (filter === "none") return i.spend === "none" && i.status !== "killed";
    if (filter === "ads") return i.spend === "ads";
    if (filter === "active") return i.status === "active";
    if (filter === "queue") return i.status === "queue";
    return true;
  }).sort((a,b) => b.score - a.score));
}
apply();
document.querySelectorAll("[data-filter]").forEach(b => b.onclick = () => { filter = b.dataset.filter; apply(); });
document.getElementById("active-box").innerHTML = "<span class=\"tag live\">live</span><h3>" + EXP.active.name + "</h3><p>" + EXP.active.hypothesis + "</p><p class=\"meta\">" + EXP.active.started + " → " + EXP.active.ends + " · metric: " + EXP.active.metric + "</p><p><b>Kill if:</b> " + EXP.active.kill_if + "</p>";
document.getElementById("queue").innerHTML = EXP.queue.map(id => "<li>" + id + "</li>").join("");
document.getElementById("killed").innerHTML = EXP.killed.map(k => "<li><b>" + k.id + "</b> — " + k.reason + "</li>").join("");
document.querySelectorAll("nav button").forEach(b => b.onclick = () => {
  document.querySelectorAll("nav button").forEach(x => x.classList.remove("on"));
  b.classList.add("on");
  ["board","lab","forge","math"].forEach(id => { document.getElementById(id).hidden = id !== b.dataset.tab; });
});
function card() {
  const niche = document.getElementById("niche").value.trim() || "unnamed idea";
  const who = document.getElementById("who").value.trim() || "a narrow payer";
  const price = Math.max(1, parseInt(document.getElementById("price").value || "29", 10));
  const n = Math.ceil(10000 / price);
  document.getElementById("card").value = ["7-DAY EXPERIMENT","Idea: " + niche,"Payer: " + who,"Price test: $" + price + "/mo  →  need ~" + n + " paying to hit $10k","","Day 1 — Ship a one-page MVP. One job. Public URL.","Day 2 — Tell 20 humans who already have the pain. No ads.","Day 3 — Watch replies, confusion, who tries to pay.","Day 4 — Cut every feature nobody used.","Day 5 — Post the build in public (X).","Day 6 — Ask 5 users what they would pay. Log exact words.","Day 7 — KEEP if someone would pay or came back. KILL if silence.","","Kill rule: no conversations after 7 days.","This lab: no spend, one experiment at a time."].join("\n");
}
document.getElementById("build").onclick = card;
document.getElementById("copy").onclick = () => {
  navigator.clipboard.writeText(document.getElementById("card").value);
  document.getElementById("copy").textContent = "Copied";
  setTimeout(() => document.getElementById("copy").textContent = "Copy", 1000);
};
