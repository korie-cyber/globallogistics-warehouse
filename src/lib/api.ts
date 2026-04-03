const WEBHOOK_URL = "https://n8n-10z3.onrender.com/webhook/warehouse";

export async function warehouseApi(body: Record<string, unknown>) {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
