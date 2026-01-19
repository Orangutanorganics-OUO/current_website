/**
 * Orangutan Organics – Unified Google Apps Script
 * Handles both Contact Form submissions and Product Reviews.
 */
const ADMIN_EMAIL = 'orangutanorganics@gmail.com'; // UPDATE THIS
const CONTACT_SHEET = 'Contact Submissions';
const REVIEW_SHEET = 'Reviews';
const CHECKOUT_SHEET = 'Orders';

// ===== ENTRY POINT =====
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.type === 'contact') {
      return handleContactSubmission(data);
    } else if (data.type === 'review') {
      return handleReviewSubmission(data);
    } else if (data.type === 'checkout') {
      return handleCheckoutSubmission(data);
    } else {
      throw new Error('Invalid submission type. Must be "contact", "review", or "checkout".');
    }

  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// =====================================================
// ================ CONTACT FORM HANDLER ================
// =====================================================
function handleContactSubmission(data) {
  const sheet = getOrCreateSheet(CONTACT_SHEET);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.subject || '',
    data.message || ''
  ]);

  sendContactEmail(data);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success', message: 'Contact form submitted successfully.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendContactEmail(data) {
  const subject = `📩 New Contact Form: ${data.subject || '(No Subject)'}`;
  const body = `
You have received a new contact form submission.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}

---
Submitted at: ${data.timestamp || new Date().toISOString()}
  `;

  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
  }
}

// =====================================================
// ================ PRODUCT REVIEW HANDLER ==============
// =====================================================
function handleReviewSubmission(data) {
  const sheet = getOrCreateSheet(REVIEW_SHEET);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Product', 'Name', 'Email', 'Location', 'Rating', 'Review', 'Source', 'Display']);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
  }

  const row = [
    new Date().toLocaleDateString('en-IN'),
    data.product || '',
    data.name || '',
    data.email || '',
    data.location || '',
    data.rating || 5,
    data.review || '',
    data.source || 'Website',
    'No'
  ];
  sheet.appendRow(row);

  sendReviewAdminNotification(data);
  sendReviewCustomerConfirmation(data);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success', message: 'Review submitted successfully.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendReviewAdminNotification(data) {
  const subject = `⭐ New ${data.rating}-Star Review - ${data.product}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2>New Product Review Submitted</h2>
      <p><strong>Product:</strong> ${data.product}</p>
      <p><strong>Rating:</strong> ${'⭐'.repeat(parseInt(data.rating))} (${data.rating}/5)</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Location:</strong> ${data.location || 'Not provided'}</p>
      <p><strong>Review:</strong> ${data.review}</p>
      <hr>
      <p><strong>Note:</strong> Review is currently hidden (Display = "No"). Change it to "Yes" in your sheet to publish.</p>
    </div>
  `;

  MailApp.sendEmail({ to: ADMIN_EMAIL, subject, htmlBody });
}

function sendReviewCustomerConfirmation(data) {
  const subject = `Thank you for your review, ${data.name.split(' ')[0]}!`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Thank You for Reviewing ${data.product}</h2>
      <p>Hi ${data.name},</p>
      <p>We appreciate your feedback and support for Himalayan farmers!</p>
      <p><strong>Your Rating:</strong> ${'⭐'.repeat(parseInt(data.rating))} (${data.rating}/5)</p>
      <blockquote>${data.review}</blockquote>
      <p>Your review will be published on our website after verification (within 24–48 hours).</p>
      <p>With gratitude,<br><strong>The Orangutan Organics Team</strong></p>
    </div>
  `;

  try {
    MailApp.sendEmail({ to: data.email, subject, htmlBody });
  } catch (error) {
    console.error('Error sending review confirmation:', error);
  }
}

// =====================================================
// ================ CHECKOUT ORDER HANDLER ==============
// =====================================================
function handleCheckoutSubmission(data) {
  const sheet = getOrCreateSheet(CHECKOUT_SHEET);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Order ID', 'Name', 'Email', 'Phone', 'Address',
      'Pincode', 'City', 'State', 'Products', 'Payment Mode', 'Payment Status',
      'Payment ID', 'Subtotal', 'Shipping', 'Discounts', 'COD Charge', 'Total', 'Delhivery Response'
    ]);
    sheet.getRange(1, 1, 1, 19).setFontWeight('bold');
  }

  // Format products for display
  let productsText = '';
  if (data.products && Array.isArray(data.products)) {
    productsText = data.products.map(p => `${p.name} (${p.size}) x ${p.quantity} - ₹${p.price}`).join('\n');
  }

  const row = [
    data.timestamp || new Date().toISOString(),
    data.orderId || '',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.address || '',
    data.pincode || '',
    data.city || '',
    data.state || '',
    productsText,
    data.paymentMode || '',
    data.paymentStatus || '',
    data.paymentId || '',
    data.subtotal || 0,
    data.shippingCharge || 0,
    data.discountAmount || 0,
    data.codCharge || 0,
    data.total || 0,
    data.delhiveryResponse || ''
  ];
  sheet.appendRow(row);

  sendOrderAdminNotification(data);
  sendOrderCustomerConfirmation(data);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success', message: 'Order submitted successfully.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendOrderAdminNotification(data) {
  const isCOD = data.paymentMode === 'COD';
  const hasDiscount = data.discountAmount && data.discountAmount > 0;
  const subject = `🛒 New ${data.paymentMode} Order - ${data.orderId}`;

  let productsHTML = '<ul>';
  if (data.products && Array.isArray(data.products)) {
    data.products.forEach(p => {
      productsHTML += `<li>${p.name} (${p.size}) × ${p.quantity} - ₹${p.price * p.quantity}</li>`;
    });
  }
  productsHTML += '</ul>';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <div style="background: linear-gradient(135deg, #0F5B2F, #F46A1F); padding: 20px; color: white;">
        <h1 style="margin: 0;">🎉 New Order Received!</h1>
      </div>

      <div style="padding: 20px; background: #F5F2EB;">
        <h2 style="color: #0F5B2F;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Order ID:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">${data.orderId}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Payment Mode:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">${data.paymentMode}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Payment Status:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">${data.paymentStatus}</td>
          </tr>
          ${data.paymentId ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Payment ID:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">${data.paymentId}</td>
          </tr>
          ` : ''}
        </table>

        <h3 style="color: #0F5B2F; margin-top: 20px;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Address:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">
              ${data.address}<br>
              ${data.city}, ${data.state} - ${data.pincode}
            </td>
          </tr>
        </table>

        <h3 style="color: #0F5B2F; margin-top: 20px;">Products Ordered</h3>
        ${productsHTML}

        <h3 style="color: #0F5B2F; margin-top: 20px;">Pricing Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Subtotal:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">₹${data.subtotal}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Shipping:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">₹${data.shippingCharge}</td>
          </tr>
          ${hasDiscount ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">Discount:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white; color: #059669;">-₹${data.discountAmount}</td>
          </tr>
          ` : ''}
          ${isCOD ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white;">COD Charge:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white;">₹${data.codCharge}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: white; font-size: 18px;">Total:</td>
            <td style="padding: 8px; border: 1px solid #ddd; background: white; font-weight: bold; color: #F46A1F; font-size: 18px;">₹${data.total}</td>
          </tr>
        </table>

        ${hasDiscount ? `
        <div style="background: #dcfce7; border-left: 4px solid #059669; padding: 12px; margin: 20px 0;">
          <strong style="color: #059669;">💰 Discount Applied!</strong><br>
          Amount: <strong>₹${data.discountAmount}</strong>
        </div>
        ` : ''}

        <div style="margin-top: 20px; text-align: center;">
          <a href="https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}"
             style="display: inline-block; padding: 12px 24px; background: #0F5B2F; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Orders Sheet
          </a>
        </div>
      </div>
    </div>
  `;

  MailApp.sendEmail({ to: ADMIN_EMAIL, subject, htmlBody });
}

function sendOrderCustomerConfirmation(data) {
  const isCOD = data.paymentMode === 'COD';
  const hasDiscount = data.discountAmount && data.discountAmount > 0;
  const subject = `Order Confirmed - ${data.orderId} | Orangutan Organics`;

  let productsHTML = '<ul style="list-style: none; padding: 0;">';
  if (data.products && Array.isArray(data.products)) {
    data.products.forEach(p => {
      productsHTML += `
        <li style="padding: 10px; margin: 5px 0; background: white; border-left: 3px solid #F46A1F;">
          ${p.name} (${p.size}) × ${p.quantity} - ₹${p.price * p.quantity}
        </li>
      `;
    });
  }
  productsHTML += '</ul>';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0F5B2F, #F46A1F); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">✅ Order Confirmed!</h1>
      </div>

      <div style="padding: 30px; background: #F5F2EB;">
        <p style="font-size: 16px;">Dear ${data.name},</p>

        <p style="font-size: 16px;">
          Thank you for your order from Orangutan Organics! Your order has been successfully placed and will be shipped soon.
        </p>

        ${hasDiscount ? `
        <div style="background: linear-gradient(135deg, #dcfce7, #a7f3d0); padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #059669; margin: 0 0 5px 0;">🎉 You Saved ₹${data.discountAmount}!</h3>
          
        </div>
        ` : ''}

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0F5B2F; margin-top: 0;">Order Summary</h2>
          <p><strong>Order ID:</strong> ${data.orderId}</p>
          <p><strong>Payment Mode:</strong> ${data.paymentMode}</p>
          ${isCOD ? '<p style="color: #F46A1F;"><strong>Amount to Pay on Delivery:</strong> ₹' + data.total + '</p>' : '<p style="color: #059669;"><strong>Payment Status:</strong> Completed</p>'}
        </div>

        <h3 style="color: #0F5B2F;">Your Products</h3>
        ${productsHTML}

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0F5B2F; margin-top: 0;">Pricing Breakdown</h3>
          <table style="width: 100%;">
            <tr>
              <td>Subtotal:</td>
              <td style="text-align: right;">₹${data.subtotal}</td>
            </tr>
            <tr>
              <td>Shipping:</td>
              <td style="text-align: right;">${data.shippingCharge > 0 ? '₹' + data.shippingCharge : 'FREE'}</td>
            </tr>
            ${hasDiscount ? `
            <tr style="color: #059669;">
              <td>Discount:</td>
              <td style="text-align: right; font-weight: bold;">-₹${data.discountAmount}</td>
            </tr>
            ` : ''}
            ${isCOD ? `
            <tr>
              <td>COD Charge:</td>
              <td style="text-align: right;">₹${data.codCharge}</td>
            </tr>
            ` : ''}
            <tr style="border-top: 2px solid #0F5B2F; font-weight: bold; font-size: 18px;">
              <td style="padding-top: 10px;">Total:</td>
              <td style="text-align: right; color: #F46A1F; padding-top: 10px;">₹${data.total}</td>
            </tr>
          </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0F5B2F; margin-top: 0;">Delivery Address</h3>
          <p style="margin: 0; line-height: 1.6;">
            ${data.name}<br>
            ${data.address}<br>
            ${data.city}, ${data.state} - ${data.pincode}<br>
            Phone: ${data.phone}
          </p>
        </div>

        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
          You will receive tracking information once your order is shipped. If you have any questions, please contact us at orangutanorganics@gmail.com or WhatsApp +91 79067 69090.
        </p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://orangutanorganics.com"
             style="display: inline-block; padding: 12px 24px; background: #0F5B2F; color: white; text-decoration: none; border-radius: 8px; margin-right: 10px;">
            Visit Website
          </a>
          <a href="https://wa.me/917906769090?text=hi"
             style="display: inline-block; padding: 12px 24px; background: #F46A1F; color: white; text-decoration: none; border-radius: 8px;">
            WhatsApp Us
          </a>
        </div>

        <p style="text-align: center; margin-top: 30px; font-size: 14px; color: #6b7280;">
          <strong style="color: #0F5B2F;">Orangutan Organics</strong><br>
          Pure, Authentic, Himalayan
        </p>
      </div>
    </div>
  `;

  try {
    MailApp.sendEmail({ to: data.email, subject, htmlBody });
  } catch (error) {
    console.error('Error sending order confirmation:', error);
  }
}

// =====================================================
// =================== UTILITIES ========================
// =====================================================
function getOrCreateSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

// =====================================================
// =================== TEST FUNCTIONS ===================
// =====================================================
function testContactForm() {
  const e = {
    postData: {
      contents: JSON.stringify({
        type: 'contact',
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 12345 67890',
        subject: 'Website Inquiry',
        message: 'Hello, this is a test contact form message.',
        timestamp: new Date().toISOString()
      })
    }
  };
  Logger.log(doPost(e).getContent());
}

function testReviewForm() {
  const e = {
    postData: {
      contents: JSON.stringify({
        type: 'review',
        product: 'Badri Cow Ghee',
        name: 'Test Customer',
        email: 'test@example.com',
        location: 'Delhi',
        rating: 5,
        review: 'Excellent product and packaging!',
        source: 'Website'
      })
    }
  };
  Logger.log(doPost(e).getContent());
}

function testCheckoutOrder() {
  const e = {
    postData: {
      contents: JSON.stringify({
        type: 'checkout',
        orderId: 'OUO_TEST123',
        timestamp: new Date().toISOString(),
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+91 12345 67890',
        address: '123 Test Street, Test Area',
        pincode: '110001',
        city: 'Delhi',
        state: 'Delhi',
        products: [
          { name: 'Badri Cow Ghee', size: '295gm', quantity: 2, price: 449 },
          { name: 'Himalayan White Rajma', size: '1kg', quantity: 1, price: 299 }
        ],
        paymentMode: 'COD',
        paymentStatus: 'Pending',
        paymentId: '',
        subtotal: 1197,
        shippingCharge: 0,
        discountAmount: 150,
        codCharge: 150,
        total: 1197,
        delhiveryResponse: '{"success": true}'
      })
    }
  };
  Logger.log(doPost(e).getContent());
}
