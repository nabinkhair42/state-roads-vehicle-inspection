export const mailTemplates = {
  toUser: {
    appointmentCreated: ({
      usersName,
      serviceName,
      date,
      storeAddress,
      storeEmail,
      storeName,
      storePhone,
    }: {
      usersName: string;
      serviceName: string;
      date: Date;
      storeName: string;
      storeEmail: string;
      storePhone: string;
      storeAddress: string;
    }) => {
      const localDate = new Date(date).toLocaleDateString();
      const time = new Date(date).toLocaleTimeString();
      const subject = `Appointment Request - ${serviceName} on ${localDate} at ${time}`;

      const html = `
      <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { width: 80%; margin: auto; padding: 20px; }
                .header { background-color: #f8f8f8; padding: 10px; text-align: center; }
                .details { margin-top: 20px; }
                .details p { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Appointment Booking Request</h2>
                </div>
                <div class="details">
                    <p>Dear ${usersName},</p>
                    <p>Thank you for requesting an appointment with us. Here are the details of your booking request:</p>
                    <p>
                        <strong>Appointment Date:</strong> ${localDate}<br>
                        <strong>Appointment Time:</strong> ${time}<br>
                        <strong>Appointment Status:</strong> Pending Approval<br>
                        <strong>Service Title:</strong> ${serviceName}
                    </p>
                    <p>
                        <strong>Store Name:</strong> ${storeName}<br>
                        <strong>Store Email:</strong> ${storeEmail}<br>
                        <strong>Store Phone:</strong> ${storePhone}<br>
                        <strong>Store Address:</strong> ${storeAddress}
                    </p>
                    <p>We will notify you once your appointment is approved. If you have any questions, please do not hesitate to contact us.</p>
                    <p>Thank you,<br>${storeName} Team</p>
                </div>
            </div>
        </body>
        </html>
      `;

      return { subject, html };
    },

    appointmentApproved: ({
      date,
      serviceTitle,
      storeAddress,
      storeEmail,
      storeName,
      storePhone,
      userName,
    }: {
      date: Date;
      userName: string;
      serviceTitle: string;
      storeName: string;
      storeEmail: string;
      storePhone: string;
      storeAddress: string;
    }) => {
      const localDate = new Date(date).toLocaleDateString();
      const time = new Date(date).toLocaleTimeString();
      const subject = `Appointment Approved - ${serviceTitle} on ${localDate} at ${time}`;

      const html = `
      <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { width: 80%; margin: auto; padding: 20px; }
                .header { background-color: #f8f8f8; padding: 10px; text-align: center; }
                .details { margin-top: 20px; }
                .details p { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Appointment Approved</h2>
                </div>
                <div class="details">
                    <p>Dear ${userName},</p>
                    <p>We are pleased to inform you that your appointment has been approved. Here are the details of your appointment:</p>
                    <p>
                        <strong>Appointment Date:</strong> ${localDate}<br>
                        <strong>Appointment Time:</strong> ${time}<br>
                        <strong>Service Title:</strong> ${serviceTitle}
                    </p>
                    <p>
                        <strong>Store Name:</strong> ${storeName}<br>
                        <strong>Store Email:</strong> ${storeEmail}<br>
                        <strong>Store Phone:</strong> ${storePhone}<br>
                        <strong>Store Address:</strong> ${storeAddress}
                    </p>
                    <p>We look forward to serving you. If you have any questions, please do not hesitate to contact us.</p>
                    <p>Thank you,<br>${storeName} Team</p>
                </div>
            </div>
        </body>
        </html>

      `;

      return { subject, html };
    },

    appointmentRejected: ({
      date,
      serviceTitle,
      storeAddress,
      storeEmail,
      storeName,
      storePhone,
      userName,
    }: {
      date: Date;
      userName: string;
      serviceTitle: string;
      storeName: string;
      storeEmail: string;
      storePhone: string;
      storeAddress: string;
    }) => {
      const localDate = new Date(date).toLocaleDateString();
      const time = new Date(date).toLocaleTimeString();
      const subject = `Appointment Rejected - ${serviceTitle} on ${localDate} at ${time}`;

      const html = `
      <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { width: 80%; margin: auto; padding: 20px; }
                .header { background-color: #f8f8f8; padding: 10px; text-align: center; }
                .details { margin-top: 20px; }
                .details p { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Appointment Rejected</h2>
                </div>
                <div class="details">
                    <p>Dear ${userName},</p>
                    <p>We regret to inform you that your appointment request has been rejected. Here are the details of your request:</p>
                    <p>
                        <strong>Appointment Date:</strong> ${localDate}<br>
                        <strong>Appointment Time:</strong> ${time}<br>
                        <strong>Service Title:</strong> ${serviceTitle}
                    </p>
                    <p>
                        <strong>Store Name:</strong> ${storeName}<br>
                        <strong>Store Email:</strong> ${storeEmail}<br>
                        <strong>Store Phone:</strong> ${storePhone}<br>
                        <strong>Store Address:</strong> ${storeAddress}
                    </p>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
                    <p>Thank you,<br>${storeName} Team</p>
                </div>
            </div>
        </body>
        </html>
      `;

      return { subject, html };
    },

    appointmentCompleted: ({
      date,
      serviceTitle,
      storeAddress,
      storeEmail,
      storeName,
      storePhone,
      userName,
    }: {
      date: Date;
      userName: string;
      serviceTitle: string;
      storeName: string;
      storeEmail: string;
      storePhone: string;
      storeAddress: string;
    }) => {
      const localDate = new Date(date).toLocaleDateString();
      const time = new Date(date).toLocaleTimeString();
      const subject = `Appointment Completed - ${serviceTitle} on ${localDate}`;

      const html = `
      <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { width: 80%; margin: auto; padding: 20px; }
                .header { background-color: #f8f8f8; padding: 10px; text-align: center; }
                .details { margin-top: 20px; }
                .details p { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Appointment Completed</h2>
                </div>
                <div class="details">
                    <p>Dear ${userName},</p>
                    <p>We are pleased to inform you that your appointment for ${serviceTitle} on ${localDate} has been successfully completed.</p>
                    <p>Thank you for choosing ${storeName}. We hope you were satisfied with our service. If you have any feedback or need further assistance, please do not hesitate to contact us.</p>
                    <p>
                        <strong>Store Name:</strong> ${storeName}<br>
                        <strong>Store Email:</strong> ${storeEmail}<br>
                        <strong>Store Phone:</strong> ${storePhone}<br>
                        <strong>Store Address:</strong> ${storeAddress}
                    </p>
                    <p>We look forward to serving you again in the future.</p>
                    <p>Thank you,<br>${storeName} Team</p>
                </div>
            </div>
        </body>
        </html>
      `;

      return { subject, html };
    },
  },
  toMechanic: {
    appointmentCreated: ({
      userName,
      date,
      message,
      userPhone,
      serviceTitle,
      userEmail,
      storeName,
    }: {
      userName: string;
      date: Date;
      userPhone: string;
      userEmail: string;
      serviceTitle: string;
      message: string;
      storeName: string;
    }) => {
      const localDate = new Date(date).toLocaleDateString();
      const time = new Date(date).toLocaleTimeString();
      const subject = `New Appointment Request - ${localDate} at ${time}`;

      const html = `
      <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { width: 80%; margin: auto; padding: 20px; }
                .header { background-color: #f8f8f8; padding: 10px; text-align: center; }
                .details { margin-top: 20px; }
                .details p { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>New Appointment Request</h2>
                </div>
                <div class="details">
                    <p>Dear ${storeName} Team,</p>
                    <p>A new appointment request has been received. Here are the details:</p>
                    <p>
                        <strong>User Details:</strong><br>
                        <strong>Name:</strong> ${userName}<br>
                        <strong>Phone:</strong> ${userPhone}<br>
                        <strong>Email:</strong> ${userEmail}<br>
                        <strong>Appointment Date:</strong> ${localDate}<br>
                        <strong>Appointment Time:</strong> ${time}<br>
                        <strong>Service Title:</strong> ${serviceTitle}
                    </p>

                    <p>
                        <strong>Message from ${userName}:</strong> 
                        <br>
                        ${message}
                        <hr>
                    </p>

                    <p>Please review and approve the appointment at your earliest convenience.</p>
                    <p>Thank you!</p>
                </div>
            </div>
        </body>
        </html>

      `;

      return { subject, html };
    },

    appointmentCompleted: ({
      date,
      serviceTitle,
      userName,
      userPhone,
      userEmail,
      storeName,
    }: {
      date: Date;
      userName: string;
      userPhone: string;
      userEmail: string;
      serviceTitle: string;
      storeName: string;
    }) => {
      const localDate = new Date(date).toLocaleDateString();
      const time = new Date(date).toLocaleTimeString();
      const subject = `Appointment Completed - ${serviceTitle} on ${localDate}`;

      const html = `
      <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { width: 80%; margin: auto; padding: 20px; }
                .header { background-color: #f8f8f8; padding: 10px; text-align: center; }
                .details { margin-top: 20px; }
                .details p { line-height: 1.6; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Appointment Completed</h2>
                </div>
                <div class="details">
                    <p>Dear Team,</p>
                    <p>The following appointment has been marked as completed by the user:</p>
                    <p>
                        <strong>User Name:</strong> ${userName}<br>
                        <strong>User Phone:</strong> ${userPhone}<br>
                        <strong>User Email:</strong> ${userEmail}<br>
                        <strong>Appointment Date:</strong> ${localDate}<br>
                        <strong>Appointment Time:</strong> ${time}<br>
                        <strong>Service Title:</strong> ${serviceTitle}
                    </p>
                    <p>Thank you for your excellent service and dedication. Keep up the good work!</p>
                    <p>Thank you,<br>${storeName} Team</p>
                </div>
            </div>
        </body>
        </html>
      `;

      return { subject, html };
    },
  },
};
