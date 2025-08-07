const contactService = require('../services/contact.service');
const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SMTP_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmailNotification = async (messageData) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: process.env.ADMIN_EMAIL }];
  sendSmtpEmail.sender = { email: process.env.SMTP_USER };
  sendSmtpEmail.subject = `Nuevo mensaje de contacto: ${messageData.subject || 'Sin asunto'}`;
  sendSmtpEmail.htmlContent = `
    <h3>Nuevo mensaje de contacto</h3>
    <p><strong>Nombre:</strong> ${messageData.name}</p>
    <p><strong>Email:</strong> ${messageData.email}</p>
    <p><strong>Asunto:</strong> ${messageData.subject || 'Sin asunto'}</p>
    <p><strong>Mensaje:</strong><br/>${messageData.message}</p>
  `;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await contactService.createMessage({ name, email, subject, message });
    await sendEmailNotification({ name, email, subject, message });
    res.status(201).json({ message: 'Mensaje enviado correctamente', messageId: newMessage.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar mensaje', error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await contactService.getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensajes', error: error.message });
  }
};

module.exports = { createContactMessage, getAllMessages };