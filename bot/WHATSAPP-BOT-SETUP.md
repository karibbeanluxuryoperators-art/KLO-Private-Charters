# KLO WhatsApp Bot — Setup Guide
## Free Tier · Step-by-Step

**Time required:** ~2–3 hours  
**Cost to launch:** $0  
**Monthly running cost at 500 conversations:** ~$5–10 (AI API only)

---

## What You're Building

```
Guest texts your WhatsApp number
          ↓
Meta WhatsApp Cloud API  (free: 1,000 conversations/month)
          ↓
n8n automation  (free if self-hosted)
          ↓
Claude API — "Marcus" concierge  (~$0.01 per conversation)
          ↓
Firebase Firestore  (free tier: 50K reads/20K writes per day)
          ↓
Reply sent back to guest
```

---

## Step 1 — Meta Business Setup (~45 min)

### 1a. Create a Meta Business Account
1. Go to **business.facebook.com** → Create Account
2. Business name: "KLO Private Charters"
3. Verify your email

### 1b. Create a Meta App
1. **developers.facebook.com** → My Apps → Create App
2. Type: **Business**
3. App name: "KLO Charter Advisor"
4. Connect to your Business Account

### 1c. Add WhatsApp to Your App
1. App dashboard → Add Product → WhatsApp → Set Up
2. Under API Setup: you get a free test phone number immediately
3. To add a real number later: WhatsApp Manager → Phone Numbers → Add Phone Number
   - Must be a number with NO existing WhatsApp account
   - Options: new SIM, Google Voice, or a Twilio number (~$1/mo)

### 1d. Note Your Credentials
```
Phone Number ID:          (API Setup tab)
WhatsApp Business ID:     (API Setup tab)
Permanent Access Token:   Business Settings → System Users → Generate Token
```

---

## Step 2 — Install n8n (~30 min)

### Option A: Railway.app (free tier, easiest)
1. **railway.app** → New Project → Deploy from Docker Image
2. Image: `n8nio/n8n`
3. Add environment variables:
   ```
   N8N_BASIC_AUTH_ACTIVE=true
   N8N_BASIC_AUTH_USER=admin
   N8N_BASIC_AUTH_PASSWORD=choose_a_strong_password
   WEBHOOK_URL=https://your-app.up.railway.app
   ```
4. Your webhook URL: `https://your-app.up.railway.app/webhook/klo-whatsapp`

### Option B: n8n Cloud (14-day free trial, then $20/mo)
Sign up at **n8n.io** — webhook URL is provided automatically.

### Option C: Your own server
```bash
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```

---

## Step 3 — Import & Configure the Workflow (~20 min)

1. n8n → Workflows → Import from File → upload `N8N-WORKFLOW.json`

2. Configure credentials (Settings → Credentials → New):
   - **Anthropic key:** from console.anthropic.com → API Keys
   - **Meta token:** your permanent access token from Step 1d
   - **Redis:** from upstash.com (free tier — used for conversation memory)
   - **Firebase token:** from Firebase Console → Project Settings → Service Accounts

3. Paste the Marcus system prompt:
   - Open the **"Ask Claude (Marcus)"** node
   - In the JSON body, replace the placeholder text with the full contents of `CONCIERGE-SYSTEM-PROMPT.md`

4. Activate the workflow (toggle top-right corner)

---

## Step 4 — Connect Meta Webhook (~15 min)

1. Meta App → WhatsApp → Configuration → Webhook → Edit
2. **Callback URL:** your n8n webhook URL
3. **Verify Token:** any string you choose (e.g., `klo_verify_2026`)
4. Subscribe to: **messages**
5. Verify and Save

**Test immediately:**
- Meta → API Setup → send a test message to your test number
- Check n8n Executions — the workflow should fire and reply

---

## Step 5 — Redis for Memory (~20 min)

Without Redis, Marcus loses the conversation thread between messages.

1. Sign up at **upstash.com** → Create Redis Database (free tier: 10,000 commands/day)
2. Copy the connection URL
3. n8n → Credentials → Redis → paste connection string

---

## Step 6 — Firebase Logging (~20 min)

1. Firebase Console → Project Settings → Service Accounts → Generate New Private Key
2. In the n8n "Log to Firebase" node, replace `YOUR_PROJECT_ID` with your project ID
3. Add a new n8n credential using your service account JSON

Leads will appear in Firestore under `whatsapp_leads/` collection.

---

## Step 7 — Go Live with a Real Number

When ready to move from the test number:
1. WhatsApp Manager → Phone Numbers → Add Phone Number
2. Use a number with no existing WhatsApp account
3. Verify → submit for Business API approval (1–3 business days)
4. Update the phone number ID in your Meta App settings

---

## Monthly Cost Reference

| Volume | WhatsApp API | Claude Haiku | Upstash | Total |
|--------|-------------|-------------|---------|-------|
| 100 conversations | Free | ~$0.50 | Free | ~$0.50 |
| 500 conversations | Free | ~$2.50 | Free | ~$2.50 |
| 1,000 conversations | Free | ~$5 | Free | ~$5 |
| 5,000 conversations | ~$150 | ~$25 | $10 | ~$185 |

---

## Upgrade Milestones

**Once you hit 50 conversations/month:**
- Add human handoff: when Marcus detects booking intent, notify your personal WhatsApp

**Once you hit 200 conversations/month:**
- Upgrade Claude Haiku → Claude Sonnet for higher quality responses
- Add email/name extraction → auto-create contacts in Apollo/HubSpot

**Once you hit 500 conversations/month:**
- Add a 48-hour follow-up workflow for warm leads who went quiet
- Connect Marcus to your booking calendar to check availability in real-time

---

## Common Issues

| Problem | Fix |
|---------|-----|
| Webhook not verifying | Check the Verify Token matches exactly in Meta + n8n |
| Marcus not replying | Check workflow is Active, check Claude API key is valid |
| Double messages | Store msgId in Redis; skip processing if already seen |
| Memory not working | Confirm Upstash Redis is connected and the key format matches |
| Test number only works for approved numbers | Add your personal WhatsApp number in Meta API Setup → "To" section |

---

*KLO Bot Setup Guide · v1.0 · 2026*
