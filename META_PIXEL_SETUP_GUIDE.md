# Meta Pixel Setup & Troubleshooting Guide

## 🎯 Your Current Setup

**Pixel ID:** `1410436840176086`
**Status:** ✅ Base code installed in `public/index.html`

---

## 📋 Step-by-Step: Meta Events Manager Setup

### Step 1: Access Meta Events Manager

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Log in with your Facebook Business account
3. Select your Pixel (ID: 1410436840176086)

### Step 2: Verify Your Pixel is Active

1. In Events Manager, look for your Pixel
2. Check the status - it should show **"Active"** with a green dot
3. If it shows "Inactive", click on it and select **"Turn On"**

### Step 3: Add Your Website Domain

**IMPORTANT:** You must add your website domain to the Pixel for it to work!

1. In Events Manager, click your Pixel name
2. Go to **Settings** tab
3. Scroll to **"Domains"** section
4. Click **"Add Domain"**
5. Enter your domain: `orangutanorganics.com`
6. Click **"Add"**
7. Verify ownership using one of these methods:
   - **Meta Pixel** (Easiest - already done since your pixel is installed)
   - **DNS Verification**
   - **Meta Tag**

### Step 4: Configure Event Setup Tool (Optional but Recommended)

1. In Events Manager, click **"Settings"** → **"Event Setup Tool"**
2. Enter your website URL: `https://orangutanorganics.com`
3. Click **"Open Website"**
4. This tool helps you verify events are firing correctly

---

## 🧪 Testing Your Pixel

### Method 1: Using Meta Pixel Helper Extension (RECOMMENDED)

1. Install [Meta Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visit your website
3. Click the extension icon (should turn blue if pixel is detected)
4. It will show all events being fired

### Method 2: Test Events Tab in Meta Events Manager

1. Go to Events Manager → Your Pixel
2. Click **"Test Events"** tab
3. Enter your website URL
4. Click **"Open Website"**
5. Perform actions (view product, add to cart, etc.)
6. Events should appear in real-time in the Test Events tab

---

## 🔍 Checking if Events Are Received

### In Meta Events Manager:

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel
3. Click on **"Overview"** tab
4. You should see a graph showing events received

### What to Look For:

- **PageView** - Should fire on every page load
- **ViewContent** - When you click on a product
- **AddToCart** - When you add product to cart
- **InitiateCheckout** - When you go to checkout page
- **Purchase** - When order is completed
- **Lead** - When contact form is submitted

### Timeline:

- **Test Events tab:** Events appear within 1-20 seconds
- **Overview tab:** Events appear within 5-30 minutes
- **Full reports:** Events appear within 24-48 hours

---

## ❌ Common Issues & Fixes

### Issue 1: "Events not showing in Meta Dashboard"

**Possible Causes:**
1. ✅ Pixel ID is correct? Check `public/index.html` line 57
2. ✅ Domain is added? Check Step 3 above
3. ✅ Pixel is Active? Check Step 2 above
4. ✅ Ad blockers disabled? Disable all ad blockers
5. ✅ Correct Facebook Business Account? Make sure you're logged into the right account

**Fix:**
1. Verify domain is added (Step 3)
2. Wait 24 hours after adding domain
3. Test in Incognito mode (to bypass ad blockers)
4. Check Test Events tab (not Overview) for immediate feedback

### Issue 2: "Meta Pixel (fbq) not loaded"

**Possible Causes:**
- Script blocked by ad blocker
- Network error
- Browser privacy settings

**Fix:**
1. Disable all ad blockers and extensions
2. Try in Incognito/Private mode
3. Try a different browser
4. Check browser console for errors (F12 → Console)

### Issue 3: "Events not appearing in Meta"

**Possible Causes:**
- Wrong Pixel ID
- Domain not verified
- Waiting for data to populate

**Fix:**
1. Double-check Pixel ID: `1410436840176086`
2. Add/verify domain in Events Manager (Step 3)
3. Wait 5-30 minutes, then check again
4. Use Meta Pixel Helper extension to verify events are firing

### Issue 4: "Some events work, others don't"

**Possible Causes:**
- JavaScript error preventing event from firing
- Event triggered before page/pixel fully loads

**Fix:**
1. Use Meta Pixel Helper extension to see which events fire
2. Check Network tab (F12 → Network → filter "facebook")
3. Verify each event triggers correctly using Test Events tab
4. Report which specific events are failing

---

## 🎛️ Meta Business Manager Settings You Need

### 1. Ad Account Setup

1. Go to [Meta Business Settings](https://business.facebook.com/settings)
2. Click **"Data Sources"** → **"Pixels"**
3. Find your Pixel (1410436840176086)
4. Make sure it's assigned to your Ad Account

### 2. Aggregated Event Measurement (iOS 14.5+)

**Important for iOS users:**

1. In Events Manager, select your Pixel
2. Go to **"Aggregated Event Measurement"**
3. Click **"Configure Web Events"**
4. Add your domain: `orangutanorganics.com`
5. Verify domain
6. Select up to 8 priority events (in order):
   1. Purchase
   2. InitiateCheckout
   3. AddToCart
   4. ViewContent
   5. Lead
   6. PageView
   7. (Add more if needed)
7. Click **"Submit"**

### 3. Event Configuration (Optional)

For each standard event, you can configure:
- **Custom Conversions:** Create custom conversions based on URL rules
- **Event Match Quality:** See how well your data matches with Facebook users
- **Parameter Setup:** Configure which parameters to send with events

---

## 📊 Events Currently Tracked on Your Website

| Event | When It Fires | What Data Is Sent |
|-------|---------------|-------------------|
| **PageView** | Every page load | Page URL |
| **ViewContent** | Product detail page view | Product ID, name, category, price |
| **AddToCart** | Click "Add to Cart" | Product ID, name, quantity, value |
| **InitiateCheckout** | Visit checkout page | Cart items, total value, item count |
| **Purchase** | Complete order | Order ID, products, total amount |
| **Lead** | Submit contact form | Form type |

---

## 🔧 Advanced Troubleshooting

### Check Network Requests

1. Open Developer Tools (F12)
2. Go to **"Network"** tab
3. Filter by `facebook` or `fbevents`
4. Look for requests to `facebook.com/tr`
5. Click on a request → **"Payload"** tab
6. You should see event data being sent

### Check Pixel Code in HTML

1. View page source (Right-click → View Page Source)
2. Press Ctrl+F (or Cmd+F) and search for: `fbq('init'`
3. Verify you see: `fbq('init', '1410436840176086');`
4. Make sure this appears BEFORE `</head>` tag

### Use Facebook's Pixel Diagnostics

1. Go to Events Manager
2. Click your Pixel
3. Click **"Diagnostics"** tab
4. This shows any errors or warnings about your Pixel

---

## 📞 Still Having Issues?

If events are still not showing after trying all the above:

1. **Check your browser console for errors:**
   - Open website → Press F12 → Console tab
   - Look for any red error messages
   - Copy the exact error message

2. **Verify the exact issue:**
   - Can you see `✅ Meta Pixel Event:` messages in console?
   - Does `window.testMetaPixel()` work?
   - Which specific events are not working?

3. **Check Facebook Business Manager:**
   - Verify you're logged into the correct account
   - Verify Pixel ID 1410436840176086 belongs to your account
   - Verify domain is added and verified

4. **Try these debugging steps:**
   ```javascript
   // Type these in browser console:

   // 1. Check if fbq exists
   console.log('fbq exists:', typeof window.fbq);

   // 2. Manually fire a test event
   window.fbq('trackCustom', 'DebugTest', {timestamp: Date.now()});

   // 3. Check pixel version
   console.log('Pixel version:', window.fbq.version);
   ```

---

## ✅ Checklist: Is Everything Set Up?

- [ ] Meta Pixel base code is in `public/index.html` ✅ (Already done)
- [ ] Pixel ID is correct: 1410436840176086
- [ ] Domain `orangutanorganics.com` is added in Events Manager
- [ ] Domain is verified
- [ ] Pixel status is "Active"
- [ ] Aggregated Event Measurement is configured
- [ ] Ad blockers are disabled when testing
- [ ] `window.testMetaPixel()` works in console
- [ ] Events show up in Test Events tab
- [ ] Meta Pixel Helper extension detects pixel

Once all items are checked, your Meta Pixel should be working correctly!

---

## 📚 Useful Links

- [Meta Events Manager](https://business.facebook.com/events_manager2)
- [Meta Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Meta Business Help Center](https://www.facebook.com/business/help/742478679120153)
- [Domain Verification Guide](https://www.facebook.com/business/help/286768115176155)
