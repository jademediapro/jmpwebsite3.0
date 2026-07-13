const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

function getSheetsEnv() {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const connectionKey = process.env.GOOGLE_SHEETS_API_KEY;
  const sheetId = process.env.SUBMISSIONS_SHEET_ID;
  if (!lovableKey || !connectionKey || !sheetId) {
    throw new Error("Submissions sheet is not configured");
  }
  return { lovableKey, connectionKey, sheetId };
}

export async function appendSubmissionRow(range: string, values: (string | number)[]) {
  const { lovableKey, connectionKey, sheetId } = getSheetsEnv();
  const url = `${GATEWAY_URL}/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
    },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Sheets append failed [${res.status}]: ${body}`);
    throw new Error(`Sheets append failed [${res.status}]`);
  }
  return res.json();
}

export async function readSubmissionColumn(range: string): Promise<string[]> {
  const { lovableKey, connectionKey, sheetId } = getSheetsEnv();
  const url = `${GATEWAY_URL}/spreadsheets/${sheetId}/values/${range}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": connectionKey,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Sheets read failed [${res.status}]: ${body}`);
    throw new Error(`Sheets read failed [${res.status}]`);
  }
  const data = (await res.json()) as { values?: string[][] };
  return (data.values ?? []).map((row) => (row[0] ?? "").toString().trim().toLowerCase()).filter(Boolean);
}

export async function sendNotificationEmail(subject: string, html: string) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL ?? "jademediapro@gmail.com";
  if (!lovableKey || !resendKey) {
    console.warn("Resend not configured; skipping notification email");
    return;
  }
  const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: "JadeMediaPro <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Notification email failed [${res.status}]: ${body}`);
  }
}
